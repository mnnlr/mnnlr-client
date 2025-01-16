import { createSlice } from "@reduxjs/toolkit";
import {
  getAttendance,
  getAttendanceById,
  getHRperformance,
  getEmployeeWorkingHours,
  getTotalworkingHours,
  getHrPerformance,
  getAllHrAttandance,
} from "../actions/AttendanceAction";

const initialState = {
  attendances: [],
  workingHours: [],
  HrPerformance: { employeePerformances: [] },
  HrAttendance:[],
  attendance: {},
  totalWorkingHours: [],
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
      state.isLoading = true;
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

    // getEmployeeWorkingHours
    builder.addCase(getEmployeeWorkingHours.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getEmployeeWorkingHours.fulfilled, (state, { payload }) => {
      state.workingHours = payload;
      state.isLoading = false;
    });

    builder.addCase(getEmployeeWorkingHours.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });

    // getTotalworkingHours
    builder.addCase(getTotalworkingHours.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(getTotalworkingHours.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.totalWorkingHours = payload || []; 
    });

    builder.addCase(getTotalworkingHours.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    
    //Hr Performance
    builder.addCase(getHrPerformance.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    
    builder.addCase(getHrPerformance.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.HrPerformance = payload 
    });
    
    builder.addCase(getHrPerformance.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    
    //Hr Attendance
    builder.addCase(getAllHrAttandance.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    
    builder.addCase(getAllHrAttandance.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.HrAttendance = payload 
    });
    
    builder.addCase(getAllHrAttandance.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    
    
  },
});

export default AttendanceSlice.reducer;
