import { lazy,Suspense } from 'react';
import { Routes,Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import ApplyLeave from './Pages/ApplyLeave';
import Attendence from './Pages/Dashboard/Attendance';
import Performances from './Pages/Dashboard/Performances';
import NewApplicants from './Pages/Dashboard/NewApplicants';
import ReviewApplicant from './Pages/Dashboard/ReviewApplicant';
import CandidatesOnLeave from './Pages/Dashboard/CandidatesOnLeave';
import AttendenceHistory from './Pages/Dashboard/AttendanceHistory';
import FormPage from './Pages/Dashboard/FormPage';
import SendRecoveryLink from './Pages/SendRecoveryLink';
import PasswordRecover from './Pages/Recover-Password';
import LeaveDashboard from './Pages/Dashboard/LeaveDashboard';

const Login = lazy(() => import('./Pages/LogInSinUp'));
const PageLayOut = lazy(() => import('./Pages/PageLayOut'));
const Home = lazy(() => import('./Pages/Home'));
const About = lazy(() => import('./Pages/About'));
const Service = lazy(() => import('./Pages/Services'));
const SatisfiedClients = lazy(() => import('./Pages/SatisfiedClients'));
const ContactUs = lazy(() => import('./Pages/ContactUs'));
const Employees = lazy(() => import('./Pages/Employees'));
const EmployeeProfile = lazy(() => import('./Pages/Employee-Profile-Page'));
const ProfilePage = lazy(() => import('./Pages/ProfilePage'));

//dashboard pages
const DashboardLayout = lazy(() => import('./Pages/Dashboard/DashboardLayout'));
const DashboardHome = lazy(() => import('./Pages/Dashboard/DashboardHome'));
const Holidays = lazy(() => import('./Pages/Dashboard/Holidays'));
const DashboardProfile = lazy(() => import('./Pages/Dashboard/Profile'));
const UserProfile = lazy(() => import('./Pages/Dashboard/UserProfile'));
const TrackLeave = lazy(() => import('./Pages/Dashboard/TrackLeave'));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
          <Route path='connect-with-us' element={<Login/>} />
          <Route path="get-recovery-link" element={<SendRecoveryLink />} />
          <Route path="reset-password/:id" element={<PasswordRecover />} />
          <Route path="/" element={<PageLayOut />}>
            <Route index element={<Home />} />
            <Route path='services' element={<Service/>} />
            <Route path='about' element={<About/>} />
            <Route path='contact' element={<ContactUs/>} />
            <Route path='satisfied-clients' element={<SatisfiedClients />} />
            <Route path='profile' element={<ProfilePage />} />

            <Route element={<ProtectedRoute allowedRole={['admin','hr']}/>}>
              <Route path='employees' element={<Employees />} />
            </Route>
            <Route element={<ProtectedRoute allowedRole={['employee']}/>}>
              <Route path='apply-leave' element={<ApplyLeave />} />
            </Route>

            <Route element={<ProtectedRoute allowedRole={['admin','hr','employee']}/>} >
              <Route path='employee/:id' element={<EmployeeProfile/>} />
            </Route>

        </Route>


          <Route element={<ProtectedRoute allowedRole={['admin','hr']}/>}>
            <Route path='dashboard' element={<DashboardLayout />} >
                <Route index element={<DashboardHome />} />
                <Route path='holidays' element={<Holidays />} />  
                <Route path='profile' element={<DashboardProfile />} />
                <Route path='track-leave' element={<TrackLeave/>}/>
                <Route path='candidates-on-leave' element={<CandidatesOnLeave />} />
                <Route path='new-applicants' element={<NewApplicants/>} />
                <Route path='review-applicant/:id' element={<ReviewApplicant />} />
                <Route path='attendance' element={<Attendence />} />
                <Route path='attendence-history/:id' element={<AttendenceHistory />} />
                <Route path='performances' element={<Performances />} />
                <Route path='user-profile/:id' element={<UserProfile />} />
                <Route path='/dashboard/form' element={<FormPage/>} />
                <Route path='track-leave/requestleave' element={<LeaveDashboard/>}/>

               
            </Route>
          </Route>


      </Routes>
    </Suspense>
  )
}

export default App
