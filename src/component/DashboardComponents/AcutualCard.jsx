import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import GroupsIcon from '@mui/icons-material/Groups';
import { BsPersonFillX } from "react-icons/bs";
import { BsPersonFillCheck } from "react-icons/bs";
import { FaChartLine } from 'react-icons/fa';
import Card from './Card';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import { useSelector,useDispatch } from 'react-redux';
import { getAttendance,getEmployeeWorkingHours } from '../../redux/actions/AttendanceAction';
import convertSecondsToHHMMSS from '../../utils/convertSecondsToHHMMSS';
import '../../css/DashboardCss/ActualCard.css' 


const ActualCard = ({empFun}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const privateAxios = useAxiosPrivate();

  const {user} = useSelector((state) => state.login);

  const {attendances,workingHours} = useSelector((state) => state.attendances);
  const {totalEmployees} = useSelector(state => state.employees);
// console.log("Attendance",attendances);

//   console.log('workingHours : ',workingHours);
  
  useEffect(() => {
    let isMounted = true;
    if(isMounted){
      dispatch(getAttendance({privateAxios,accessToken:user.accessToken}));
      dispatch(getEmployeeWorkingHours({privateAxios,accessToken:user.accessToken}));
    }
    return () => {
      isMounted = false;
    }
    }, [dispatch,privateAxios]);

  const present = attendances.filter((attendance) => attendance.isActive) || <p>calculating...</p>;
  // console.log(present);
  
  const absent = attendances?.length - present?.length || <p>calculating...</p>;

  const cardData = [
    {
      title: "Total Employees",
      amount: totalEmployees,
      percentage: "+5%",
      icon: GroupsIcon,
      fun:empFun,
      bgColorFrom: "from-blue-400",
      bgColorTo: "to-blue-600",
    },
    {
      title: "Present",
      amount: present?.length,
      percentage: "+12%",
      icon: BsPersonFillCheck,
      bgColorFrom: "from-green-400",
      bgColorTo: "to-green-600",
      fun:()=>navigate('/dashboard/attendance')
    },
    {
      title: "Absent",
      amount: absent,
      percentage: "+25%",
      icon: BsPersonFillX,
      bgColorFrom: "from-red-400",
      bgColorTo: "to-red-600",
      fun:()=>navigate('/dashboard/attendance')
    },
    {
      title: "Performance",
      amount: `${convertSecondsToHHMMSS(workingHours?.totalWorkingTimeOfAllEmployee)}`,
      percentage: "+5%",
      icon: FaChartLine,
      bgColorFrom: "from-purple-400",
      bgColorTo: "to-purple-600",
      fun:()=>navigate('/dashboard/performances')
    },
  ];

  return (
    <div className="dashboard-actual-card-container">
      {cardData.map((data, index) => (
        <div key={index} onClick={data.fun}>
          <Card
            title={data.title}
            
            amount={data.amount}
            percentage={data.percentage}
            icon={data?.icon}
            bgColorFrom={data.bgColorFrom}
            bgColorTo={data.bgColorTo}
          />
        </div>
      ))}
    </div>
  );
};

export default ActualCard;
