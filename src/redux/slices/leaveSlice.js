import { createSlice } from "@reduxjs/toolkit";
import { getAllLeave } from "../actions/LeaveActions";

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
        builder.addCase(getAllLeave.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllLeave.fulfilled, (state, action) => {
            state.loading = false;
            state.leaves = action.payload;
            state.error = null;
        });
        builder.addCase(getAllLeave.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default leaveSlice.reducer;