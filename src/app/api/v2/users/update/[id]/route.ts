import { NextResponse } from "next/server"
import { connectToDatabase } from "@/config"
import { authMiddleware } from "@/middleware"
import { User } from "@/models"

interface Context {
    params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: Context) {
    try {
        connectToDatabase()

        if (request.method !== "PUT") return NextResponse.json({ message: "Method not allowed.", success: false, data: {} }, { status: 405 })

        const authResult = await authMiddleware(request)
        const { message, status, success, data } = authResult

        if (!success && status > 200) return NextResponse.json({ message, success, data: {} }, { status })

        if (data?.user?.role !== "admin" && data?.user?.role !== "user") return NextResponse.json({ message: "You are not authorized to perform this action.", success: false, data: {} }, { status: 403 })

        const { id } = await params;

        if (!id) return NextResponse.json({ message: "User ID is required.", success: false, data: {} }, { status: 400 })

        if (data.user?.role === 'user' && data?.user?._id.toString() !== id) return NextResponse.json({ message: "You are not authorized to perform this action.", success: false, data: {} }, { status: 403 })

        const { firstName, lastName, email, phone, avatar } = await request.json()

        const user = await User.findByIdAndUpdate(id, { firstName, lastName, email, phone, avatar }, { new: true, runValidators: false }).select('-otp -password -refreshToken')

        if (!user) return NextResponse.json({ message: 'User not found.', success: false, data: {} }, { status: 404 })

        return NextResponse.json({ message: "User updated successfully.", success: true, data: { user } }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.log('Error encounter while updating user.', error.message)
        } else {
            console.log('An unknown error occurred.')
        }
        return NextResponse.json({ message: "Internal server error.", success: false, data: {} }, { status: 500 })
    }
}