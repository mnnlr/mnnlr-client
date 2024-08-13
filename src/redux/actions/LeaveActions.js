import { createAsyncThunk } from "@reduxjs/toolkit";

//get all leave

export const getAllLeave = createAsyncThunk(
    "getAllLeave",
    async (checkData, { rejectWithValue }) => {
        try {
            const {data,status} = await checkData?.privateAxios.get("/leave",{
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${checkData?.accessToken}`
                }
            });
            console.log(data,status);
            return data?.Data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
