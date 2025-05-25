import { connectToDatabase } from "@/config"
import { User } from "@/models"
import { generateAccessAndRefreshToken } from "@/utils"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        connectToDatabase()

        if (request.method !== "POST") return NextResponse.json({ success: false, message: "Method not allowed.", data: {} }, { status: 405 })

        const { email, otp } = await request.json()

        if (!email || !otp) return NextResponse.json({ message: "Provide all required fields.", success: false, data: {} }, { status: 400 })

        const user = await User.findOne({ email }).select('-refreshToken -password')

        if (!user) return NextResponse.json({ message: 'User not found.', success: false, data: {} }, { status: 404 })

        const isOTPMatched = await user.compareOTP(otp)

        if (!isOTPMatched) return NextResponse.json({ message: "OTP does not match.", success: false, data: {} }, { status: 403 })

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id.toString())

        user.otp = null
        await user.save()

        const loggedUser = await User.findById(user._id).select('-password -otp -refreshToken')

        const response = NextResponse.json({ message: 'Login successfully.', success: true, data: { user: loggedUser, accessToken, refreshToken } }, { status: 200 })

        response.cookies.set('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 24 * 60 * 60 // 1 day
        })
        response.cookies.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 // 7 days
        })

        return response

    } catch (error) {
        if (error instanceof Error) {
            console.log('Error while verifying OTP.', error?.message)
        } else {
            console.log('An unknown error occurred')
        }
        return NextResponse.json({ message: 'Internal server error.', success: false, data: {} }, { status: 500 })
    }
}
