import { useEffect,useState } from "react";
import {useLocation,useNavigate,Navigate,Outlet} from "react-router-dom"
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/slices/LoginSlice";

const ProtectedRoute = ({allowedRole}) => {
  const dispatch = useDispatch();
  const privateAxios = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

    const { user } = useSelector((state) => state.login);

    useEffect(() => {
      let isMounted = true;
  
      const authSetting = async () => {
        try {
  
          const response = await privateAxios.get('/authenticate', {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${user?.accessToken}`,
            },
          });
  
          if (isMounted) {

            dispatch(updateUser(response.data.data));
            setLoading(false);

          }

        } catch (error) {
          navigate('/connect-with-us', { state: { from: location }, replace: true });

        }

      };
  
      isMounted && authSetting();
  
      return () => {
        isMounted = false;
      };
    }, [location, navigate]);
  
    if (loading) {
      return null;
    }

    return allowedRole?.includes(user?.role) ? 
        <Outlet /> 
        : user?._id ? <h1>Not Authorised</h1>
        :<Navigate to="/connect-with-us" state={{from:location}} replace/>
}

export default ProtectedRoute;
