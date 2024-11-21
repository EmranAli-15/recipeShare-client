import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/baseApi'
import authReducer from './features/auth/authSlice'
import recipeReducer from './features/recipe/recipeSlice'
import userReducer from './features/user/userSlice'

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        authFormRedux: authReducer,
        recipeFromRedux: recipeReducer,
        userFromRedux: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
