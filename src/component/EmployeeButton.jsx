import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch,useSelector } from "react-redux";
import { getEmployees } from "../redux/actions/EmployeeAction";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const EmployeeButton = ({user}) => {

    const dispatch = useDispatch();
    const privateAxios = useAxiosPrivate();

    const {totalEmployees} = useSelector(state => state.employees);

    useEffect(() => {
        let isMounted = true;
        if(isMounted){
            dispatch(getEmployees({accessToken:user.accessToken,privateAxios}));
        }
        return () => {
            isMounted = false;
        }
    },[totalEmployees,user.accessTokens]);


    return (
        <Link to="/employees">
            Employees
        </Link>
    );
}

export default EmployeeButton;