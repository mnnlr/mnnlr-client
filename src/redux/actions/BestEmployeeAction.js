import { createAsyncThunk } from "@reduxjs/toolkit";

const getBestEmployee = createAsyncThunk(
    'getBestEmployee',
    async ({ period, accessToken, privateAxios }, { rejectWithValue }) => {
      try {
        const url = `/api/v1/performance/employeeoftheperiod?period=${period}`;
        
        // console.log('Making GET request to:', url);
  
 
        const response = await privateAxios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        // console.log('Response data:', response?.data);
  
        if (response.status === 200) {
          return response.data; // Ensure the data object is there
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

  export { getBestEmployee };