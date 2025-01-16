import React, { useState } from 'react';
import Login from '../component/Login';
import SignUp from '../component/SignUp';

const LogInPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
    <div className="relative w-full max-w-4xl flex flex-col md:flex-row">
    <div className={`w-full md:w-1/2 bg-gradient-to-r from-blue-700 to-blue-400 p-8 text-white flex flex-col justify-center items-center transition-all duration-700 transform ${isSignUp ? 'translate-x-0 md:translate-x-full md:rounded-r-lg' : 'translate-x-0 rounded-t-none md:rounded-l-lg'}`}>
        <h2 className="text-3xl font-bold mb-4">{isSignUp ? 'Hello, Friend!' : 'Welcome Back!'}</h2>
        <p className="mb-4 text-center">
          {isSignUp ? 'Enter your personal details and start journey with us' : 'To keep connected with us please login with your personal info'}
        </p>
        <button onClick={toggleForm} className="bg-transparent text-white border border-white py-2 px-4 rounded-md">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </div>
      <div className={`w-full md:w-1/2 bg-white p-8 shadow-md transition-all duration-700 transform ${isSignUp ? 'translate-x-0 md:-translate-x-full md:rounded-r-none' : 'translate-x-0 md:translate-x-0 md:rounded-r-lg'}`}>
        {isSignUp ? <Login /> : <SignUp />}
      </div>
    </div>
  </div>
  );
};

export default LogInPage;
