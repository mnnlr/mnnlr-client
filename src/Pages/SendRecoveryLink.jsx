import { useState } from "react"
import customAxios from '../customAxios/authAxios'

const SendRecoveryLink = () => {
    const [email,setEmail] = useState('');
    const [data,setData] = useState({isLoading:false})
    const [error,setError] = useState('');

    const sendLink = async(e) => {
        try {
            e.preventDefault();
            setData({isLoading:true})
            console.log(email)
            const {data,status} = await customAxios.post('api/v1/recovery/send-link',{email});
            if(status === 200&&data?.success === true){
                setData((prev)=>({isLoading:false,...data}))
            }
        } catch (error) {
            setError(error.response.data.message)
            setData({isLoading:false})
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-11/12 sm:w-3/5 md:w-2/5 lg:w-1/3 xl:w-1/4 p-6 bg-white shadow-md rounded-lg">
                {data?.success !== true?<form onSubmit={sendLink}>
                    <div className="mb-4">
                        {error&&<p style={{display:'flex',justifyContent:'center',color:'red'}}>{error}</p>}
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                            Enter your E-mail
                        </label>
                        <input
                        type="email"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="example@gmail.com"
                        id="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </div>
                    {!data?.isLoading?<button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Get Recovery Link
                    </button>:
                    <div
                        className="flex justify-center w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                     please wait...
                </div>}
                </form>:
                <p style={{color:'green'}}>
                    Recovery link sent successfully to your email. Please check your email and follow the instructions to reset your
                </p>}
            </div>
        </div>
    )
}

export default SendRecoveryLink