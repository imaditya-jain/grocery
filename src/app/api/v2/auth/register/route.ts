import { connectToDatabase } from "@/config";
import { User } from '@/models'
import { NextResponse } from "next/server";
export async function POST(request: Request) {
    try {
        connectToDatabase()

        if (request.method !== "POST") return NextResponse.json({ message: "Method not allowed.", success: false, data: {} }, { status: 405 })

        const { firstName, lastName, email, phone, avatar, password, role } = await request.json()

        if (!firstName || !lastName || !email || !phone || !password) return NextResponse.json({ message: "Provide all required fields.", success: false, data: {} }, { status: 400 })

        const userExist = await User.find({ $or: [{ email }, { phone }] })

        if (Array.isArray(userExist) && userExist.length > 0) return NextResponse.json({ message: 'You can not create account with same email or phone.', success: false }, { status: 409 })

        const newUser = new User({ firstName, lastName, email, avatar, password, phone, role: role ? role : 'user' })
        const user = await newUser.save()

        const createdUser = await User.findById(user._id).select('-password -otp -refreshToken')

        if (!createdUser) return NextResponse.json({ message: 'Something went wrong.', success: false, data: {} }, { status: 500 })

        return NextResponse.json({ message: 'User registered successfully.', success: true, data: { user: createdUser } }, { status: 201 })

    } catch (error) {

        if (error instanceof Error) {
            console.log('Error while registration.', error.message)
        } else {
            console.log('An unknown error occurred.')
        }
        return NextResponse.json({ message: "Internal server error.", success: false, data: {} }, { status: 500 })
    }
}