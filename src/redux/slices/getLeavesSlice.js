import { createSlice } from "@reduxjs/toolkit";
import { getAllLeaves } from "../actions/LeaveActions";

const initialState = {
    AllLeave: [],
    error: null,
    loading: false,
};

const getLeaveSlice = createSlice({
    name: "AllLeave",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Get all leave
        builder.addCase(getAllLeaves.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllLeaves.fulfilled, (state, action) => {
            state.loading = false;
            state.AllLeave = action.payload;
            state.error = null;
        });
        builder.addCase(getAllLeaves.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default getLeaveSlice.reducer;