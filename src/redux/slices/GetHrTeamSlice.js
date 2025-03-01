import { createSlice } from "@reduxjs/toolkit";
import { getHrTeamMembers } from "../actions/HrActions";

const initialState = {
    teamMembers: [],
    error: null,
    loading: false
};

const GetHrTeamSlice = createSlice({
    name: "Hrteams",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getHrTeamMembers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getHrTeamMembers.fulfilled, (state, action) => {
            state.loading = false;
            state.teamMembers = action.payload;
            state.error = null;
        });
        builder.addCase(getHrTeamMembers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default GetHrTeamSlice.reducer;
