import { login, register } from '@/services/authService';
import { createAsyncThunk, } from '@reduxjs/toolkit'
import {UserAuth} from "@/store/slices/authSlice";

export const loginUser = createAsyncThunk(
    'auth/login',
    async (user: UserAuth, { rejectWithValue }) => {
        return await login(user, rejectWithValue);
    }
)

export const registerUser = createAsyncThunk(
    'auth/register',
    async (user: UserAuth, { rejectWithValue }) => {
        return await register(user, rejectWithValue);
    }
)