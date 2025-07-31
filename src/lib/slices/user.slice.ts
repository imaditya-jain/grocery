import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteUser, fetchUser, fetchUsers, updateUser } from "../features/user.features";
import { User } from '@/types/user.types'

interface ApiResponse<T = unknown> {
    success: boolean;
    message?: string;
    data?: T;
}

interface UserData {
    user: User;
    users: User[];
}

export interface UserState {
    user: User | null;
    users: User[];
    loading: boolean;
    error: boolean;
    message: string;
}

const initialState: UserState = {
    user: null,
    users: [],
    loading: false,
    error: false,
    message: "",
};

const userSlice = createSlice({
    name: "user",
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
        setFulfilled: (state, action: PayloadAction<ApiResponse<UserData>>) => {
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
        builder.addCase(fetchUsers.pending, (state) => { userSlice.caseReducers.setPending(state) })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                userSlice.caseReducers.setFulfilled(state, action);
                state.users = action.payload?.data?.users || [];
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                userSlice.caseReducers.setRejected(state, action)
                state.users = []
            })

            .addCase(fetchUser.pending, (state) => userSlice.caseReducers.setPending(state))
            .addCase(fetchUser.fulfilled, (state, action) => {
                userSlice.caseReducers.setFulfilled(state, action)
                state.user = action?.payload?.data?.user
            })
            .addCase(fetchUser.rejected, (state, action) => {
                userSlice.caseReducers.setRejected(state, action)
                state.user = null
            })

            .addCase(updateUser.pending, (state) => userSlice.caseReducers.setPending(state))
            .addCase(updateUser.fulfilled, (state, action) => {
                userSlice.caseReducers.setFulfilled(state, action)
                state.user = action.payload?.data?.user
            })
            .addCase(updateUser.rejected, (state, action) => {
                userSlice.caseReducers.setRejected(state, action)
                state.user = null
            })

            .addCase(deleteUser.pending, (state) => userSlice.caseReducers.setPending(state))
            .addCase(deleteUser.fulfilled, (state, action) => userSlice.caseReducers.setFulfilled(state, action))
            .addCase(deleteUser.rejected, (state, action) => userSlice.caseReducers.setRejected(state, action))

    },
});

export const { clearState } = userSlice.actions;
export default userSlice.reducer;
