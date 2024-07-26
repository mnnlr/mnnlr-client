import TableHeader from "./TableHeader";

import '../../css/DashboardCss/Table.css';

const Table = ({TableTitle,TableHeaderData,children}) => {
    return (
        <div className="dashboard-table-container">
            <h2>{TableTitle}</h2>
            <table className="dashboard-table">
                <TableHeader Data={TableHeaderData} />
                {children}
            </table>
        </div>
    )
}

export default Table;