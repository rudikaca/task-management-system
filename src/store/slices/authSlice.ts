import {ActionReducerMapBuilder, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginUser, registerUser} from "@/store/actions/authActions";
import {AuthState, FirebaseAuthResponse} from "@/models/types";

const initialState: AuthState = {
    loggedIn: false,
    loading: false,
};

const setLoader = (state: AuthState): void => {
    state.loading = true
    state.error = ''
};

const setLoginRejected = (state: AuthState, action: PayloadAction<string>): void => {
    state.loading = false
    state.error = action.payload;
};

const setLoginFulfilled = (state: AuthState, action: PayloadAction<FirebaseAuthResponse>): void => {
    state.loading = false
    state.user = {
        id: action.payload.id,
        email: action.payload.email,
        role: action.payload.displayName
    }
};

const setRegisterRejected = (state: AuthState, action: PayloadAction<string>): void => {
    state.loading = false
    state.loggedIn = false;
    state.error = action.payload;
};

const setRegisterFulfilled = (state: AuthState, action: PayloadAction<FirebaseAuthResponse>): void => {
    state.loading = false
    state.loggedIn = true
    state.user = {
        id: action.payload.id,
        email: action.payload.email,
        role: action.payload.role
    }
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<FirebaseAuthResponse>) {
            state.loggedIn = true
                state.user = {
                    id: action.payload.id,
                    email: action.payload.email,
                    role: action.payload.role
                }
        },

        logoutUser(state) {
            state.loggedIn = false
            state.user = undefined
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
        // login actions
        builder
            .addCase(loginUser.pending, setLoader)
            .addCase(loginUser.fulfilled, setLoginFulfilled)
            .addCase(loginUser.rejected, (state, action) => {
                setLoginRejected(state, action as PayloadAction<string>);
            })

            // register actions
            .addCase(registerUser.pending, setLoader)
            .addCase(registerUser.fulfilled, setRegisterFulfilled)
            .addCase(registerUser.rejected, (state, action) => {
                setRegisterRejected(state, action as PayloadAction<string>);
            });
    }
});

export const AuthActions = authSlice.actions;
export default authSlice.reducer;