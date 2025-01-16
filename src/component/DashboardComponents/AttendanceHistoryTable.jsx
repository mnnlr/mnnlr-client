import Table from "./Table";

const AttendenceHistoryTable = ({attendance}) => {
    return (
        <Table 
            TableTitle={'Attendence History'}
            TableHeaderData={["Login Count","LOGIN","LOGOUT","Duration"]}  
        >
            {attendance?.timeTracking?.length > 0 ? <tbody>
                {attendance?.timeTracking?.map((Datum, index) => (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{Datum?.timeIn ? Datum?.timeIn : 'unavailable'}</td>
                    <td>{

                        Datum?.timeOut?Datum?.timeOut:'working now'
                    }
                    </td>
                    <td>
                        {Datum?.duration}
                    </td>
                </tr>
                ))}
            </tbody>:
            <tbody>
                <tr>
                    <td>1</td>
                    <td>unavailable</td>
                    <td>unavailable</td>
                    <td>unavailable</td>
                </tr>
            </tbody>}
        </Table>
    )
}

export default AttendenceHistoryTable;