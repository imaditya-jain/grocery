import { connectToDatabase } from "@/config"
import Post from "@/models/posts.model"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    try {
        connectToDatabase()

        if (request.method !== "GET") return NextResponse.json({ message: "Method is not allowed.", success: false, data: {} }, { status: 405 })

        const posts = await Post.find()

        return NextResponse.json({ message: "", success: true, data: { posts } }, { status: 200 })

    } catch (error) {
        if (error instanceof Error) {
            console.log('Error while fetching posts: ', error.message)
        } else {
            console.log('An unknown error occurred.')
        }
        return NextResponse.json({ message: "Internal server error.", success: false, data: {} }, { status: 500 })
    }
}