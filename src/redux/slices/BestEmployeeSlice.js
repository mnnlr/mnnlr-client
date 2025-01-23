import { createSlice, } from "@reduxjs/toolkit";
import { getBestEmployee } from "../actions/BestEmployeeAction";

const BestEmployeeSlice = createSlice({
  name: "bestEmployee",
  initialState: {
    bestEmployee: {
        employees:[]}, 
    isLoading: false,   
    error: null,        
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBestEmployee.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBestEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bestEmployee = action.payload; 
      })
      .addCase(getBestEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default BestEmployeeSlice.reducer;
