import { createAsyncThunk } from "@reduxjs/toolkit";

const getAllNewApplicants = createAsyncThunk(
    'getAllNewApplicants',
    async (Parameter, { rejectWithValue }) => {
        try {

            const {data,status} = await Parameter.privateAxios.get('/api/v1/newcandidate',{
                withCredentials: true,
                headers: {
                  contentType: "application/json",
                  "Authorization": `Bearer ${Parameter?.accessToken}`,
                },
            });

            if(status === 200){
                return data.Data;
            }
            
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const getNewApplicantById = createAsyncThunk(
    'getNewApplicantById',
    async (Parameter, { rejectWithValue }) => {
        try {

            const {data,status} = await Parameter.privateAxios.get(`/api/v1/newcandidate/${Parameter.id}`,{
                withCredentials: true,
                headers: {
                  contentType: "application/json",
                  "Authorization": `Bearer ${Parameter?.accessToken}`,
                },
              });

            if(status === 200){
                return data.Data;
            }
            
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    });

    const updateNewApplicant = createAsyncThunk(
        'updateNewApplicant',
        async (Parameter, { rejectWithValue }) => {
            try {
                const {data,status} = await Parameter.privateAxios.patch(`/api/v1/newcandidate/${Parameter.id}`,Parameter.Data,{
                    withCredentials: true,
                    headers: {
                      contentType: "application/json",
                      "Authorization": `Bearer ${Parameter?.accessToken}`,
                    },
                });
    
                if(status === 200){

                    return data.Data;

                }
                
            } catch (error) {
                return rejectWithValue(error.response.data.message);
            }
        });

export { getAllNewApplicants,getNewApplicantById,updateNewApplicant};