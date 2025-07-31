import { connectToDatabase } from "@/config";
import { authMiddleware } from "@/middleware";
import { Collection } from "@/models";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    try {

        connectToDatabase()

        if (request.method !== "DELETE") return NextResponse.json({ success: false, message: 'Method not allowed.', data: {} }, { status: 405 })

        const authResult = await authMiddleware(request)
        const { status, success, message, data } = authResult

        if (!success && status > 200) return NextResponse.json({ success, message, data }, { status })

        if (data?.user?.role !== "admin") return NextResponse.json({ success: false, message: "You are not authorized to perform this action.", data: {} }, { status: 403 })

        const { _id, name } = await request.json()

        if (!_id || !name) return NextResponse.json({ success: false, message: "Please provide all necessary fields.", data: {} }, { status: 400 })

        if (name === "Uncategorized") return NextResponse.json({ success: false, message: "You cannot delete the 'Uncategorized' collection.", data: {} }, { status: 400 })

        const isExist = await Collection.findById(_id)

        if (!isExist) return NextResponse.json({ success: false, message: "Collection not found.", data: {} }, { status: 404 })

        const result = await Collection.deleteOne({ _id })

        return NextResponse.json({ success: true, message: `"${name}" collection deleted successfully.`, data: { result } }, { status: 200 })

    } catch (error) {
        if (error instanceof Error) {
            console.log(`An error occurred while deleting collections: ${error.message}`)
        } else {
            console.log(`An unknown error occurred.`)
        }

        return NextResponse.json({ success: false, message: 'Internal server error.', data: {} }, { status: 500 })
    }
}