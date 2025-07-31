import { NextResponse } from "next/server"
import { connectToDatabase } from "@/config"
import { authMiddleware } from "@/middleware"
import { Product } from "@/models"

export async function GET(request: Request) {
    try {
        connectToDatabase()

        if (request.method !== "GET") return NextResponse.json({ message: "Method is not allowed", success: false, data: {} }, { status: 405 })

        const authResult = await authMiddleware(request)
        const { message, success, data, status } = authResult
        if (!success && status > 200) return NextResponse.json({ message, success, data }, { status })

        const products = await Product.find()

        return NextResponse.json({ message: "", success: true, data: { products } }, { status: 200 })

    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error while fetching products: ${error?.message}`)
        } else {
            console.log('An unknown error occurred.')
        }
        return NextResponse.json({ message: "Internal server error.", success: false, data: {} }, { status: 500 })
    }
}