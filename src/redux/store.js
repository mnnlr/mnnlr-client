import { configureStore, combineReducers } from "@reduxjs/toolkit";

import loginReducer from './slices/LoginSlice';
import employeeReducer from './slices/EmployeeSlice';
import ApplicantReducers from './slices/ApplicantsSlice';
import AttendanceResucer from "./slices/AttendanceSlice";
import leaveReducer from "./slices/leaveSlice";
import getLeaveSlice from "./slices/getLeavesSlice";
import BestEmployeeSlice from "./slices/BestEmployeeSlice";

const reducers = combineReducers({
    login: loginReducer,
    employees: employeeReducer,
    Applicants: ApplicantReducers,
    attendances: AttendanceResucer,
    leaves: leaveReducer,
    AllLeaves: getLeaveSlice,
    bestEmployee:BestEmployeeSlice
});

const store = configureStore({
    reducer: reducers
});

export { store };