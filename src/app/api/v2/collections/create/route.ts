import { connectToDatabase } from "@/config";
import { authMiddleware } from "@/middleware";
import { Collection } from "@/models";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {

        connectToDatabase()

        if (request.method !== 'POST') return NextResponse.json({ success: false, message: "Method not allowed.", data: {} }, { status: 405 })

        const authResult = await authMiddleware(request)
        const { success, status, message, data } = authResult

        if (!success && status > 200) return NextResponse.json({ success, message, data }, { status: 401 })

        if (data?.user?.role !== "admin") return NextResponse.json({ message: "You are not authorized to perform this action.", success: false, data: {} }, { status: 403 })

        const { name, description, image, parent } = await request.json()

        if (parent && parent !== undefined && parent !== null && parent !== "") {
            const isParentCollectionExist = await Collection.findById(parent)

            if (!isParentCollectionExist) return NextResponse.json({ success: false, message: "Parent collection not found.", data: {} }, { status: 400 });
        }

        if (!name) return NextResponse.json({ success: false, message: 'Please provide all required fields.', data: {} }, { status: 400 })

        const newCollection = new Collection({ name, description, image, parent })

        const collection = await newCollection.save()

        const createdCollection = await Collection.findById(collection._id)

        if (!createdCollection) return NextResponse.json({ success: false, message: 'Something went wrong.', data: {} }, { status: 500 })

        return NextResponse.json({ success: true, message: 'Collection created successfully.', data: { collection: collection } }, { status: 201 })

    } catch (error) {
        if (error instanceof Error) {
            console.log(`An error occurred while creating collections: ${error.message}`)
        } else {
            console.log('An unknown error occurred.')
        }

        return NextResponse.json({ success: false, message: "Internal server error.", data: {} }, { status: 500 })
    }
}