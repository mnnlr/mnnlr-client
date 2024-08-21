import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";

import LeaveStatus from "./LeaveStatus";
import LeavePieChart from "./LeavePieChart";

import { useSelector,useDispatch } from "react-redux";
import { getAllLeave } from "../../redux/actions/LeaveActions";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const LeaveDashboard = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const privateAxios = useAxiosPrivate();

  const [Data,setData] = useState([]);

  const { user } = useSelector((state) => state.login);
  const { leaves } = useSelector((state) => state.leaves);

  useEffect(() => {
    let isMounted = true;

    const findLeave = async () => {
      try {
        const foundLeave = await leaves.find(
          (leave) => leave?.leaveId === id
        );
        if (isMounted) {
          setData(foundLeave);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (leaves?.length === 0) {
      dispatch(getAllLeave({accessToken:user?.accessToken,privateAxios}));
    }

    findLeave();

    return () => {
      isMounted = false;
    };
  }, [id, leaves?.length]);

  return (
    <div className="p-6 min-h-screen">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 bg-white shadow-sm rounded-lg">
        {/* {data.map((item, index) => (
          <LeaveData
            key={index}
            title={item.title}
            value={item.value}
            bgColor={item.bgColor}
            textColor={item.textColor}
          />
        ))} */}
        <LeavePieChart
         title="Sick Leave"
         labels={['Balance', 'Used']}
         leaveData={[Data?.sickLeaveBalance,Data?.totalSickLeaveUsed]}
         totalLeave={Data?.sickLeaveBalance}/>
        <LeavePieChart
           title="Casual Leave"
           labels={['Balance', 'Used']}
           leaveData={[Data?.casualLeaveBalance,Data?.totalCasualLeaveUsed]}
           totalLeave={Data?.casualLeaveBalance}
        />
        <LeavePieChart
           title="Total Leave"
           labels={['Balance', 'Used']}
           leaveData={[Data?.leaveBalance,Data?.totalCasualLeaveUsed+Data?.totalSickLeaveUsed]}
           totalLeave={Data?.leaveBalance}
        />
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-lg mt-10">
        <LeaveStatus Data = {Data}/>
      </div>
    </div>
  );
};

export default LeaveDashboard;
