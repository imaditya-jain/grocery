import { connectToDatabase } from "@/config"
import { User } from "@/models"
import { sendOTP } from "@/utils"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        connectToDatabase()

        if (request.method !== "POST") return NextResponse.json({ message: "Method not allowed.", success: false, data: {} }, { status: 405 })

        const { email, password } = await request.json()

        if (!email || !password) return NextResponse.json({ success: false, message: "Provide all required fields.", data: {} }, { status: 400 })

        const user = await User.findOne({ email }).select('-refreshToken -otp')

        if (!user) return NextResponse.json({ message: "User not found.", success: false, data: {} }, { status: 404 })

        const isPasswordMatch = await user.comparePassword(password)

        if (!isPasswordMatch) return NextResponse.json({ message: "Invalid credentials", success: false, data: {} }, { status: 401 })

        const mailResponse = await sendOTP(user._id.toString())

        const { success, message, data, status } = mailResponse

        return NextResponse.json({ message, success, data }, { status })

    } catch (error) {
        if (error instanceof Error) {
            console.log('Error while login.', error.message)
        } else {
            console.log('An unknown error occurred.')
        }
        return NextResponse.json({ message: "Internal server error.", success: false, data: {} }, { status: 500 })
    }
}