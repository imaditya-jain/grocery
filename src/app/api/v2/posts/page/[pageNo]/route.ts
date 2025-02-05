import { connectToDatabase } from "@/config"
import Post from "@/models/posts.model"
import { NextResponse } from "next/server"

interface Context {
    params: { pageNo: string }
}

export async function GET(request: Request, { params }: Context) {
    try {
        await connectToDatabase()

        if (request.method !== "GET") {
            return NextResponse.json({ message: "Method is not allowed.", success: false, data: {} }, { status: 405 })
        }

        const page = parseInt(params.pageNo) || 1
        const limit = 10
        const skip = (page - 1) * limit

        const posts = await Post.find().skip(skip).limit(limit).lean()
        const totalPosts = await Post.countDocuments()

        return NextResponse.json({
            message: "",
            success: true,
            data: {
                posts,
                totalPages: Math.ceil(totalPosts / limit),
                currentPage: page,
                totalPosts
            }
        }, { status: 200 })

    } catch (error) {
        console.error('Error while fetching posts:', error instanceof Error ? error.message : 'Unknown error')

        return NextResponse.json({
            message: "Internal server error.",
            success: false,
            data: {}
        }, { status: 500 })
    }
}
