import { createSlice } from "@reduxjs/toolkit";
import { getEmployees, getEmployeeById, addEmployee, updateEmployee } from "../actions/EmployeeAction";

const initialState = {
    employees: [],
    employee: {},
    totalEmployees: 0,
    message: null,
    isLoading: false,
    error: null,
};

const employeeSlice = createSlice({

    name: "employee",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // get all employees
        builder.addCase(getEmployees.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getEmployees.fulfilled, (state, action) => {
            state.isLoading = false;
            state.employees = action.payload;
            state.totalEmployees = action.payload.length
            state.error = null;
        });
        builder.addCase(getEmployees.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        // get employee by id

        builder.addCase(getEmployeeById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getEmployeeById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.employee = action.payload;
            state.error = null;
        });
        builder.addCase(getEmployeeById.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        // update employee
        builder.addCase(updateEmployee.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateEmployee.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = action.payload;
            state.error = null;
        });
        builder.addCase(updateEmployee.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        // add employee
        builder.addCase(addEmployee.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addEmployee.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = action.payload;
            state.error = null;
        });
        builder.addCase(addEmployee.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});


export default employeeSlice.reducer;