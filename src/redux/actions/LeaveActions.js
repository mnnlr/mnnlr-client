import { createAsyncThunk } from "@reduxjs/toolkit";

//get all leave

export const getAllLeaveRequest = createAsyncThunk(
    "getAllLeaveRequest",
    async (checkData, { rejectWithValue }) => {
        try {
            const { data, status } = await checkData?.privateAxios.get("/leave/leave-request", {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${checkData?.accessToken}`
                }
            });
            // console.log(data, status);
            return data?.Data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAllLeaves = createAsyncThunk(
    "getAllLeaves",
    async (checkData, { rejectWithValue }) => {
        try {
            const { data, status } = await checkData?.privateAxios.get("/leave", {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${checkData?.accessToken}`
                }
            });
            // console.log(data, status);
            return data?.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
