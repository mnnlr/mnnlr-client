import { createSlice } from "@reduxjs/toolkit";
import { getAllLeaveRequest } from "../actions/LeaveActions";

const initialState = {
    leaves: [],
    error: null,
    loading: false,
};

const leaveSlice = createSlice({
    name: "leave",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Get all leave
        builder.addCase(getAllLeaveRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllLeaveRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.leaves = action.payload;
            state.error = null;
        });
        builder.addCase(getAllLeaveRequest.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default leaveSlice.reducer;