import {useEffect, useState} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {logInUser} from '../redux/actions/loginActions';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  
  const [DatatoValidate, setDatatoValidate] = useState({username:'',password:''});
  const [Error,setError] = useState('');
  
  const {user,isLoading,error} = useSelector(state => state.login);

  useEffect( () =>{
    if(!isLoading&&user?._id){
      return navigate(from, { replace: true });
    }
    if(!isLoading&&error){
      setError(error);
    }
  },[isLoading,error,navigate,user?._id,isLoading])

  const handleChange = (e) => {
    e.preventDefault();
    setError('');
    const {name,value} = e.target;
    setDatatoValidate((prev)=>({...prev, [name]:value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logInUser(DatatoValidate));
  }

  return (
    <>
      <div className="p-4 sm:p-6 md:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Sign In</h2>
        {Error&&<p className="text-red-500 text-center mb-4">{Error}</p>}
        <p className="text-gray-600 mb-4 text-center sm:text-left">Use your account</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input 
              type="text" 
              value={DatatoValidate.username}
              onChange={handleChange}
              name='username'
              placeholder="Email" 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" 
            />
          </div>
          <div className="mb-4">
            <input 
              type="password" 
              value={DatatoValidate.password}
              onChange={handleChange}
              name='password'
              placeholder="Password" 
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" 
            />
          </div>
          <div className="mb-4">
            <p className="px-3 py-2 text-right text-gray-600 mb-4">Forgot your password?</p>
          </div>
          <div className="flex justify-center sm:justify-end">
            <button type="submit" className="w-full sm:w-auto bg-gradient-to-r from-blue-700 to-blue-400 text-white py-2 px-6 rounded-lg">Sign In</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
