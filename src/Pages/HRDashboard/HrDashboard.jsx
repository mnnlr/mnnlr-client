import React, { useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
import { FaRankingStar, FaUserTie } from 'react-icons/fa6';
import HrEmployee from './HrEmployee';
import { useNavigate } from 'react-router-dom';
import EmployeeTable from '../../component/DashboardComponents/EmployeeTable';
import { useDispatch, useSelector } from 'react-redux';
import { getAllHrAttandance, getHrPerformance } from '../../redux/actions/AttendanceAction';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import convertSecondsToHHMMSS from '../../utils/convertSecondsToHHMMSS';

// Register chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement // Add PointElement for Line chart
);

const HrDashboard = () => {

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.login);
  const { HrAttendance } = useSelector((state) => state.attendances);
  // console.log(HrAttendance);  

  const { HrPerformance } = useSelector((state) => state.attendances);
// console.log(HrPerformance);  
  const dispatch = useDispatch();
  const privateAxios = useAxiosPrivate();

  useEffect(() => {
    // Normally, you would dispatch an action to get real data
    dispatch(getAllHrAttandance({ privateAxios, accessToken: user.accessToken }));
    dispatch(getHrPerformance({ privateAxios, accessToken: user?.accessToken }));

  }, [dispatch, privateAxios]);

const hr= HrAttendance.length

const present = HrAttendance.filter((attendance) => attendance.isActive) || <p>calculating...</p>;
// console.log(present);


  const salaryData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Average Salary ($)',
        data: [5000, 5200, 5400, 5600, 5800],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const satisfactionData = {
    labels: ['Developers', 'Designers', 'Marketers', 'Managers'],
    datasets: [
      {
        label: 'Employee Satisfaction',
        data: [75, 85, 60, 50],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCD56', '#4BC0C0'],
        hoverOffset: 4
      }
    ]
  };

  const performanceData = {
    labels: ['Developer Team', 'Design Team', 'Marketing Team', 'Management Team'],
    datasets: [
      {
        label: 'Performance',
        data: [65, 84, 28, 16],
        backgroundColor: ['#36A2EB', '#4BC0C0', '#FF6384', '#FFCD56'],
      }
    ]
  };

  return (
    <>
      <div className="flex justify-center mt-5 ">
        <div className="bg-white shadow-lg py-2 px-3 w-full rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-purple-100 p-6 rounded-lg shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300"  style = {{width: '250px', margin : "20px"}}>
              <div className="flex items-center">
                <i className=" text-purple-500 text-2xl mr-3 px-2 py-2 rounded-full bg-purple-300"><FaUserTie /></i>
                <div>
                  <div className="text-gray-500 text-sm font-bold">Total HR</div>
                  <div className="text-xl font-bold">{hr}</div>
                </div>
              </div>
            </div>

            {/* <!-- Card 2 --> */}
            <div className="bg-green-100 p-6 rounded-lg shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300" onClick={() => navigate('hr-attendance')} style = {{width: '250px', margin : "20px"}}>
              <div className="flex items-center">
                <i className=" text-green-500 text-2xl mr-3  px-3 py-3 rounded-full bg-green-200"><FaUserTie /></i>
                <div>
                  <div className="text-gray-500 text-sm font-bold">Persent</div>
                  <div className="text-xl font-bold">{present.length}</div>
                </div>
              </div>
            </div>

            {/* <!-- Card 3 --> */}
            <div className="bg-orange-100 p-6 rounded-lg shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300" onClick={() => navigate('hr-leaves')} style = {{width: '250px', margin : "20px"}}>
              <div className="flex items-center ">
                <i className=" text-orange-500 text-2xl mr-3 px-3 py-3 rounded-full bg-orange-300"><FaUserTie /></i>
                <div>
                  <div className="text-gray-500 font-bold">Leaves</div>
                  <div className="text-xl font-bold">0</div>
                </div>
              </div>
            </div>

            {/* <!-- Card 4 --> */}
            <div className="bg-green-100 p-6 rounded-lg shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300" onClick={() => navigate('hr-performance')} style = {{width: '250px', margin : "20px"}}>
              <div className="flex items-center">
                <i className=" text-green-500 text-3xl mr-3 px-3 py-3 rounded-full bg-green-200"><FaRankingStar /></i>
                <div>
                  <div className="text-gray-500 text-sm font-bold">Performance</div>
                  <div className="text-xl font-bold">{convertSecondsToHHMMSS(HrPerformance?.totalWorkingTimeOfAllEmployee)}</div>
                </div>
              </div>
            </div>
          </div>


          {/* Graph Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className=" p-4 bg-gray-100">
              <h3 className="text-lg font-semibold mb-2">Salary Statistics</h3>
              <Line data={salaryData} />
            </div>
            <div className="p-4 bg-gray-100">
              <h3 className="text-lg font-semibold mb-2">Employee Satisfaction</h3>
              <Bar data={performanceData} />

            </div>
          </div>

          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-100">
            <div className='flex justify-center'>
              <h3 className="text-lg font-semibold mb-2">HR Performance Statistics</h3>
            </div>

            <Doughnut data={satisfactionData} />

          </div>
        </div> */}
        </div>

      </div>
      <div className='mt-3 '>
        <EmployeeTable />
        {/* <HrEmployee /> */}
      </div>
    </>
  );
};

export default HrDashboard;
