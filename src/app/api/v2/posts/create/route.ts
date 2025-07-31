import { connectToDatabase } from "@/config";
import { authMiddleware } from "@/middleware";
import Post from "@/models/posts.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        connectToDatabase();

        if (request.method !== "POST") {
            return NextResponse.json(
                { message: "Method is not allowed.", success: false, data: {} },
                { status: 405 }
            );
        }

        const authResult = await authMiddleware(request);
        const { message, success, status, data } = authResult;
        if (!success && status > 200) {
            return NextResponse.json({ message, success, data }, { status });
        }

        if (data?.user?.role !== "admin") {
            return NextResponse.json(
                { message: "You are not authorized to perform this action.", success: false, data: {} },
                { status: 403 }
            );
        }

        const { title, excerpt, featuredImage, content, metaTitle, metaDescription } = await request.json();

        if (!title || !excerpt || !content || !metaTitle || !metaDescription) {
            return NextResponse.json(
                { message: "Provide all required fields.", success: false, data: {} },
                { status: 400 }
            );
        }

        let uniqueTitle = title;
        let copyNumber = 1;

        while (await Post.findOne({ title: uniqueTitle })) {
            uniqueTitle = `${title} copy ${copyNumber}`;
            copyNumber++;
        }

        const newPost = new Post({
            title: uniqueTitle,
            excerpt,
            media: { featuredImage },
            content,
            seo: { metaTitle, metaDescription },
        });

        const post = await newPost.save();

        const createdPost = await Post.findById(post._id);

        if (!createdPost) {
            return NextResponse.json(
                { message: "Something went wrong.", success: false, data: {} },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "Post created successfully.", success: true, data: { post: createdPost } },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error while creating Post:", error instanceof Error ? error.message : "Unknown error");
        return NextResponse.json(
            { message: "Internal server error.", success: false, data: {} },
            { status: 500 }
        );
    }
}
