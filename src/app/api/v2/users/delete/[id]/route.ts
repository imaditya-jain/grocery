import { connectToDatabase } from "@/config";
import { authMiddleware } from "@/middleware";
import { User } from "@/models";
import { NextResponse } from "next/server";

interface Context {
    params: Promise<{ id: string }>;
}

export async function DELETE(request: Request, { params }: Context) {
    try {
        connectToDatabase();

        if (request.method !== "DELETE") {
            return NextResponse.json(
                { message: "Method not allowed.", success: false, data: {} },
                { status: 405 }
            );
        }

        const authResult = await authMiddleware(request);
        const { message, success, data, status } = authResult;

        if (!success && status > 200) {
            return NextResponse.json({ message, success, data }, { status });
        }

        if (data?.user?.role !== "admin") {
            return NextResponse.json(
                { message: "You are not allowed to perform this action.", success: false, data: {} },
                { status: 403 }
            );
        }

        const { id } = await params;
        const loggedInUserId = data?.user?._id;

        if (id.toString() === loggedInUserId.toString()) return NextResponse.json({ message: "You can not delete your own account.", success: false, data: {} }, { status: 400 })

        await User.findByIdAndDelete(id)
        return NextResponse.json({ message: 'user have been deleted.', success: true, data: {} }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error while deleting user: ", error.message);
        } else {
            console.error("An unknown error occurred.");
        }
        return NextResponse.json(
            { message: "Internal server error.", success: false, data: {} },
            { status: 500 }
        );
    }
}