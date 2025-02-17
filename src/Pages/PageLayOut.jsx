import { Outlet } from "react-router-dom";
import { useState } from "react";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import { useDispatch, useSelector } from "react-redux";
import { employeeWeeklyandMonthlyAttendance } from "../redux/actions/AttendanceAction";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect } from "react";


const PageLayOut = () => {
    const { user } = useSelector((state) => state.login);
    const privateAxios = useAxiosPrivate();
    const dispatch = useDispatch();
    const { WeeklyandMonthlyAttendance } = useSelector(
        (state) => state.attendances,
    );
    const [timeData, setTimeData] = useState(() => {
        const savedTimeData = sessionStorage.getItem("timeData");
        return savedTimeData ? JSON.parse(savedTimeData) : null;
    });

    useEffect(() => {
        if (user._id) {
            if (user.role === "employee" || user.role === "hr") {
                dispatch(
                    employeeWeeklyandMonthlyAttendance({
                        privateAxios,
                        accessToken: user.accessToken,
                        id: user._id
                    })
                )
            }
        }
    }, [dispatch, privateAxios])

    useEffect(() => {
        if (user._id) {
            if (user.role === "employee" || user.role === "hr") {
                if (!sessionStorage.getItem("timeData") && WeeklyandMonthlyAttendance) {
                    console.log("time get from redux")
                    setTimeData(WeeklyandMonthlyAttendance)
                }
            }
        }
    }, [WeeklyandMonthlyAttendance,user]);


 // Update timeData from Redux state if not already in sessionStorage
 useEffect(() => {
    if (user?._id && (user.role === "employee" || user.role === "hr")) {
        if (!sessionStorage.getItem("timeData") && WeeklyandMonthlyAttendance) {
            setTimeData(WeeklyandMonthlyAttendance);
            // sessionStorage.setItem("timeData", JSON.stringify(WeeklyandMonthlyAttendance));
        }
    }
}, [WeeklyandMonthlyAttendance,user]);

// Live updating of timeData every second
useEffect(() => {
    if (user?._id && (user.role === "employee" || user.role === "hr")) {
        if (!timeData) return;

        const interval = setInterval(() => {
            setTimeData((prevTime) => {
                if (!prevTime) return prevTime;

                const updatedTime = {
                    today: prevTime.today + 1,
                    thisWeek: prevTime.thisWeek + 1,
                    thisMonth: prevTime.thisMonth + 1,
                    totalWorkingHours: prevTime.totalWorkingHours + 1,
                };

                // Store updated time in sessionStorage
                sessionStorage.setItem("timeData", JSON.stringify(updatedTime));

                return updatedTime;
            });
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on unmount
    }
}, [timeData,user]); // Runs only when user or timeData changes

    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
}

export default PageLayOut;