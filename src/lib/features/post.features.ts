import { createAsyncThunk } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"
import Post from "@/types/post.types"

interface Response {
    success: boolean,
    message: string,
    status: number,
    data: {
        post: Post,
        posts: Post[]
        totalPages?: number;
        totalPosts?: number;
        currentPage?: number;
    }
}

interface Error {
    status: number;
    success: boolean;
    message: string;
    data: Record<string, unknown> | null;
}

export const createPostHandler = createAsyncThunk<Response, Record<string, unknown>, { rejectValue: Error }>('/posts/create', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/v2/posts/create', data)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue({
                status: error.response?.status || 500,
                success: false,
                message: error.response?.data?.message || "Failed to create post.",
                data: error.response?.data || null,
            })
        } else {
            return rejectWithValue({
                status: 500,
                success: false,
                message: "Something went wrong.",
                data: null,
            });
        }
    }
})

export const fetchPostsHandler = createAsyncThunk<Response, string, { rejectValue: Error }>('/posts/fetch-posts', async (page, { rejectWithValue }) => {
    try {
        const response = await axios.post(`/api/v2/posts/`, { pageNo: page })
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue({
                status: error.response?.status || 500,
                success: false,
                message: error.response?.data?.message || "Failed to fetch posts.",
                data: error.response?.data || null,
            })
        } else {
            return rejectWithValue({
                status: 500,
                success: false,
                message: "Something went wrong.",
                data: null,
            });
        }
    }
})

export const fetchPostHandler = createAsyncThunk<Response, string, { rejectValue: Error }>('/posts/fetch-post', async (slug, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/v2/posts/${slug}`)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue({
                status: error.response?.status || 500,
                success: false,
                message: error.response?.data?.message || "Failed to fetch post.",
                data: error.response?.data || null,
            })
        } else {
            return rejectWithValue({
                status: 500,
                success: false,
                message: "Something went wrong.",
                data: null,
            });
        }
    }
})

export const updatePostHandler = createAsyncThunk<Response, { id: string, data: Record<string, unknown> }, { rejectValue: Error }>('/posts/update-post', async ({ id, data }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/api/v2/posts/update/${id}`, data)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue({
                status: error.response?.status || 500,
                success: false,
                message: error.response?.data?.message || "Failed to update post.",
                data: error.response?.data || null,
            })
        } else {
            return rejectWithValue({
                status: 500,
                success: false,
                message: "Something went wrong.",
                data: null,
            });
        }
    }
})

export const deletePostHandler = createAsyncThunk<Response, string, { rejectValue: Error }>('/posts/delete-post', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/api/v2/posts/delete/${id}`)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue({
                status: error.response?.status || 500,
                success: false,
                message: error.response?.data?.message || "Failed to delete post.",
                data: error.response?.data || null,
            })
        } else {
            return rejectWithValue({
                status: 500,
                success: false,
                message: "Something went wrong.",
                data: null,
            });
        }
    }
})