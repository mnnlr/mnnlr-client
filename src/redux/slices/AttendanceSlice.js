import { createSlice } from "@reduxjs/toolkit";
import { getAttendance, getAttendanceById } from "../actions/AttendanceAction";

const initialState = {
    attendances: [],
    attendance: {},
    isLoading: false,
    error: null,
};

const AttendanceSlice = createSlice({
    name: "attendance",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // getAttendance
        builder.addCase(getAttendance.pending, (state) => {
            state.status = true;
        });

        builder.addCase(getAttendance.fulfilled, (state, { payload }) => {
            state.attendances = payload;
            state.isLoading = false;
        });

        builder.addCase(getAttendance.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        });

        // getAttendanceById

        builder.addCase(getAttendanceById.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(getAttendanceById.fulfilled, (state, { payload }) => {
            state.attendance = payload;
            state.isLoading = false;
        });

        builder.addCase(getAttendanceById.rejected, (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        });
    },
});

export default AttendanceSlice.reducer;