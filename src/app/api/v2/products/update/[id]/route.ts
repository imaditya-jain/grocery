import { NextResponse } from "next/server"
import { connectToDatabase } from "@/config"
import { authMiddleware } from "@/middleware"
import { Product } from "@/models"
import slugify from "slugify";

interface Context {
    params: Promise<{ id: string }>
}

export async function PUT(request: Request, { params }: Context) {
    try {
        connectToDatabase()

        const authResult = await authMiddleware(request)
        const { message, success, status, data } = authResult

        if (!success && status > 200) return NextResponse.json({ message, success, data }, { status })

        if (data?.user?.role !== "admin") return NextResponse.json({ message: "You are not authorized perform this action.", success: false, data: {} }, { status: 403 })

        const { id } = (await params)

        if (!id) return NextResponse.json({ message: "Product ID is required.", success: false, data: {} }, { status: 400 })

        const { name, price, inventory, description, variants, media, seo } = await request.json()

        const slug = { current: slugify(name, { lower: true, strict: true }) };

        const product = await Product.findByIdAndUpdate(id, { name, price, inventory, description, slug, variants, media, seo }, { runValidators: false, new: true })

        if (!product) return NextResponse.json({ message: "Product not found.", success: false, data: {} }, { status: 404 })

        return NextResponse.json({ message: "Product updated successfully.", success: true, data: { product } }, { status: 200 })


    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error while updating product: ${error?.message}`)
        } else {
            console.log('An unknwn error occurred.')
        }
        return NextResponse.json({ message: "Internal server error.", success: false, data: {} }, { status: 500 })

    }
}