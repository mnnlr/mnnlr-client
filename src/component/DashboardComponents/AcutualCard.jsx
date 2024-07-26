import { useNavigate } from 'react-router-dom';

import GroupsIcon from '@mui/icons-material/Groups';
import { BsPersonFillX } from "react-icons/bs";
import { BsPersonFillCheck } from "react-icons/bs";
import { FaChartLine } from 'react-icons/fa';
import Card from './Card';

import { useSelector } from 'react-redux';

import '../../css/DashboardCss/ActualCard.css' 


const ActualCard = ({empFun}) => {
  const navigate = useNavigate();
  const {totalEmployees} = useSelector(state => state.employees);
  
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
      amount: "600",
      percentage: "+12%",
      icon: BsPersonFillCheck,
      bgColorFrom: "from-green-400",
      bgColorTo: "to-green-600",
      fun:()=>navigate('/dashboard/attendance')
    },
    {
      title: "Absent",
      amount: "50",
      percentage: "+25%",
      icon: BsPersonFillX,
      bgColorFrom: "from-red-400",
      bgColorTo: "to-red-600",
      fun:()=>navigate('/dashboard/attendance')
    },
    {
      title: "Performance",
      amount: "100K hrs",
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