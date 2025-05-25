import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "@/models";
import { generateAccessAndRefreshToken } from "@/utils";
import { connectToDatabase } from "@/config";

export async function POST(request: Request) {
    try {
        await connectToDatabase();

        const cookies = request.headers.get("cookie");
        const refreshToken = cookies
            ? cookies.split("; ").find((cookie) => cookie.startsWith("refreshToken="))?.split("=")[1]
            : null;

        if (!refreshToken) {
            return NextResponse.json(
                { message: "Refresh token is missing. Please login again.", success: false, data: {} },
                { status: 401 }
            );
        }

        if (!process.env.REFRESH_TOKEN_SECRET) {
            throw new Error("Missing REFRESH_TOKEN_SECRET environment variable.");
        }

        let decodedToken: JwtPayload & { _id: string };
        try {
            decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as JwtPayload & { _id: string };
        } catch (error) {
            console.log('Error while decoding refresh token:', error instanceof Error ? error.message : 'Unknown error');
            return NextResponse.json(
                { message: "Invalid refresh token. Please login again.", success: false, data: {} },
                { status: 401 }
            );
        }

        const user = await User.findById(decodedToken._id).select("-otp -password");
        if (!user) {
            return NextResponse.json(
                { message: "User not found. Please login again.", success: false, data: {} },
                { status: 401 }
            );
        }

        // Verify the refresh token matches the one stored in database
        if (user.refreshToken !== refreshToken) {
            return NextResponse.json(
                { message: "Invalid refresh token. Please login again.", success: false, data: {} },
                { status: 401 }
            );
        }

        // Generate new tokens
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(user._id.toString());

        // Get user data without sensitive fields
        const loggedUser = await User.findById(user._id)
            .select("-otp -password -refreshToken")
            .lean();

        if (!loggedUser) {
            return NextResponse.json(
                { message: "User data not found.", success: false, data: {} },
                { status: 404 }
            );
        }

        const response = NextResponse.json(
            {
                message: "Tokens refreshed successfully.",
                success: true,
                data: { user: loggedUser, accessToken: newAccessToken, refreshToken: newRefreshToken }
            },
            { status: 200 }
        );

        // Set new cookies
        response.cookies.set("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: "/",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 // 1 day
        });

        response.cookies.set("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: "/",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 // 7 days
        });

        return response;
    } catch (error) {
        console.error("Error while refreshing tokens:", error instanceof Error ? error.message : "Unknown error");
        return NextResponse.json(
            { message: "Internal server error.", success: false, data: {} },
            { status: 500 }
        );
    }
}
