import { useEffect, useState } from "react";
import TableHeader from "./TableHeader";
import "../../css/DashboardCss/Table.css";
import Search from "./Search";

const Table = ({
    TableTitle,
    TableHeaderData,
    employesToshow,
    setemployesToshow,
    children,
}) => {
    // const [searchquery, setSearchquery] = useState("");
    // useEffect(() => {
    //     const filteredUsers =
    //         employesToshow?.filter((user) =>
    //             [
    //                 user?.firstName
    //                     ? user?.firstName // search by name
    //                     : user?.personalDetails?.name,
    //
    //                 user?.employeeId, // by employee id
    //
    //                 user?.email ? user?.email : user?.personalDetails?.email, // by email
    //             ].some((field) =>
    //                 field?.toString().toLowerCase().includes(searchquery.toLowerCase()),
    //             ),
    //         ) || [];
    //
    //     setemployesToshow(filteredUsers);
    // }, [employesToshow, searchquery]);
    // console.log(employesToshow)

    const [searchquery, setSearchquery] = useState("");
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    useEffect(() => {
        if (!employesToshow) return;

        const filteredUsers = employesToshow.filter((user) =>
            [
                user?.firstName || user?.personalDetails?.name, // by name
                user?.employeeId, // by employee id
                user?.email || user?.personalDetails?.email, // by email
            ].some((field) =>
                field?.toString().toLowerCase().includes(searchquery.toLowerCase()),
            ),
        );

        setFilteredEmployees(filteredUsers);
    }, [searchquery, employesToshow]);

    if (filteredEmployees) setemployesToshow(filteredEmployees);

    return (
        <div className="dashboard-table-container">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>{TableTitle}</h2>
                <Search
                    placeholder="search by Name & Email"
                    Value={searchquery && searchquery}
                    setValue={setSearchquery && setSearchquery}
                    iconColor="green"
                    Style={{
                        display: "flex",
                        alignItem: "center",
                        justifyContent: "center",
                        borderRadius: "7px",
                        color: "black",
                        height: "40px",
                        width: "230px",
                        outline: "none",
                        border: "1px solid green",
                    }}
                />
            </div>
            <table className="dashboard-table">
                <TableHeader Data={TableHeaderData} />
                {children}
            </table>
        </div>
    );
};

export default Table;
