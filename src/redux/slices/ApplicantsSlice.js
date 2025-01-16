import { createSlice } from "@reduxjs/toolkit";
import { getAllNewApplicants,getNewApplicantById,updateNewApplicant } from "../actions/ApplicantActions";

const initialState = {
    newApplicants: [],
    applicant: {},
    message:'',
    totalApplicant: 0,
    loading: false,
    error: null
};

const newApplicantsSlice = createSlice({

    name: "newApplicants",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        
        builder.addCase(getAllNewApplicants.pending, (state) => {
            state.loading = true;
        });
        
        builder.addCase(getAllNewApplicants.fulfilled, (state, action) => {
            state.loading = false;
            state.newApplicants = action.payload;
            state.totalApplicant = action.payload.length
            state.error = null;
        });
        
        builder.addCase(getAllNewApplicants.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // get employee by id

        builder.addCase(getNewApplicantById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getNewApplicantById.fulfilled, (state, action) => {
            state.loading = false;
            state.applicant = action.payload;
            state.error = null;
        });
        builder.addCase(getNewApplicantById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // update applicant

        builder.addCase(updateNewApplicant.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateNewApplicant.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload
            state.error = null;
        });
        builder.addCase(updateNewApplicant.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

    },
   
});


export default newApplicantsSlice.reducer;