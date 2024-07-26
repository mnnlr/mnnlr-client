import { createAsyncThunk } from "@reduxjs/toolkit";

const AuthenticateUser = createAsyncThunk(
    'Authenticate',
    async (Parameter, { rejectWithValue }) => {
        try {

            const {data,status} = await Parameter.privateAxios.get('/authenticate',{
                withCredentials: true,
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization": `Bearer ${Parameter?.accessToken}`,
                },
            });

            if(status === 200){
                return data.data;
            }
            
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export { AuthenticateUser };