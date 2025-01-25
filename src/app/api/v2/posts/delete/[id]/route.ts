import { connectToDatabase } from "@/config"
import { authMiddleware } from "@/middleware"
import Post from "@/models/posts.model"
import { NextResponse } from "next/server"

interface Context {
    params: Promise<{ id: string }>
}

export async function DELETE(request: Request, { params }: Context) {
    try {
        connectToDatabase()

        if (request.method !== "DELETE") return NextResponse.json({ message: "Method not allowed.", success: false, data: {} }, { status: 405 })

        const authResult = await authMiddleware(request)
        const { success, message, status, data } = authResult
        if (!success && status > 200) return NextResponse.json({ message, success, data }, { status })

        if (data?.user?.role !== "admin") return NextResponse.json({ message: 'You are not authorized to perform this action.', success: false, data: {} }, { status: 403 })

        const { id } = (await params)

        if (!id) return NextResponse.json({ message: "Post ID is required.", success: false, data: {} }, { status: 400 })

        await Post.findByIdAndDelete(id)

        return NextResponse.json({ message: "Post deleted successfully.", success: false, data: {} }, { status: 200 })


    } catch (error) {
        if (error instanceof Error) {
            console.log('Error while deleting post: ', error.message)
        } else {
            console.log('An unknown error occurred.')
        }
        return NextResponse.json({ message: "Internal server error.", success: false, data: {} }, { status: 500 })
    }
}