import { createSlice } from "@reduxjs/toolkit";
import { logInUser } from "../actions/loginActions";
import { AuthenticateUser } from "../actions/AuthenticateActions";
import { logOutUser } from "../actions/logOutAction";

const initialState = {
    user: {},
    isLoading: false,
    error: null,
};

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.user = { 
                _id:action.payload._id?action.payload._id:state.user._id,
                username:action.payload.username?action.payload.username:state.user.username,
                email:action.payload.email?action.payload.email:state.user.email,
                role:action.payload.role?action.payload.role:state.user.role,
                accessToken:action.payload.accessToken?action.payload.accessToken:state.user.accessToken,
            };
            state.isLoading = false;
            state.error = null;
        },
        removeUser: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.user = {};
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logInUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(logInUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.error = null;
        });
        builder.addCase(logInUser.rejected, (state,action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        //updating the state when the user is authenticated

        builder.addCase(AuthenticateUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(AuthenticateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = {...action.payload,accessToken:state.user.accessToken};
            state.error = null;
        });
        builder.addCase(AuthenticateUser.rejected, (state,action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        //updating the state when the user is logged out
        builder.addCase(logOutUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(logOutUser.fulfilled, (state) => {
            state.isLoading = false;
            state.user = {};
            state.error = null;
        });
        builder.addCase(logOutUser.rejected, (state,action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

    }
});

export const { updateUser,removeUser } = loginSlice.actions;

export default loginSlice.reducer;