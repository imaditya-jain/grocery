import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { User } from '@/types/user.types'

interface Response {
    status: number;
    success: boolean;
    message: string;
    data: {
        user: User;
        users: User[];
    };
}

interface Error {
    status: number;
    success: boolean;
    message: string;
    data: Record<string, unknown> | null;
}

export const fetchUsers = createAsyncThunk<Response, Record<string, unknown>, { rejectValue: Error }>('/users/fetch-users', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/v2/users')
        return response.data

    } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue({
                status: error.response?.status || 500,
                success: false,
                message: error.response?.data?.message || "Failed to fetch users.",
                data: error.response?.data || null,
            });
        }
        return rejectWithValue({
            status: 500,
            success: false,
            message: "Something went wrong.",
            data: null,
        });
    }
}
);

export const fetchUser = createAsyncThunk<Response, string, { rejectValue: Error }>('/users/fetch-user', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/v2/users/${id}`);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue({
                status: error.response?.status || 500,
                success: false,
                message: error.response?.data?.message || "Failed to fetch user.",
                data: error.response?.data || null,
            });
        }
        return rejectWithValue({
            status: 500,
            success: false,
            message: "Something went wrong.",
            data: null,
        });
    }
});


export const updateUser = createAsyncThunk<
    Response,
    { id: string; data: Record<string, unknown> },
    { rejectValue: Error }
>(
    "/users/update-user",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/api/v2/users/update/${id}`, data);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue({
                    status: error.response?.status || 500,
                    success: false,
                    message: error.response?.data?.message || "Failed to update user.",
                    data: error.response?.data || null,
                });
            }
            return rejectWithValue({
                status: 500,
                success: false,
                message: "Something went wrong.",
                data: null,
            });
        }
    }
);

export const deleteUser = createAsyncThunk<Response, string, { rejectValue: Error }>('/users/delete-user', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/api/v2/users/delete/${id}`)
        return response.data

    } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue({
                status: error.response?.status || 500,
                success: false,
                message: error.response?.data?.message || "Failed to delete user.",
                data: error.response?.data || null,
            });
        }
        return rejectWithValue({
            status: 500,
            success: false,
            message: "Something went wrong.",
            data: null,
        });
    }
}
);