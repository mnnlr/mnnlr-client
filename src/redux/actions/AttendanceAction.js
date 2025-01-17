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
            // console.log('getEmployeeWorkingHours data : ',data);
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
            //  console.log('getAttendance data : ',data);
            if(status === 200){
                return data?.Data;
            }
        } catch (error) {
            console.log('getAttendanceById error : ',error);
            return rejectWithValue(error.response.data.message);
        }
    }
);
const getTotalworkingHours = createAsyncThunk(
    'getTotalworkingHours',
    async ({ id, period, accessToken, privateAxios }, { rejectWithValue }) => {
      try {
        const url = `/api/v1/performance/attendance/detail/${id}?period=${period}`;
        
        // console.log('Making GET request to:', url);
  
 
        const response = await privateAxios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        // console.log('Response data:', response.data.data);
  
        if (response.status === 200) {
          return response.data?.data; // Ensure the data object is there
        } else {
          throw new Error('Failed to fetch working hours data');
        }
      } catch (error) {
        console.error('Error in getTotalworkingHours:', error);
  
        const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
        
        return rejectWithValue(errorMessage);
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
            //  console.log('getAttendanceById data : ',data);
            return data?.Data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const employeeWeeklyandMonthlyAttendance=createAsyncThunk(
    'employeeWeeklyandMonthlyAttendance',
    async (Parameter,{rejectWithValue}) => {
        try {
            const {data} = await Parameter.privateAxios.get(`/api/v1/performance/workingHours/${Parameter.id}`,{
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${Parameter?.accessToken}`,
                },
            });
            console.log('employeeWeeklyandMonthlyAttendance data : ',data);
            return data?.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);  
const getHrPerformance = createAsyncThunk(
    'getHrPerformance',
    async (Parameter,{rejectWithValue}) => {
        try {
            const {data} = await Parameter.privateAxios.get(`/api/v1/performance/Hr/performance`,{
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${Parameter?.accessToken}`,
                },
            });
            //  console.log('AttendanceStatus data : ',data);
            return data?.Data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const getAllHrAttandance=createAsyncThunk(
    'getAllHrAttandance',
    async (Parameter,{rejectWithValue}) => {
        try {
            const {data} = await Parameter.privateAxios.get(`/api/v1/performance/Hr/attendance`,{
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${Parameter?.accessToken}`,
                },
            });
            //  console.log('getAllHrAttandance data : ',data);
            return data?.Data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export {getAttendance,getAttendanceById,getEmployeeWorkingHours,getTotalworkingHours,getHrPerformance,getAllHrAttandance,employeeWeeklyandMonthlyAttendance};