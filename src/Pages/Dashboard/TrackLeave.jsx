import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Table from '../../component/DashboardComponents/Table';
import { useSelector, useDispatch } from 'react-redux';
import { getAllLeave } from '../../redux/actions/LeaveActions';

const TrackLeave = () => {
  const privateAxios = useAxiosPrivate();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.login);
  const { leaves } = useSelector((state) => state.leaves);
  const [filters, setFilters] = useState({
    appliedDate: '',
    type: '',
    status: '',
    duration: '',
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllLeave({ accessToken: user?.accessToken, privateAxios }));
  }, [user?.accessToken]);


  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const filteredLeaves = leaves?.filter((leave) => {
    return (
      (filters.appliedDate ? leave.dateApplied === filters.appliedDate : true) &&
      (filters.type ? leave.leaveType === filters.type : true) &&
      (filters.status ? leave.status.toLowerCase() === filters.status.toLowerCase() : true) &&
      (filters.duration ? leave.duration === parseInt(filters.duration) : true)
    );
  });

  return (
    <div className="mt-8">
      {/* Table Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Track Leave</h2>
        <button
          className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-500 transition"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          Filter
        </button>
      </div>

      {/* Filter Dropdown */}
      {isFilterOpen && (
        <div className="mb-4 p-4 bg-white rounded-lg shadow border">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Applied Date</label>
              <input
                type="date"
                className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                onChange={(e) => handleFilterChange('appliedDate', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <option value="">All</option>
                <option value="Sick">Sick Leave</option>
                <option value="Casual">Casual Leave</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Duration</label>
              <input
                type="number"
                placeholder="Enter days"
                className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                onChange={(e) => handleFilterChange('duration', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <Table
        // TableTitle={'Track Leave'}
        TableHeaderData={["Employee", "Name", "Employee Id", "Applied date", "Type", "Status", "Duration", "ACTION"]}
      >
        <tbody>
          {filteredLeaves
            ?.sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied)) // Sorting by applied date in descending order
            .map((Datum, index) => (
              <tr key={index}>
                <td>
                  <div className="dashboard-table-info cursor-pointer" onClick={() => navigate('/dashboard/user-profile')}>
                    <img
                      src={Datum?.avatar?.url}
                      alt={Datum?.name}
                      className="dashboard-author-avatar"
                    />
                  </div>
                </td>
                <td>
                  <div>
                    <div className="dashboard-table-name">{Datum?.name}</div>
                    <div className="dashboard-table-email">{Datum?.email}</div>
                  </div>
                </td>
                <td>
                  <p className="dashboard-table-email">{Datum?.employeeId}</p>
                </td>
                <td>
                  <div>{Datum?.dateApplied}</div>
                </td>
                <td>
                  <div>{Datum?.leaveType}</div>
                </td>
                <td>
                  <span
                    className={`dashboard-status-badge ${Datum?.status?.toLowerCase()}`}
                  >
                    {Datum?.status}
                  </span>
                </td>
                <td>
                  <div>{Datum?.duration} D</div>
                </td>
                <td>
                  <button className="dashboard-table-edit-button" onClick={() => navigate(`/dashboard/review-leave/${Datum?.leaveId}`)}>
                    {Datum?.status?.toLowerCase() !== 'pending' ? 'View' : 'Review'}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default TrackLeave;