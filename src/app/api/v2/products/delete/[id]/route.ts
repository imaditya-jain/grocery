import { NextResponse } from "next/server"
import { authMiddleware } from "@/middleware"
import { connectToDatabase } from "@/config"
import { Product } from "@/models"

interface Context {
    params: Promise<{ id: string }>
}

export async function DELETE(request: Request, { params }: Context) {
    try {
        connectToDatabase()

        if (request.method !== "DELETE") return NextResponse.json({ message: "Method is not allowed.", success: false, data: {} }, { status: 405 })

        const authResult = await authMiddleware(request)
        const { message, status, success, data } = authResult
        if (!success && status > 200) return NextResponse.json({ message, success, data }, { status })

        if (data?.user?.role !== "admin") return NextResponse.json({ message: "You are not authorized to perform this action.", success: false, data: {} }, { status: 403 })

        const { id } = (await params)

        if (!id) return NextResponse.json({ message: "Product ID is required.", success: false, data: {} }, { status: 404 })

        await Product.findByIdAndDelete(id)

        return NextResponse.json({ message: "Product deleted successfully.", success: true, data: {} }, { status: 200 })

    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error while deletting product: ${error?.message}`)
        } else {
            console.log('An unknown error occurred.')
        }
        return NextResponse.json({ message: "Internal server error." }, { status: 500 })
    }
}