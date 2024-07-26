import { configureStore,combineReducers } from "@reduxjs/toolkit";

import loginReducer from './slices/LoginSlice';
import employeeReducer from './slices/EmployeeSlice';
import ApplicantReducers from './slices/ApplicantsSlice';

const reducers = combineReducers({
    // Add your reducers here
    login:loginReducer,
    employees:employeeReducer,
    Applicants:ApplicantReducers
});

const store = configureStore({
    reducer: reducers
});

export { store };