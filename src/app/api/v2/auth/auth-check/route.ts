import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models";
import { connectToDatabase } from "@/config";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";

export async function POST(request: Request) {
    try {
        connectToDatabase()

        const cookies = request.headers.get("cookie");
        const refreshToken = cookies
            ? cookies.split("; ").find((cookie) => cookie.startsWith("refreshToken="))?.split("=")[1]
            : null;

        const accessToken = cookies
            ? cookies.split("; ").find((cookie) => cookie.startsWith("accessToken="))?.split("=")[1]
            : null;

        if (!accessToken) {
            return NextResponse.json({ message: "Access token is missing.", success: false }, { status: 401 });
        }

        const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as jwt.JwtPayload;

        const user = await User.findById(decoded._id)

        if (!user) return NextResponse.json({ message: "Please login again.", success: false, data: {} }, { status: 400 })

        return NextResponse.json({ message: "", success: true, data: { user, refreshToken, accessToken }, }, { status: 200 });
    } catch (error) {
        console.error("Error in auth check:", error);
        return NextResponse.json({ message: "Invalid access token.", success: false }, { status: 500 });
    }
}
