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
            // console.log('getAttendance data : ',data);
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
        // Construct the endpoint URL dynamically with the id and period query parameter
        const url = `/api/v1/performance/attendance/detail/${id}?period=${period}`;
        
        // console.log('Making GET request to:', url);
  
        // Send the GET request
        const response = await privateAxios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`, // Include token for authentication
          },
        });
  
        console.log('Response data:', response.data.data);
  
        // Check if the response status is 200 (OK) and return the data
        if (response.status === 200) {
          return response.data?.data; // Ensure the data object is there
        } else {
          throw new Error('Failed to fetch working hours data');
        }
      } catch (error) {
        // Enhanced error handling: log the full error response
        console.error('Error in getTotalworkingHours:', error);
  
        // Check for specific error response or fallback to general error message
        const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
        
        // Return the error message using rejectWithValue
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
            // console.log('getAttendanceById data : ',data);
            return data?.Data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
const getAttendanceStatus = createAsyncThunk(
    'getAttendancestatus',
    async (Parameter,{rejectWithValue}) => {
        try {
            const {data} = await Parameter.privateAxios.get(`/api/v1/performance/status`,{
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${Parameter?.accessToken}`,
                },
            });
            console.log('AttendanceStatus data : ',data.data);
            return data?.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export {getAttendance,getAttendanceById,getEmployeeWorkingHours,getTotalworkingHours,getAttendanceStatus};