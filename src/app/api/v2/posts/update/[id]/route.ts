import { connectToDatabase } from "@/config";
import { authMiddleware } from "@/middleware";
import Post from "@/models/posts.model";
import { NextResponse } from "next/server";
import slugify from "slugify";

interface Context {
    params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: Context) {
    try {
        connectToDatabase();

        if (request.method !== "PUT") {
            return NextResponse.json({ message: "Method is not allowed.", success: false, data: {} }, { status: 405 });
        }

        const authResult = await authMiddleware(request);
        const { message, status, success, data } = authResult;

        if (!success && status > 200) {
            return NextResponse.json({ message, success, data }, { status });
        }

        if (data?.user?.role !== "admin") {
            return NextResponse.json({ message: "You are not authorized to perform this action.", success: false, data: {} }, { status: 403 });
        }

        const { id } = await params;

        if (!id) {
            return NextResponse.json({ message: "Post ID is required.", success: false, data: {} }, { status: 400 });
        }

        const { title, excerpt, featuredImage, content, metaTitle, metaDescription } = await request.json();

        const slug = { current: slugify(title, { lower: true, strict: true }) };

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { title, excerpt, media: { featuredImage }, content, seo: { metaTitle, metaDescription }, slug },
            { new: true, runValidators: false }
        );

        if (!updatedPost) {
            return NextResponse.json({ message: "Post not found.", success: false, data: {} }, { status: 404 });
        }

        return NextResponse.json({ message: "Post updated successfully.", success: true, data: { post: updatedPost } }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.log("Error while updating post: ", error.message);
        } else {
            console.log("An unknown error occurred.");
        }
        return NextResponse.json({ message: "Internal server error.", success: false, data: {} }, { status: 500 });
    }
}
