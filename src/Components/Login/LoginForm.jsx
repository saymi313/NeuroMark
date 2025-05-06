import React, { useState } from 'react';
import SocialLoginButtons from './SocialLoginButtons';
import image from '../cover.jpg';
import { Link, useNavigate } from 'react-router-dom';

const countryCodes = [
  { code: '+91', country: 'India' },
  { code: '+1', country: 'USA/Canada' },
  { code: '+44', country: 'UK' },
  { code: '+61', country: 'Australia' },
  { code: '+971', country: 'UAE' },
  { code: '+49', country: 'Germany' },
  { code: '+33', country: 'France' },
  { code: '+81', country: 'Japan' },
  { code: '+86', country: 'China' },
  { code: '+65', country: 'Singapore' },
  { code: '+52', country: 'Mexico' },
  { code: '+55', country: 'Brazil' },
  { code: '+27', country: 'South Africa' },
  { code: '+234', country: 'Nigeria' },
  { code: '+60', country: 'Malaysia' },
  { code: '+66', country: 'Thailand' },
  { code: '+82', country: 'South Korea' },
  { code: '+39', country: 'Italy' },
  { code: '+7', country: 'Russia' },
  { code: '+34', country: 'Spain' },
];

const LoginForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [loginMethod, setLoginMethod] = useState('mobile'); // 'mobile' or 'email'
  const [formData, setFormData] = useState({
    mobile: '',
    email: '',
    password: '',
    keepLoggedIn: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [countryCode, setCountryCode] = useState('+91');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let updatedValue = value;

    // Restrict mobile number to digits
    if (name === 'mobile') {
      updatedValue = value.replace(/\D/g, '');
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : updatedValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (loginMethod === 'mobile') {
      if (!formData.mobile.trim()) {
        tempErrors.mobile = 'Mobile number is required';
        isValid = false;
      } else if (!/^\d{10}$/.test(formData.mobile)) {
        tempErrors.mobile = 'Please enter a valid 10-digit mobile number';
        isValid = false;
      }
    } else {
      if (!formData.email.trim()) {
        tempErrors.email = 'Email is required';
        isValid = false;
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          tempErrors.email = 'Please enter a valid email';
          isValid = false;
        }
      }
    }

    if (!formData.password) {
      tempErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const submitData = {
        ...(loginMethod === 'mobile'
          ? { mobile: formData.mobile, countryCode }
          : { email: formData.email }),
        password: formData.password,
        keepLoggedIn: formData.keepLoggedIn,
      };
      console.log('Login form submitted:', submitData);
    navigate('/Dashboard'); // Redirect to dashboard after successful signup
    navigate('/Dashboard'); // Redirect to dashboard after successful signup
      
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleSelectCountryCode = (code) => {
    setCountryCode(code);
    setShowDropdown(false);
  };

  return (
    <div className="flex min-h-screen bg-neutral-900">
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Sign in</h1>
            <p className="text-gray-300 mt-2">Please login to continue to your account.</p>
          </div>

          <div className="mb-6">
            <p className="text-gray-300 mb-2">Send me on:</p>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setLoginMethod('mobile')}
                className={`flex-1 py-2 px-4 rounded-md text-center ${
                  loginMethod === 'mobile' ? 'bg-purple-500 text-white' : 'bg-neutral-800 text-gray-300'
                }`}
              >
                Mobile Number
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={`flex-1 py-2 px-4 rounded-md text-center ${
                  loginMethod === 'email' ? 'bg-purple-500 text-white' : 'bg-neutral-800 text-gray-300'
                }`}
              >
                Email
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              {loginMethod === 'mobile' ? (
                <>
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pl-24 bg-neutral-900 text-white border ${
                      errors.mobile ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <div className="relative">
                      <button
                        type="button"
                        className="flex items-center justify-between w-16 px-2 text-gray-300 border-r border-gray-300"
                        onClick={() => setShowDropdown(!showDropdown)}
                      >
                        <span>{countryCode}</span>
                        <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {showDropdown && (
                        <div className="absolute z-10 mt-1 w-52 bg-neutral-800 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
                          {countryCodes.map((item) => (
                            <button
                              key={item.code}
                              type="button"
                              className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-neutral-700"
                              onClick={() => handleSelectCountryCode(item.code)}
                            >
                              {item.code} {item.country}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                </>
              ) : (
                <>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-neutral-900 text-white border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-neutral-900 text-white border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                onClick={togglePasswordVisibility}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {showPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M3 3l18 18" />
                  ) : (
                    <>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </>
                  )}
                </svg>
              </button>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="keepLoggedIn"
                name="keepLoggedIn"
                checked={formData.keepLoggedIn}
                onChange={handleChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="keepLoggedIn" className="ml-2 text-sm text-gray-300">
                Keep me logged in
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Sign in
            </button>
          </form>

          <div className="mt-4 text-right">
            <a href="/forgot-password" className="text-sm text-purple-500 hover:text-purple-600">
              Forgot Password?
            </a>
          </div>

          <SocialLoginButtons />

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-300">
              Need an account?
              <Link to="/" className="ml-1 font-medium text-purple-500 hover:text-purple-600">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 bg-gray-100">
        <img
          src={image}
          alt="Visual Banner"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/800x800/e2e8f0/cbd5e1?text=Team+Collaboration';
          }}
        />
      </div>
    </div>
  );
};

export default LoginForm;
