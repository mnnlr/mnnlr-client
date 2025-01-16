import { useNavigate } from "react-router-dom";

const BreadCrumb = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center space-x-2 text-gray-500">
      <span className="material-icons cursor-pointer" onClick={()=>navigate('/')}>home</span>
      <span>/</span>
      <span className="cursor-pointer" onClick={()=>navigate('/dashboard')}>Dashboard</span>
    </div>
  );
};

export default BreadCrumb;
