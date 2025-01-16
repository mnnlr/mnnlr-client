// Icons.jsx
import React from 'react';
import { FaCircleUser } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";

const Icons = () => {
  return (
    <div className="flex items-center space-x-4 text-gray-500">
      <span className="material-icons"><FaCircleUser/></span>
      <span className="material-icons"><IoIosSettings/> </span>
      <span className="material-icons"><IoIosNotifications/></span>
    </div>
  );
};

export default Icons;
