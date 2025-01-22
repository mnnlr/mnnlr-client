import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBestEmployee } from '../../redux/actions/BestEmployeeAction';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { FaStar } from 'react-icons/fa';
import celebrate from '../../assets/celebrate.png';

const BestEmployee = () => {
    const dispatch = useDispatch();
    const privateAxios = useAxiosPrivate();
    const { user } = useSelector((state) => state.login);
    const [selectedPeriod, setSelectedPeriod] = useState('week');

    const { bestEmployee, isLoading, error } = useSelector((state) => state.bestEmployee);

    useEffect(() => {
        dispatch(getBestEmployee({
            period: selectedPeriod,
            accessToken: user.accessToken,
            privateAxios: privateAxios
        }));
    }, [selectedPeriod, dispatch, user.accessToken, privateAxios]);

    const handleViewChange = (event) => {
        setSelectedPeriod(event.target.value);
    };

    const getBadgeClass = (index) => {
        if (index === 0) return 'bg-gradient-to-r from-red-500 to-orange-500'; // Gradient for 1st place
        if (index === 1) return 'bg-gradient-to-r from-gray-300 to-gray-500'; // Gradient for 2nd place
        if (index === 2) return 'bg-gradient-to-r from-yellow-300 to-yellow-500'; // Gradient for 3rd place
    };

    return (
        <div className="p-6 rounded-lg mt-5" style={{ backgroundImage: `url(${celebrate})`, backgroundSize: 'cover' }}>
            <div className='flex items-center justify-center mb-4'>
                <div className="flex text-3xl text-[#bf9a44] bg-[#fbe195] font-bold p-2 rounded-lg">
                    <FaStar className='items-center mr-4 text-[#e36a44]' /> {`Employees of the ${selectedPeriod}`} <FaStar className='items-center ml-4 text-[#e36a44]' />
                </div>
            </div>

            <div className="flex justify-end items-center p-2 mb-4 rounded-md">
                <select
                    className="border rounded p-2 text-gray-700"
                    value={selectedPeriod}
                    onChange={handleViewChange}
                >
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                </select>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(3)].map((_, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl shadow-2xl p-6 text-center transform transition-all hover:scale-105 hover:shadow-xl"
                        >
                            <div className="relative animate-pulse">
                                <div className="w-40 h-40 bg-gray-300 rounded-full mx-auto mb-4"></div>
                            </div>
                            <div className="mt-4 text-2xl font-semibold text-gray-800 bg-gray-300 h-6 w-3/4 mx-auto mb-2"></div>
                            <div className="text-gray-600 mt-2 bg-gray-300 h-4 w-1/2 mx-auto"></div>
                            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white font-bold text-xl py-1 px-3 rounded-full bg-gray-300 w-16 mx-auto"></div>
                        </div>
                    ))}
                </div>
            ) : error ? (
                <div>Error fetching data: {error}</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bestEmployee?.employees?.map((employee, index) => (
                        <div key={employee._id}
                            className="rounded-3xl shadow-2xl p-6 text-center transform transition-all hover:scale-105 hover:shadow-xl" 
                            style={{ backgroundImage: `url(${celebrate})`, backgroundSize: 'cover' }}>
                            <div className="relative">
                                <img
                                    alt={`${employee.firstName} ${employee.lastName}`}
                                    className="w-40 h-40 rounded-full object-cover border-4 border-yellow-400 mx-auto mb-4"
                                    src={employee.avatar.url}
                                />
                            </div>
                            <div className="mt-4 text-2xl font-bold text-gray-800">
                                {`${employee.firstName} ${employee.lastName}`}
                            </div>
                            <div className="text-gray-600 mt-2">{employee.designation}</div>
                            <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 text-white font-bold text-xl py-1 px-3 rounded-full ${getBadgeClass(index)}`}>
                                {index === 0 ? '1st' : index === 1 ? '2nd' : '3rd'}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BestEmployee;
