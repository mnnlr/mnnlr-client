import TableHeader from "./TableHeader";

import '../../css/DashboardCss/Table.css';
import Search from "./Search";

const Table = ({TableTitle,TableHeaderData,children}) => {
    return (
        <div className="dashboard-table-container">
            <div style={{display:'flex',justifyContent:'space-between'}}>
                <h2>{TableTitle}</h2>
                <Search placeholder='search by name' /*Value={searchInput} setValue={setSearchInput}*/ iconColor="green" Style={{display:'flex',alignItem:'center',justifyContent:'center', borderRadius:'7px',color:'black',height:'40px',width:'230px',outline: 'none',border:'1px solid green'}} />
            </div>
            <table className="dashboard-table">
                <TableHeader Data={TableHeaderData} />
                {children}
            </table>
        </div>
    )
}

export default Table;