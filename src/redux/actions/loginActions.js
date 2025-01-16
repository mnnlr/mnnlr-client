import { createAsyncThunk } from "@reduxjs/toolkit";
import defaultAxios from '../../customAxios/authAxios';

const logInUser = createAsyncThunk(
    'Login',
    async (DatatoValidate, { rejectWithValue }) => {
        try {
            const { data, status } = await defaultAxios.post('/api/v1/login', DatatoValidate, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (status === 200) {

                return data.foundUser;
            }
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data.message);
        }
    }
);

export { logInUser };