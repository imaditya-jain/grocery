import { connectToDatabase } from "@/config";
import { authMiddleware } from "@/middleware";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        connectToDatabase()

        if (request.method !== 'POST') return NextResponse.json({ message: "Method not allowed.", success: false, data: {} }, { status: 405 })

        const authResult = await authMiddleware(request)

        if (authResult.status > 200 && !authResult.success) return NextResponse.json({ message: authResult.message, success: authResult.success, data: {} }, { status: authResult.status })

        const user = authResult.data?.user

        if (!user) return NextResponse.json({ message: "User not found.", success: false, data: {} }, { status: 404 })

        user.refreshToken = null
        user.save()

        const response = NextResponse.json({ message: "Logout successfully.", success: true, data: {} }, { status: 200 })

        response.cookies.set('refreshToken', '', { httpOnly: true, secure: true, sameSite: "strict", path: "/" })
        response.cookies.set('accessToken', '', { httpOnly: true, secure: true, sameSite: "strict", path: "/" })

        return response

    } catch (error) {
        if (error instanceof Error) {
            console.log('Error occurred while logout.', error.message)
        } else {
            console.log('An unknown error occurred.')
        }
        return NextResponse.json({ message: "Internal server error.", success: false, data: {} }, { status: 500 })
    }
}