import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from "@/models";
import mongoose from "mongoose";

const authMiddleware = async (request: Request) => {
    try {
        const cookies = request.headers.get("cookie");
        const token = cookies
            ? cookies.split("; ").find((cookie) => cookie.startsWith("accessToken="))?.split("=")[1]
            : null;

        const authHeader = request.headers.get("authorization");
        const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

        const accessToken = token || bearerToken;

        if (!accessToken) return { message: "Access token is missing.", success: false, data: {}, status: 401 };

        if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new Error('Access token secret is not defined.');
        }

        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET) as JwtPayload & { _id: string };

        if (!decodedToken || !decodedToken._id || !mongoose.isValidObjectId(decodedToken._id)) {
            return { message: 'Invalid token.', success: false, data: {}, status: 401 };
        }

        const user = await User.findById(decodedToken._id).select('-otp -password -refreshToken');
        if (!user) {
            return { message: 'User not found.', success: false, data: {}, status: 404 };
        }

        return { message: 'Authenticated successfully.', success: true, data: { user }, status: 200 };
    } catch (error) {
        if (error instanceof Error) {
            console.log('Error while authentication.', error.message);
        } else {
            console.log('An unknown error occurred.');
        }
        return { message: 'Internal server error.', success: false, status: 500 };
    }
};

export default authMiddleware
