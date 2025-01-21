import { useState } from 'react';
import axiosPrivate from '../customAxios/authAxios.js';

export const useGetEmpLeavesForHr = () => {
    const [isLoading, setLoading] = useState(false);
    const [isEmpData, setEmpData] = useState(null);

    const getEmpLeavesForHr = async ({ id }) => {
        try {
            setLoading(true);
            const res = await axiosPrivate.get(`/leave/EmpLeavesForHr/${id}`);
            //console.log('res: ', res);
            setEmpData(res.data.data);
            return res.data.data;
        } catch (err) {
            console.error("Something went wrong: ", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { isLoading, getEmpLeavesForHr, isEmpData };
};

