import { connectToDatabase } from "@/config"
import { User } from "@/models"
import { sendOTP } from "@/utils"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        connectToDatabase()

        if (request.method !== "POST") return NextResponse.json({ message: "Method not allowed.", success: false, data: {} }, { status: 405 })

        const { email } = await request.json()

        if (!email) return NextResponse.json({ message: "Provide all required fields.", success: false, data: {} }, { status: 400 })

        const user = await User.findOne({ email }).select('-otp -password -refreshToken')

        if (!user) return NextResponse.json({ message: "User not found.", success: false, data: {} }, { status: 404 })

        const otpResponse = await sendOTP(user._id.toString())

        if (!otpResponse) return NextResponse.json({ message: "Something went wrong.", success: false, data: {} }, { status: 500 })

        const { success, status, message, data } = otpResponse

        return NextResponse.json({ message, success, data }, { status })

    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error while forgot password`, error.message)
        } else {
            console.log('An unknown error occurred.')
        }
        return NextResponse.json({ message: "Internal server error.", success: false, data: {} }, { status: 500 })
    }
}