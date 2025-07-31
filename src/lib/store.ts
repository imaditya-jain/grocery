import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/auth.slice'
import userReducer from './slices/user.slice'
import postReducer from './slices/posts.slice'
import productReducer from './slices/products.slice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            user: userReducer,
            post: postReducer,
            product: productReducer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']