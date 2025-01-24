import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "@/models";
import { generateAccessAndRefreshToken } from "@/utils";
import { connectToDatabase } from "@/config";

export async function POST(request: Request) {
    try {
        connectToDatabase();

        if (request.method !== "POST") {
            return NextResponse.json(
                { message: "Method is not allowed.", success: false, data: {} },
                { status: 405 }
            );
        }

        const cookies = request.headers.get("cookie");
        const token = cookies
            ? cookies.split("; ").find((cookie) => cookie.startsWith("refreshToken="))?.split("=")[1]
            : null;

        if (!token) {
            return NextResponse.json(
                { message: "Missing refresh token. Please login again.", success: false, data: {} },
                { status: 401 }
            );
        }

        if (!process.env.REFRESH_TOKEN_SECRET) {
            throw new Error("Missing REFRESH_TOKEN_SECRET environment variable.");
        }

        let decodedToken: JwtPayload & { _id: string };
        try {
            decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET) as JwtPayload & { _id: string };
        } catch (error) {
            if (error instanceof Error) {
                console.log('Error while decoding token:', error.message)
            } else {
                console.log('Unknown error occurred.')
            }
            return NextResponse.json(
                { message: "Invalid refresh token. Please sign in again.", success: false, data: {} },
                { status: 401 }
            );
        }

        const user = await User.findById(decodedToken._id).select("-otp -password");
        if (!user) {
            return NextResponse.json(
                { message: "User not found. Please sign in again.", success: false, data: {} },
                { status: 401 }
            );
        }

        if (user.refreshToken !== token) {
            return NextResponse.json(
                { message: "Token mismatch. Please sign in again.", success: false, data: {} },
                { status: 401 }
            );
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id.toString());

        user.refreshToken = refreshToken;
        await user.save();

        // Exclude sensitive fields and return user data
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
            { message: "", success: true, data: { user: loggedUser, accessToken, refreshToken } },
            { status: 200 }
        );

        response.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            path: "/",
            sameSite: "strict",
        });
        response.cookies.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            path: "/",
            sameSite: "strict",
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
