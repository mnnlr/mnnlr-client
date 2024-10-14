import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const getEmployees = createAsyncThunk(
    'Employee',
    async (Parameter, { rejectWithValue }) => {
        try {

            const { data, status } = await Parameter.privateAxios.get('/api/v1/employees', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${Parameter?.accessToken}`,
                },
            });

            if (status === 200) {
                return data.Data;
            }

        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const addEmployee = createAsyncThunk(
    'AddEmployee',
    async (Parameter, { rejectWithValue }) => {
        try {
            console.log('Parameter data : ', Parameter?.data)
            const { data, status } = await Parameter.privateAxios.post('/api/v1/employee/new', Parameter.data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${Parameter?.accessToken}`,
                },
            });

            if (status === 200) {
                return data.Data;
            }

        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const updateEmployee = createAsyncThunk(
    'UpdateEmployee',
    async (Parameter, { rejectWithValue }) => {
        try {
            // console.log('Parameter data : ', JSON.stringify(Parameter?.data))
            // console.log(first)
            // const { data, status } = await Parameter.privateAxios.patch(`/api/v1/employee/${Parameter.id}`, Parameter.data, {
            const { data, status } = await Parameter.privateAxios.patch(`/api/v1/employee/${Parameter.id}`, Parameter.data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${Parameter?.accessToken}`,
                },
            });

            if (status === 200) {
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
            if (!Parameter.id) {
                url = '/api/v1/employee';
            } else {
                url = `/api/v1/employee/${Parameter.id}`;
            }
            const { data, status } = await Parameter.privateAxios.get(url, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${Parameter?.accessToken}`,
                },
            });

            if (status === 200) {
                return data.Data;
            }

        } catch (error) {
            console.log('error : ', error.response)
            return rejectWithValue(error.response.data.message);
        }
    }
);

export { getEmployees, getEmployeeById, addEmployee, updateEmployee };