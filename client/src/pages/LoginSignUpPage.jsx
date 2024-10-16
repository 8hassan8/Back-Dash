import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginSignUpPage = ({ onLoginSuccess }) => {
  const { setAuth,setupdateData,updateData } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePicture: null,
  });

  const [profilePreview, setProfilePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  const handleSignUpChange = (event) => {
    setSignUpData({ ...signUpData, [event.target.name]: event.target.value });
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSignUpData({ ...signUpData, profilePicture: file });
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handleSuccessfulLogin = (token, userData) => {
    setAuth(token, userData);
    if (onLoginSuccess) {
      onLoginSuccess(userData);
    }
    navigate('/');
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', loginData);
      handleSuccessfulLogin(response.data.token, response.data.user);
      setupdateData(!updateData);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('Invalid email or password. Please try again.');
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitSignUp = async (event) => {
    event.preventDefault();
    setIsLoading(true);
  
    if (signUpData.password !== signUpData.confirmPassword) {
      toast.error('Passwords do not match!');
      setIsLoading(false);
      return;
    }
  
    const formData = new FormData();
    formData.append('name', signUpData.name);
    formData.append('email', signUpData.email);
    formData.append('password', signUpData.password);
    if (signUpData.profilePicture) {
      formData.append('image', signUpData.profilePicture);
    }
  
    try {
        const response = await axios.post('http://localhost:5000/api/users/signUp', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      
        console.log('Response:', response);  // Log the response to check if it's successful
      
        if (response.status === 200 || response.status === 201) {
          toast.success('Sign-up successful. Please log in.');
          navigate('/');
        }
      
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast.error('Invalid sign-up data.');
        } else {
          toast.error('An error occurred. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
  };

  return (
    <div className="">
      <ToastContainer />
      <div className="flex flex-col md:flex-row justify-center h-full">
        {/* Login Form */}
        <form onSubmit={handleSubmitLogin} className="border-2 border-red-700 bg-black p-2 rounded-lg w-full md:w-1/2 flex-grow">
          <h2 className="text-white font-bold text-2xl mb-4">Login</h2>
          <input
            onChange={handleLoginChange}
            name="email"
            type="email"
            className="w-full mb-4 p-2 rounded"
            placeholder="Email"
            required
          />
          <input
            onChange={handleLoginChange}
            name="password"
            type="password"
            className="w-full mb-4 p-2 rounded"
            placeholder="Password"
            required
          />
          <button type="submit" className="w-full bg-red-700 text-white p-2 rounded">
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Sign-Up Form */}
        <form onSubmit={handleSubmitSignUp} className="border-2 border-red-700 bg-black p-4 rounded-lg w-full md:w-1/2 flex-grow">
          <h2 className="text-white font-bold text-2xl mb-4">Sign Up</h2>
          <div className="flex justify-center mb-4">
            <label htmlFor="profilePicture">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-red-700 cursor-pointer">
                {profilePreview ? (
                  <img src={profilePreview} alt="Profile Preview" className="object-cover w-full h-full" />
                ) : (
                  <div className="bg-gray-300 flex items-center justify-center w-full h-full text-white">
                    <span>No Image</span>
                  </div>
                )}
              </div>
            </label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="hidden"
            />
          </div>
          <input
            onChange={handleSignUpChange}
            type="text"
            name="name"
            className="w-full mb-4 p-2 rounded"
            placeholder="Name"
            required
          />
          <input
            onChange={handleSignUpChange}
            type="email"
            name="email"
            className="w-full mb-4 p-2 rounded"
            placeholder="Email"
            required
          />
          <input
            onChange={handleSignUpChange}
            type="password"
            name="password"
            className="w-full mb-4 p-2 rounded"
            placeholder="Password"
            required
          />
          <input
            onChange={handleSignUpChange}
            type="password"
            name="confirmPassword"
            className="w-full mb-4 p-2 rounded"
            placeholder="Confirm Password"
            required
          />
          <button type="submit" className="w-full bg-red-700 text-white p-2 rounded">
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginSignUpPage;
