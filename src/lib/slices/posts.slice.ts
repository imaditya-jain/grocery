import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Post from "@/types/post.types";
import { createPostHandler, deletePostHandler, fetchPostHandler, fetchPostsHandler, updatePostHandler } from "../features/post.features";

interface PostState {
    post: Post | null;
    posts: Post[];
    totalPosts: number,
    totalPages: number,
    currentPage: number;
    loading: boolean;
    error: boolean;
    message: string;
}

interface ApiResponse<T = unknown> {
    success: boolean;
    message?: string;
    data?: T;
}

interface PostData {
    post?: Post;
    posts: Post[];
    totalPages?: number;
    totalPosts?: number;
    currentPage?: number;
}

const initialState: PostState = {
    post: null,
    totalPosts: 0,
    totalPages: 0,
    currentPage: 1,
    posts: [],
    loading: false,
    error: false,
    message: '',
};



const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        clearState: (state) => {
            state.error = false;
            state.loading = false;
            state.message = "";
        },
        setPending: (state) => {
            state.loading = true;
            state.error = false;
            state.message = "";
        },
        setFulfilled: (state, action: PayloadAction<ApiResponse<PostData>>) => {
            state.loading = false;
            state.error = false;
            state.message = action.payload?.message || "";
        },
        setRejected: (state, action) => {
            state.loading = false;
            state.error = true;
            state.message = action.payload?.message || "An error occurred";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPostHandler.pending, (state) => {
                postSlice.caseReducers.setPending(state);
            })
            .addCase(createPostHandler.fulfilled, (state, action) => {
                postSlice.caseReducers.setFulfilled(state, action);
                state.post = action.payload.data?.post || null;
            })
            .addCase(createPostHandler.rejected, (state, action) => {
                postSlice.caseReducers.setRejected(state, action);
                state.post = null;
            })

            .addCase(fetchPostsHandler.pending, (state) => {
                postSlice.caseReducers.setPending(state);
            })
            .addCase(fetchPostsHandler.fulfilled, (state, action) => {
                postSlice.caseReducers.setFulfilled(state, action);
                state.posts = action.payload.data?.posts || [];
                state.totalPages = action.payload.data?.totalPages || 0;
                state.totalPosts = action.payload.data?.totalPosts || 0;
                state.currentPage = action.payload.data?.currentPage || 1;
            })
            .addCase(fetchPostsHandler.rejected, (state, action) => {
                postSlice.caseReducers.setRejected(state, action);
                state.posts = [];
                state.totalPages = 0;
                state.totalPosts = 0;
                state.currentPage = 1;
            })

            .addCase(fetchPostHandler.pending, (state) => {
                postSlice.caseReducers.setPending(state);
            })
            .addCase(fetchPostHandler.fulfilled, (state, action) => {
                postSlice.caseReducers.setFulfilled(state, action);
                state.post = action.payload.data?.post || null;
            })
            .addCase(fetchPostHandler.rejected, (state, action) => {
                postSlice.caseReducers.setRejected(state, action);
                state.post = null;
            })

            .addCase(updatePostHandler.pending, (state) => {
                postSlice.caseReducers.setPending(state);
            })
            .addCase(updatePostHandler.fulfilled, (state, action) => {
                postSlice.caseReducers.setFulfilled(state, action);
                state.post = action.payload?.data?.post || null;
            })
            .addCase(updatePostHandler.rejected, (state, action) => {
                postSlice.caseReducers.setRejected(state, action);
                state.post = null;
            })

            .addCase(deletePostHandler.pending, (state) => {
                postSlice.caseReducers.setPending(state);
            })
            .addCase(deletePostHandler.fulfilled, (state, action) => {
                postSlice.caseReducers.setFulfilled(state, action);
            })
            .addCase(deletePostHandler.rejected, (state, action) => {
                postSlice.caseReducers.setRejected(state, action);
            });
    }

});

export const { clearState } = postSlice.actions
export default postSlice.reducer;

interface SEO {
    metaTitle: string;
    metaDescription: string;
}

interface Media {
    featuredImage: string;
}

interface Slug {
    current: string;
}

export interface LocalPost {
    _id: string;
    title: string;
    excerpt: string;
    media: Media;
    content: string;
    slug: Slug;
    seo: SEO;
}
