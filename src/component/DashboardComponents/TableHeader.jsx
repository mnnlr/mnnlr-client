const TableHeader = ({Data}) => {
    return (
        <thead>
            <tr>
                {
                    Data.map((item, index) => (
                        <th key={index}>{item}</th>
                    ))
                }
            </tr>
        </thead>
    );
}

export default TableHeader;