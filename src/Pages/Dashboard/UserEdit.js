import React, { useState } from 'react';
import '../../css/DashboardCss/UserEdit.css';
function Dialog({ onClose, children }) {
    return (
      <div className="dialog-overlay">
        <div className="dialog">
          {children}
          <button className="close-button" onClick={onClose}>X</button>
        </div>
      </div>
    );
  }
function UserEdit() {
    const users = [
        {
            firstname: "Rahul",
            lastname: "Sharma",
            email: "rahul@gmail.com",
            fathername: "Mahesh",
            address: "Mumbai",
            mothername: "Surekha",
            phone: "547895145",
            designation: "React JS",
            levelOfDesignation: "L0",
            employeeId: "REACT-DEV-L0-pavankumarmadli48@gmail.com",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
            img: 'https://rukminim2.flixcart.com/image/128/128/xif0q/cap/2/o/t/free-women-neck-warmer-2-city-brand-original-imagj6cbnhgzggmc.jpeg?q=70&crop=false'
        },
        {
            firstname: "Aisha",
            lastname: "Khan",
            email: "aisha.khan@gmail.com",
            fathername: "Imran",
            address: "Delhi",
            mothername: "Zoya",
            phone: "9834567890",
            designation: "Backend Developer",
            levelOfDesignation: "L1",
            employeeId: "BACKEND-DEV-L1-aishakhan@example.com",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
            img: 'https://rukminim2.flixcart.com/image/128/128/xif0q/shirt/l/2/i/s-kttwomensshirt23-kotty-original-imah29v5hgpg5dm9.jpeg?q=70&crop=false'
        },
        {
            firstname: "Vikram",
            lastname: "Singh",
            email: "vikram.singh@gmail.com",
            fathername: "Rajesh",
            address: "Bangalore",
            mothername: "Anita",
            phone: "9876543210",
            designation: "Full Stack Developer",
            levelOfDesignation: "L2",
            employeeId: "FULLSTACK-DEV-L2-vikram@example.com",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
            img: 'https://rukminim2.flixcart.com/image/128/128/l3t2fm80/shirt/l/0/4/xxl-r-petal-pink-stoneberg-original-imageum8qmynhwnz.jpeg?q=70&crop=false'
        },
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [employee, setEmployee] = useState(users[0]);

    const handleSearch = (query) => {
        setSearchQuery(query.toLowerCase());
    };

    const filteredUsers = users.filter(user =>
        user.firstname.toLowerCase().includes(searchQuery) ||
        user.lastname.toLowerCase().includes(searchQuery) ||
        user.designation.toLowerCase().includes(searchQuery)
    );
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = () => {
      setIsDialogOpen(true);
    };
  
    const closeDialog = () => {
      setIsDialogOpen(false);
    };
    return (
        <div className='dashboard-cont'>
                       <div className='dashboard-left'>
                <div className='dashboard-left-container'>
                    <h1 className='dashboard-title'>User Profile Edit</h1>
                    <button className='dashboard-search-dilog' onClick={openDialog} style={{backgroundColor : 'gray', borderRadius : '5px', color : 'white', padding : '5px', cursor : 'pointer', margin : '10px 10px 10px 10px'}}>Search</button>
                 <div className='dashboard-dialog' style = {{width : "70%"}}>
                    <div style = {{visibility : isDialogOpen ? 'visible' : 'hidden', backgroundColor : 'white', width : "100%"}} className='dashboard-dilog'>
                    <input
                        type='text'
                        placeholder='Search'
                        onChange={(e) => handleSearch(e.target.value)}
                        className='dashboard-search-input'
                    />
                   
                    {
                        filteredUsers.map((employee) => (
                            <div className='dashboard-search-result' style = {{display : "flex", marginTop : "7px"}}key={employee.id} onClick={() => {setEmployee(employee); closeDialog();}} >
                                <img src={employee.img} className='dashboard-profile-img' alt="Profile" />
                                <p style = {{   }}>{employee.name}</p>
                            </div>
                        ))
                    }
                    <p onClick={closeDialog}> X </p>
                    </div>
                 </div>
                    <img src={employee.img} className='dashboard-profile-img' alt="Profile" />
                    <div className='dashboard-user-details'>
                        <div className='dashboard-left-side'>
                            <div className='dashboard-field'>
                                <label>First Name</label>
                                <input type='text' value={employee.firstname} onChange={(e) => setEmployee({ ...employee, firstname: e.target.value })} />
                            </div>
                            <div className='dashboard-field'>
                                <label>Father Name</label>
                                <input type='text' value={employee.fathername}   onChange={(e) => setEmployee({ ...employee, fathername: e.target.value })}/>
                            </div>
                            <div className='dashboard-field'>
                                <label>Address</label>
                                <input type='text' value={employee.address}  onChange={(e) => setEmployee({ ...employee, address: e.target.value })} />
                            </div>
                            <div className='dashboard-field'>
                                <label>Email</label>
                                <input type='text' value={employee.email}  onChange={(e) => setEmployee({ ...employee, email: e.target.value })} />
                            </div>
                            <div className='dashboard-field'>
                                <label>Designation</label>
                                <input type='text' value={employee.designation}   onChange={(e) => setEmployee({ ...employee, designation: e.target.value })}/>
                            </div>
                            <div className='dashboard-field'>
                                <label>Designation Level</label>
                                <input type='text' value={employee.levelOfDesignation}  onChange={(e) => setEmployee({ ...employee, levelOfDesignation: e.target.value })} />
                            </div>
                        </div>
                        <div className='dashboard-right-side'>
                            <div className='dashboard-field'>
                                <label>Last Name</label>
                                <input type='text' value={employee.lastname}  onChange={(e) => setEmployee({ ...employee, lastname: e.target.value })} />
                            </div>
                            <div className='dashboard-field'>
                                <label>Mother Name</label>
                                <input type='text' value={employee.mothername}  onChange={(e) => setEmployee({ ...employee, mothername: e.target.value })} />
                            </div>
                            <div className='dashboard-field'>
                                <label>Phone no</label>
                                <input type='text' value={employee.phone}  onChange={(e) => setEmployee({ ...employee, phone: e.target.value })} />
                            </div>
                            <div className='dashboard-field'>
                                <label>Description</label>
                                <textarea value={employee.description}  onChange={(e) => setEmployee({ ...employee, description: e.target.value })} />
                            </div>
                            <div className='dashboard-field'>
                            <button class="dashboard-button dashboard-type1"><span class="dashboard-btn-txt">Save Changes </span>
</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='dashboard-right'>
            <input
                        type='text'
                        placeholder='Search'
                        onChange={(e) => handleSearch(e.target.value)}
                        className='dashboard-search-input'
                    />
                <div className='dashboard-search-container'>
                   
                    <div className='dashboard-user-cards' style={{visibility : searchQuery.length > 0 ? 'visible' : 'hidden'}}>
                        {filteredUsers.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => {setEmployee(item)}}
                                className='dashboard-user-card'
                            >
                                <img src={item.img} alt={`${item.firstname}'s profile`} className='dashboard-user-img' />
                                <div className='dashboard-user-info'>
                                    <h2>{item.firstname}</h2>
                                    <p>{item.designation}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default UserEdit;
