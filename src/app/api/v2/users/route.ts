import { connectToDatabase } from "@/config";
import { authMiddleware } from "@/middleware";
import { User } from "@/models";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        connectToDatabase()

        if (request.method !== "GET") return NextResponse.json({ message: "Method is not allowed.", success: false, data: {} }, { status: 405 })

        const authResult = await authMiddleware(request)
        if (!authResult.success && authResult.status > 200 && authResult.data?.user?.role !== 'admin') return NextResponse.json({ message: authResult.message, success: authResult.success, data: {} }, { status: authResult.status })

        const users = await User.find().select('-otp -password -refreshToken')

        return NextResponse.json({ message: "", success: true, data: { users } }, { status: 200 })

    } catch (error) {
        if (error instanceof Error) {
            console.log('Error while getting users: ', error.message)
        } else {
            console.log('An unknown error occurred.')
        }
        return NextResponse.json({ message: "Internal server error.", success: false, data: {} }, { status: 500 })
    }
}