import { createAsyncThunk } from "@reduxjs/toolkit";

const getEmployeeWorkingHours = createAsyncThunk(
    'getEmployeeWorkingHours',
    async (Parameter,{rejectWithValue}) => {
        try {
            const {data,status} = await Parameter.privateAxios.get('/api/v1/performance', {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${Parameter?.accessToken}`,
                },
            });
            console.log('getEmployeeWorkingHours data : ',data);
            return data?.Data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }   
);

const getAttendance = createAsyncThunk(
   'getAttendance',
    async (Parameter,{rejectWithValue}) => {
        try {
            const {data,status} = await Parameter.privateAxios.get('/api/v1/performance/attendance',{
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${Parameter?.accessToken}`,
                },
            });
            console.log('getAttendance data : ',data);
            if(status === 200){
                return data?.Data;
            }
        } catch (error) {
            console.log('getAttendanceById error : ',error);
            return rejectWithValue(error.response.data.message);
        }
    }
);

const getAttendanceById = createAsyncThunk(
    'getAttendanceById',
    async (Parameter,{rejectWithValue}) => {
        try {
            const {data,status} = await Parameter.privateAxios.get(`/api/v1/performance/attendance/${Parameter.id}`,{
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${Parameter?.accessToken}`,
                },
            });
            console.log('getAttendanceById data : ',data);
            return data?.Data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export {getAttendance,getAttendanceById,getEmployeeWorkingHours};