import { connectToDatabase } from "@/config";
import { authMiddleware } from "@/middleware";
import { User } from "@/models";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await connectToDatabase();

        const { success, status, data } = await authMiddleware(request);

        if (!success && status > 200) {
            return NextResponse.json(
                { message: "You are not authorized to perform this action.", success: false, data: {} },
                { status }
            );
        }

        const user = data?.user;

        if (!user) {
            return NextResponse.json(
                { message: "You are not authorized to perform this action.", success: false, data: {} },
                { status: 401 }
            );
        }

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { refreshToken: null },
            { new: true, select: "-otp -password -refreshToken" }
        );

        if (!updatedUser) {
            return NextResponse.json(
                { message: "User not found.", success: false, data: {} },
                { status: 400 }
            );
        }

        const response = NextResponse.json(
            { message: "Logout successfully.", success: true, data: {} },
            { status: 200 }
        );

        response.cookies.set("accessToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: "/",
            sameSite: "strict",
            expires: new Date(0),
        });

        response.cookies.set("refreshToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: "/",
            sameSite: "strict",
            expires: new Date(0),
        });

        return response;
    } catch (error) {
        console.error(
            "Error while logging out:",
            error instanceof Error ? error.message : "Unknown error"
        );

        return NextResponse.json(
            { message: "Internal server error.", success: false, data: {} },
            { status: 500 }
        );
    }
}
