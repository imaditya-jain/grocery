import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/config';
import { authMiddleware } from '@/middleware';
import { User } from '@/models';

interface Context {
    params: Promise<{ id: string }>;
}

export async function GET(
    request: Request,
    { params }: Context
) {
    try {
        const { id } = await params;

        await connectToDatabase();

        if (request.method !== 'GET') {
            return NextResponse.json(
                { message: 'Method is not allowed.', success: false, data: {} },
                { status: 405 }
            );
        }

        // Authenticate the user
        const authResult = await authMiddleware(request);
        const { message, status, success, data } = authResult;

        if (!success && status > 200) {
            return NextResponse.json({ message, success, data: {} }, { status });
        }

        // Check if the user has the appropriate role
        if (data?.user?.role !== 'admin' && data?.user?.role !== 'user') {
            return NextResponse.json(
                { message: 'You are not authorized to perform this action.', success: false, data: {} },
                { status: 403 }
            );
        }

        // Validate the user ID
        if (!id) {
            return NextResponse.json(
                { message: 'User ID is required.', success: false, data: {} },
                { status: 400 }
            );
        }

        // Fetch the user from the database
        const user = await User.findById(id).select('-otp -password -refreshToken');

        if (!user) {
            return NextResponse.json(
                { message: 'User not found.', success: false, data: {} },
                { status: 404 }
            );
        }

        // Return the user data
        return NextResponse.json(
            { message: '', success: true, data: { user } },
            { status: 200 }
        );
    } catch (error) {
        console.error(
            'Error while fetching user:',
            error instanceof Error ? error.message : 'Unknown error'
        );
        return NextResponse.json(
            { message: 'Internal server error.', success: false, data: {} },
            { status: 500 }
        );
    }
}
