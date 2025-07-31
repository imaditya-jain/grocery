import { connectToDatabase } from "@/config";
import Post from "@/models/posts.model";
import { NextResponse } from "next/server";


interface Context {
    params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: Context) {
    try {
        connectToDatabase()

        if (request.method !== "GET") return NextResponse.json({ message: "Method not allowed", success: false, data: {} }, { status: 405 })

        const { slug } = (await params)

        if (!slug) return NextResponse.json({ message: "Post slug is required.", success: false, data: {} }, { status: 400 })

        const post = await Post.findOne({ "slug.current": slug })

        if (!post) return NextResponse.json({ message: "Post are not found.", success: false, data: {} }, { status: 404 })

        return NextResponse.json({ message: "", success: true, data: { post } }, { status: 200 })

    } catch (error) {
        if (error instanceof Error) {
            console.log('Error while fetch post: ', error.message)
        } else {
            console.log('An unknown error occurred.')
        }
        return NextResponse.json({ message: "Internal server error.", success: false, data: {} }, { status: 500 })
    }
}