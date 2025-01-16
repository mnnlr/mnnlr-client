import { useState } from "react"
import customAxios from '../customAxios/authAxios'
import { useParams } from "react-router-dom";

const PasswordRecover = () => {
    const {id} = useParams()
    const [value,setValue] = useState({password:'',confirmPassword:''})
    const [data,setData] = useState({isLoading:false})

    const sendLink = async(e) => {
        try {
            e.preventDefault();
            setData({isLoading:true})
            if(value?.password !== value?.confirmPassword) return alert( 'Password and confirm password must be same')

            const {data,status} = await customAxios.post(`api/v1/recovery/reset-password/${id}`,{password:value?.password});
            
            if(status === 200&&data?.success === true){
                setData((prev)=>({isLoading:false,...data}))
            }
        
        } catch (error) {
            setData({isLoading:false})
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-11/12 sm:w-3/5 md:w-2/5 lg:w-1/3 xl:w-1/4 p-6 bg-white shadow-md rounded-lg">
                {data?.success !== true?<form onSubmit={sendLink}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Enter New Password
                        </label>
                        <input
                        type="password"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="example@gmail.com"
                        id="password"
                        value={value?.password}
                        onChange={(e) => setValue((prev)=>({...prev,password:e.target.value}))}
                        required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirm password" className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                        </label>
                        <input
                        type="password"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="example@gmail.com"
                        id="confirm password"
                        value={value?.confirmPassword}
                        onChange={(e) => setValue((prev)=>({...prev,confirmPassword:e.target.value}))}
                        required
                        />
                    </div>
                    {!data?.isLoading?<button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        reset password
                    </button>:
                    <div
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                     please wait...
                </div>}
                </form>:
                <p style={{color:'green'}}>
                    {data?.message}
                </p>}
            </div>
        </div>
    )
}

export default PasswordRecover