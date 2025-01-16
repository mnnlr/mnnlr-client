import {useState} from 'react';

import defaultAxios from '../customAxios/authAxios';

const SignUp = () => {

  const [signupData,setData] = useState({email:'',password:'',confirm_password:''});

  const handleChange = (e) => {
    e.preventDefault();
    const {name,value} = e.target;
    setData((prev)=>({...prev,[name]:value}));
  }

  const handleSubmit = async(e) => {
    try {
      e.preventDefault();

      if(!signupData.email || !signupData.password || !signupData.confirm_password) return alert('Please fill all the fields');
      if(signupData.password !== signupData.confirm_password) return alert('Password and confirm password must be same');
    
      const {data,status} = await defaultAxios.post('/api/v1/register',{email:signupData?.email,password:signupData?.password});
      
      if(status === 200) {
        alert(data.message);
        setData({email:'',password:'',confirm_password:''});
      }

    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Create Account</h2>
      <p className="text-gray-600 mb-4 text-center sm:text-left">Use your email for registration</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input type="email" placeholder="Email" name='email' onChange={handleChange} value={signupData?.email} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div className="mb-4">
          <input type="password" placeholder="Password" name='password' onChange={handleChange} value={signupData?.password} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div className="mb-4">
          <input type="password" placeholder="confirm password" name='confirm_password' onChange={handleChange} value={signupData?.confirm_password}className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div className="flex justify-center sm:justify-end">
          <button type="submit" className="w-full sm:w-auto bg-gradient-to-r from-blue-700 to-blue-400 text-white py-2 px-6 rounded-lg">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
