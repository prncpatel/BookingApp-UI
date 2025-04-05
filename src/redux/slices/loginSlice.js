import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: null,
    loginError: null,
    isSignUp: false,
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.login = action.payload;
        },
        loginError: (state, action) => {
            state.loginError = action.payload;
        },
        setSignUp: (state, action) => {
            state.isSignUp = action.payload;
        },
    }
});

export const { login, loginError, userDetails, setSignUp } = userSlice.actions;
export default userSlice.reducer