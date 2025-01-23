import { connectToDatabase } from "@/config"
import { User } from "@/models"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        connectToDatabase()

        if (request.method !== "POST") return NextResponse.json({ message: "Method not allowed", success: false, data: {} }, { status: 405 })

        const { otp, email, password } = await request.json()

        if (!otp || !email || !password) return NextResponse.json({ message: "Provide all required fields.", success: false, data: {} }, { status: 400 })

        const user = await User.findOne({ email }).select('-refreshToken')

        if (!user) return NextResponse.json({ message: "User not found.", success: false, data: {} }, { status: 404 })

        const isPasswordMatch = await user.comparePassword(password)

        if (isPasswordMatch) return NextResponse.json({ message: "You can not set old password as new password.", success: false, data: {} }, { status: 401 })

        const isOTPMatched = await user.compareOTP(otp)

        if (!isOTPMatched) return NextResponse.json({ message: "Invalid OTP.", success: false, data: {} }, { status: 401 })

        user.otp = null
        user.password = password

        await user.save()

        return NextResponse.json({ message: "Password reset successfuly.", success: true, data: {} }, { status: 200 })

    } catch (error) {
        if (error instanceof Error) {
            console.log('Error while reseting password.', error.message)
        } else {
            console.log('An unkonwn error occuured.')
        }
        return NextResponse.json({ message: "Something went wrong.", success: false, data: {} }, { status: 500 })
    }
}