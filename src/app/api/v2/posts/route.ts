import { connectToDatabase } from "@/config";
import Post from "@/models/posts.model";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
    try {
        await connectToDatabase();

        console.log(request.method, "request method");

        if (request.method !== "POST") { return NextResponse.json({ message: "Method is not allowed.", success: false, data: {} }, { status: 405 }); }

        const { pageNo } = await request.json();
        const limit = 10;
        const skip = (Number(pageNo) - 1) * limit;

        const [posts, totalPosts] = await Promise.all([Post.find().skip(skip).limit(limit).lean(), Post.countDocuments(),]);

        return NextResponse.json({ message: "", success: true, data: { posts, totalPages: Math.ceil(totalPosts / limit), currentPage: pageNo, totalPosts, }, }, { status: 200 }
        );
    } catch (error) {
        console.error("Error while fetching posts:", error instanceof Error ? error.message : "Unknown error");

        return NextResponse.json(
            { message: "Internal server error.", success: false, data: {}, }, { status: 500 });
    }
}
