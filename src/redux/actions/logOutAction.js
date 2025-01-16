import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from '../../customAxios/authAxios'

const logOutUser = createAsyncThunk(
    'logOut',
    async (_, { rejectWithValue }) => {
        try {
            console.log('logOutUser')
            const {data,status} = await customAxios.post('/api/v1/logout',{},{
                withCredentials: true,
                headers: {
                  contentType: "application/json",
                },
              });
              console.log('data : ',data)
            if(status === 200){
                return data;
            }
            
        } catch (error) {
            console.log('error : ',error.response)
            return rejectWithValue(error.response.data.message);
        }
    }
);

export { logOutUser };