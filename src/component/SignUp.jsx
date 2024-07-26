import React from 'react';

const SignUp = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Create Account</h2>
      <p className="text-gray-600 mb-4 text-center sm:text-left">Use your email for registration</p>
      <form>
        <div className="mb-4">
          <input type="text" placeholder="Name" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div className="mb-4">
          <input type="email" placeholder="Email" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div className="mb-4">
          <input type="password" placeholder="Password" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div className="flex justify-center sm:justify-end">
          <button type="submit" className="w-full sm:w-auto bg-gradient-to-r from-blue-700 to-blue-400 text-white py-2 px-6 rounded-lg">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
