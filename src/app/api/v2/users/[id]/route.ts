import { connectToDatabase } from "@/config"
import { authMiddleware } from "@/middleware"
import { User } from "@/models"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        connectToDatabase()

        if (request.method !== "GET") return NextResponse.json({ message: "Method is not allowed.", success: false, data: {} }, { status: 405 })

        const authResult = await authMiddleware(request)
        const { message, status, success, data } = authResult
        if (!success && status > 200) return NextResponse.json({ message, success, data: {} }, { status })

        if (data?.user?.role !== "admin" && data?.user?.role !== "user") return NextResponse.json({ message: "You are not authorized to perform this action.", success: false, data: {} }, { status: 403 })

        const { id } = params

        if (!id) return NextResponse.json({ message: "User ID is required.", success: false, data: {} }, { status: 400 })

        const user = await User.findById(id).select('-otp -password -refreshToken')

        if (!user) return NextResponse.json({ message: "User not found.", success: false, data: {} }, { status: 404 })

        return NextResponse.json({ message: "", success: true, data: { user } }, { status: 200 })

    } catch (error) {
        if (error instanceof Error) {
            console.log('Error while fetching error: ', error.message)
        } else {
            console.log('An unknown error occurred.')
        }
        return NextResponse.json({ message: "Internal server error.", success: true, data: {} }, { status: 500 })
    }
}