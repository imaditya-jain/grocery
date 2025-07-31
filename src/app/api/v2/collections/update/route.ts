import { connectToDatabase } from "@/config";
import { authMiddleware } from "@/middleware";
import { Collection } from "@/models";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    try {

        connectToDatabase()

        if (request.method !== "PUT") return NextResponse.json({ success: false, message: 'Method not allowed.', data: {} }, { status: 500 })

        const authResult = await authMiddleware(request)
        const { success, status, data, message } = authResult

        if (!success && status > 200) return NextResponse.json({ success, data, message }, { status })

        if (data?.user?.role !== "admin") return NextResponse.json({ success: false, message: 'You are not authorized to perform this action.', data: {} }, { status: 403 })

        const { _id, name, description, image, parent } = await request.json()

        if (!_id || !name) return NextResponse.json({ success: false, message: 'Collection ID and name are required.', data: {} }, { status: 400 });

        const isExist = await Collection.findById(_id)

        if (!isExist) return NextResponse.json({ success: false, message: `"${name}" collection not found.`, data: {} }, { status: 400 })

        if (parent && parent !== undefined && parent !== null && parent !== "") {
            const isParentCollectionExist = await Collection.findById(parent)

            if (!isParentCollectionExist) return NextResponse.json({ success: false, message: "Parent collection not found.", data: {} }, { status: 400 });
        }

        const updatedCollection = await Collection.findOneAndUpdate({ _id }, { $set: { name, description, image, parent } }, { new: true, upsert: true }).lean()

        if (!updatedCollection) return NextResponse.json({ success: false, message: "Something wents wrong.", data: {} }, { status: 500 })

        return NextResponse.json({ success: true, message: 'Collection updated successfully.', data: { collection: updatedCollection } }, { status: 200 })

    } catch (error) {
        if (error instanceof Error) {
            console.log(`An error occurred while updating collections: ${error.message}`)
        } else {
            console.log('An error unknown error occurred.')
        }

        return NextResponse.json({ success: false, message: 'Internal server error.', data: {} }, { status: 500 })
    }
}