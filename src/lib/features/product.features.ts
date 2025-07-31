import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Product } from "@/types/product.types";

interface Response {
    success: boolean,
    message: string,
    status: number,
    data: {
        product: Product,
        products: Product[]
    }
}

interface Error {
    status: number;
    success: boolean;
    message: string;
    data: Record<string, unknown> | null;
}

export const createProduct = createAsyncThunk<Response, Record<string, unknown>, { rejectValue: Error }>('/product/create', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/v2/products/create', data)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue({
                status: error.response?.status || 500,
                success: false,
                message: error.response?.data?.message || "Failed to create products.",
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

export const fetchProducts = createAsyncThunk<Response, Record<string, unknown>, { rejectValue: Error }>('/product/fetch-products', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/v2/products')
        return response.data

    } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue({
                status: error.response?.status || 500,
                success: false,
                message: error.response?.data?.message || "Failed to fetch products.",
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

export const fetchProduct = createAsyncThunk<Response, string, { rejectValue: Error }>('/product/fetch-product', async (slug, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/api/v2/products/${slug}`)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue({
                status: error.response?.status || 500,
                success: false,
                message: error.response?.data?.message || "Failed to fetch product.",
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

export const updateProduct = createAsyncThunk<Response, { id: string, data: Record<string, unknown> }, { rejectValue: Error }>('/product/update', async ({ id, data }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/api/v2/products/update/${id}`, data)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue({
                status: error.response?.status || 500,
                success: false,
                message: error.response?.data?.message || "Failed to update product.",
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

export const deleteProduct = createAsyncThunk<Response, string, { rejectValue: Error }>('/product/delete', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/api/v2/products/delete/${id}`)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue({
                status: error.response?.status || 500,
                success: false,
                message: error.response?.data?.message || "Failed to delete product.",
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