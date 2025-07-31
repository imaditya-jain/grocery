import { NextResponse } from "next/server"
import { Product } from "@/models"
import { authMiddleware } from "@/middleware"
import { connectToDatabase } from "@/config"

interface Context {
    params: Promise<{ slug: string }>
}

export async function GET(request: Request, { params }: Context) {
    try {

        connectToDatabase()

        if (request.method !== "GET") return NextResponse.json({ message: "Method not allowed.", success: false, data: {} }, { status: 405 })

        const authResult = await authMiddleware(request)
        const { message, success, status, data } = authResult

        if (!success && status > 200) return NextResponse.json({ message, success, data }, { status })

        const { slug } = (await params)

        if (!slug) return NextResponse.json({ message: "Product slug is required.", success: false, data: {} }, { status: 400 })

        const product = await Product.findOne({ "slug.current": slug })

        if (!product) return NextResponse.json({ message: "Product not found.", success: false, data: {} }, { status: 404 })

        return NextResponse.json({ message: "", success: false, data: { product } }, { status: 200 })

    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error while fetching a product: ${error?.message}`)
        } else {
            console.log('An unknown error occurred.')
        }
        return NextResponse.json({ message: "Internal server error.", success: false, data: {} }, { status: 500 })
    }
}