import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product.types";
import { createProduct, deleteProduct, fetchProduct, fetchProducts, updateProduct } from "../features/product.features";

interface ProductState {
    product: Product | null;
    products: Product[];
    loading: boolean;
    error: boolean;
    message: string;
}

interface ApiResponse<T = unknown> {
    success: boolean;
    message?: string;
    data?: T;
}

interface ProductData {
    product: Product;
    products: Product[];
}

const initialState: ProductState = {
    product: null,
    products: [],
    loading: false,
    error: false,
    message: '',
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        clearState: (state) => {
            state.error = false
            state.loading = false
            state.message = ''
        },
        setPending: (state) => {
            state.error = false
            state.loading = true
            state.message = ''
        },
        setFulfilled: (state, action: PayloadAction<ApiResponse<ProductData>>) => {
            state.error = false
            state.loading = false
            state.message = action.payload?.message || ''
        },
        setRejected: (state, action) => {
            state.error = true
            state.loading = false
            state.message = action?.payload?.message || ''
        }

    },
    extraReducers: (builder) => {
        builder.addCase(createProduct.pending, (state) => productSlice.caseReducers.setPending(state))
            .addCase(createProduct.fulfilled, (state, action) => {
                productSlice.caseReducers.setFulfilled(state, action)
                state.product = action.payload?.data?.product
            })
            .addCase(createProduct.rejected, (state, action) => {
                productSlice.caseReducers.setRejected(state, action)
                state.product = null
            })

            .addCase(fetchProducts.pending, (state) => productSlice.caseReducers.setPending(state))
            .addCase(fetchProducts.fulfilled, (state, action) => {
                productSlice.caseReducers.setFulfilled(state, action)
                state.products = action.payload?.data?.products
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                productSlice.caseReducers.setRejected(state, action)
                state.products = []
            })

            .addCase(fetchProduct.pending, (state) => productSlice.caseReducers.setPending(state))
            .addCase(fetchProduct.fulfilled, (state, action) => {
                productSlice.caseReducers.setFulfilled(state, action)
                state.product = action.payload?.data?.product
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                productSlice.caseReducers.setRejected(state, action)
                state.product = null
            })

            .addCase(updateProduct.pending, (state) => productSlice.caseReducers.setPending(state))
            .addCase(updateProduct.fulfilled, (state, action) => {
                productSlice.caseReducers.setFulfilled(state, action)
                state.product = action.payload?.data?.product
            })
            .addCase(updateProduct.rejected, (state, action) => {
                productSlice.caseReducers.setRejected(state, action)
                state.product = null
            })

            .addCase(deleteProduct.pending, (state) => productSlice.caseReducers.setPending(state))
            .addCase(deleteProduct.fulfilled, (state, action) => productSlice.caseReducers.setFulfilled(state, action))
            .addCase(deleteProduct.rejected, (state, action) => productSlice.caseReducers.setRejected(state, action))
    }
})

export const { clearState } = productSlice.actions
export default productSlice.reducer