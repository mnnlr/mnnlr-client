import { createAsyncThunk } from "@reduxjs/toolkit";

const getHrTeamMembers = createAsyncThunk(
    "Hrteams/getHrTeamMembers",
    async (params, { rejectWithValue }) => {
        try {
            console.log(params);

            const response = await params.privateAxios.get(`/api/v1/hrTeamById/${params.id}`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${params.accessToken}`,
                },
            });

            console.log(response.data);
            return response.data?.data; 
        } catch (error) {
            console.log(error)
            return rejectWithValue(error?.response?.data?.message || "Failed to fetch HR Team Members"); 
        }
    }
);

export { getHrTeamMembers };
