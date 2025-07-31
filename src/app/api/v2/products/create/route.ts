import { NextResponse } from "next/server"
import { authMiddleware } from "@/middleware"
import { Product } from "@/models"
import { connectToDatabase } from "@/config"

export async function POST(request: Request) {
    try {
        connectToDatabase()

        if (request.method !== "POST") return NextResponse.json({ message: "Method is not allowed.", success: false, data: {} }, { status: 405 })

        const authResult = await authMiddleware(request)
        const { message, status, success, data } = authResult

        if (!success && status > 200) return NextResponse.json({ message, success, data }, { status })

        if (data?.user?.role !== "admin") return NextResponse.json({ message: "You are not authorized to perform this action.", success: false, data: {} }, { status: 403 })

        const { name, price, inventory, description, variants, media, seo } = await request.json()

        if (!name || !price || !inventory) return NextResponse.json({ message: "Please provide all required fields.", success: false, data: {} }, { status: 400 })

        let uniqueTitle = name;
        let copyNumber = 1;

        while (await Product.findOne({ name: uniqueTitle })) {
            uniqueTitle = `${name} copy ${copyNumber}`;
            copyNumber++;
        }

        const newProduct = new Product({ name: uniqueTitle, price, inventory, description, variants, media, seo });
        const product = await newProduct.save();

        const createdProduct = await Product.findById(product._id)

        if (!createdProduct) return NextResponse.json({ message: "Sonething went wrong.", success: false, data: {} }, { status: 500 })

        return NextResponse.json({ message: "Product created successfully.", success: true, data: { product: createdProduct } }, { status: 201 })

    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error occurred while creating product: ${error.message}`)
        } else {
            console.log('An unknown error occurred.')
        }
        return NextResponse.json({ message: "Internal server error.", success: false, data: {} }, { status: 500 })
    }
}