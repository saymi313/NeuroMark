import React from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

const SocialLoginButtons = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <div className="flex items-center w-full my-4">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="px-4 text-sm text-gray-500">Or continue with</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>
      
      <div className="flex justify-center gap-4 w-full mt-2">
        <button className="flex items-center justify-center gap-2 px-6 py-2 border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-50 transition-colors">
          <FaGoogle className="text-red-500" />
          <span>Sign in with Google</span>
        </button>
        
        <button className="flex items-center justify-center gap-2 px-6 py-2 border border-gray-300 rounded-md  bg-gray-100 hover:bg-gray-50 transition-colors">
          <FaFacebook className="text-blue-600" />
          <span>Sign in with Facebook</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLoginButtons;