import { connectToDatabase } from "@/config";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {

        connectToDatabase()

        if (request.method !== "GET") return NextResponse.json({ success: false, message: "Method is not allowed.", data: {} }, { status: 405 })



    } catch (error) {
        if (error instanceof Error) {
            console.log(`An error occurred while fetching collections: ${error.message}`)
        } else {
            console.log(`An unknown error occurred.`)
        }
    }
}