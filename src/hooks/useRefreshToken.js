import customAxios from '../customAxios/authAxios';

import { useDispatch } from 'react-redux';
import { updateUser,removeUser } from '../redux/slices/LoginSlice';

const useRefreshToken = () => {

    const dispatch = useDispatch();
    
    const refresh = async() => {
            
        try {
            
            const response = await customAxios.get('/api/v1/refresh-token',{
                withCredentials:true,
            });

            dispatch(updateUser(response.data));

            return response.data.accessToken;

        } catch (error) {
            if(error.response.status === 401){
                dispatch(removeUser());
            }

        }

    }

    return refresh;

}

export default useRefreshToken;