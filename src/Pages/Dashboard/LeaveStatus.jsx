import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const LeaveStatus = ({Data}) => {
  const navigate = useNavigate()
 const privateAxios = useAxiosPrivate();

  const handleReview = async (e,DataToEvaluate) => {
    try {
      console.log('DataToEvaluate : ',DataToEvaluate)
      const { data, status } = await privateAxios.put(
        `/leave/${Data?._id}`,
        DataToEvaluate
      );
      if(status === 200){
        alert(data?.message)
        navigate('/dashboard/track-leave')
      }
    } catch (error) {
      alert(error?.response?.data?.message)
    }
  }


  return (
    <div className="p-4 bg-white mx-2 sm:mx-4 md:mx-6 lg:mx-8">
      <div className="flex flex-col items-center md:mb-12 lg:flex-row lg:justify-start lg:space-x-4">
          <img
            src={
              Data?.avatar?.url ? 
              Data?.avatar?.url :
              "https://cdn.pixabay.com/photo/2023/07/04/07/25/self-consciousness-8105584_640.jpg"
            }
            alt="Employee"
            className="w-14 h-14 rounded-full mb-4 lg:w-24 lg:h-24"
          />
        <div className="text-center sm:text-left lg:space-y-2">
          <h2 className="text-lg lg:text-4xl">{Data?.name}</h2>
          <p className="text-sm text-gray-500">Designation : {Data?.designation}</p>
          <p className="text-sm text-gray-500">Designation Level : {Data?.designationLevel}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 mt-16">Previous Leave Information</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                Leave Type
              </th>
              <th className="px-4 py-2 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-4 py-2 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                End Date
              </th>
              <th className="px-4 py-2 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-4 py-2 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Data?.leavesDetails?.map((record, index) => (
              <tr key={index}>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {record?.typeOfLeave} Leave
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {record?.startDate?.split('T')[0]}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {record?.endDate?.split('T')[0]}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {/* dutation of leave */}
                  {Math.abs(new Date(record?.endDate) - new Date(record?.startDate)) / (1000 * 60 * 60 * 24)+1} Day
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {record?.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="text-xl font-semibold mt-16 mb-4">
        Current Leave Information
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                Leave Type
              </th>
              <th className="px-4 py-2 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                Applied On
              </th>
              <th className="px-4 py-2 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-4 py-2 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                End Date
              </th>
              <th className="px-4 py-2 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-4 py-2 text-left text-xs font-black text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                {Data?.leaveType}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                {Data?.dateApplied}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                {Data?.startDate}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                {Data?.endDate}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                {Data?.duration} Day
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                {Data?.status}  
              </td>
            </tr>
          </tbody>
        </table>
       {Data?.status?.toLowerCase() === 'pending' ? <div className="flex flex-col md:flex-row md:justify-end space-y-4 md:space-y-0 md:space-x-4 mt-10">
          <button onClick={(e)=>handleReview(e,{leaveId:Data?.leaveId,reviewStatus:false})} className="bg-red-500 hover:bg-red-700 text-white text-lg px-4 py-2 rounded-lg shadow-lg">
            Reject
          </button>
          <button onClick={(e)=>handleReview(e,{leaveId:Data?.leaveId,reviewStatus:true})} className="bg-blue-500 hover:bg-blue-700 text-white text-lg px-4 py-2 rounded-lg shadow-lg">
            Approve
          </button>
        </div> : 
        <p
          className={`text-right mt-4 text-lg ${
            Data?.status?.toLowerCase() === 'rejected'
              ? 'text-red-500'
              : Data?.status?.toLowerCase() === 'approved'
              ? 'text-green-500'
              : 'text-gray-500'
          }`}
        >
          You have already {Data?.status} this leave
        </p>}
      </div>
    </div>
  );
};

export default LeaveStatus;
