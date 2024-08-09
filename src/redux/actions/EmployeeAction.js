import { createAsyncThunk } from "@reduxjs/toolkit";

const getEmployees = createAsyncThunk(
    'Employee',
    async (Parameter, { rejectWithValue }) => {
        try {
            
            const {data,status} = await Parameter.privateAxios.get('/api/v1/employees',{
                withCredentials: true,
                headers: {
                  'Content-Type': 'application/json',
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

const getEmployeeById = createAsyncThunk(
    'EmployeeById',
    async (Parameter, { rejectWithValue }) => {
        try {

            let url = '';
            if(!Parameter.id){
                url = '/api/v1/employee';
            }else{
                url = `/api/v1/employee/${Parameter.id}`;
            }
            const {data,status} = await Parameter.privateAxios.get(url,{
                withCredentials: true,
                headers: {
                  'Content-Type': 'application/json',
                  "Authorization": `Bearer ${Parameter?.accessToken}`,
                },
            });

            if(status === 200){
                return data.Data;
            }
            
        } catch (error) {
            console.log('error : ',error.response)
            return rejectWithValue(error.response.data.message);
        }
    }
);

export { getEmployees,getEmployeeById };