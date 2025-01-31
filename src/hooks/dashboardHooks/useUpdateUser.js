// update user hook
import { useState } from "react";
import { axiosPrivate } from '../../customAxios/authAxios';

const useUpdateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const updateUser = async (data) => {
    setIsLoading(true);
    try {
      const response = await axiosPrivate.put('/update-user', data);
      console.log(response)
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  }
  return { updateUser, isLoading, error, user };
}
export default useUpdateUser
