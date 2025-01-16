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
            // Log parameter data for debugging
            console.log('Parameter data : ', Parameter?.data);

            // Make API request to add employee
            const { data, status } = await Parameter.privateAxios.post(
                '/api/v1/employee/new',
                Parameter.data,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "Authorization": `Bearer ${Parameter?.accessToken}`,
                    },
                }
            );

            // Check if status is OK (200)
            if (status === 201) {
                console.log('Employee added successfully:', data);
                return data;
            } else {
                console.error('Unexpected status:', status);
                return rejectWithValue('Unexpected response status');
            }

        } catch (error) {
            // Log the error for better understanding
            console.error('Error occurred while adding employee:', error);

            // Check if the error has a response (in case of network errors or server issues)
            if (error.response) {
                return rejectWithValue(error.response.data || 'Server error');
            }

            // Handle other types of errors (like network errors)
            return rejectWithValue(error.response || 'Something went wrong');
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

const deleteEmployeeById = createAsyncThunk('DeleteEmployee',
    async (Parameter, { rejectWithValue }) => {
        try {
            const { data } = await Parameter.privateAxios.delete(`/api/v1/employee/${Parameter.id}`);
            console.log('the deleted data is', data);
            return data;
        } catch (error) {
            console.log('error', error.response);
            return rejectWithValue(error.response.data.message)
        }
    }
)

export { getEmployees, getEmployeeById, addEmployee, updateEmployee, deleteEmployeeById };