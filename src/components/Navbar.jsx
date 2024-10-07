import React, { useState, useEffect,useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

function Navbar({ onLoginSuccess }) {
  const { updateData } = useContext(AuthContext);
  const getUserInfo = () => {
 
    const user = sessionStorage.getItem("user");
    if (user) {
      try {
        return JSON.parse(user);
      } catch (error) {
        console.error("Error parsing user from session storage:", error);
        return null;
      }
    }
    return null;
  };

  const [user, setUser] = useState(getUserInfo());
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Update user state if it exists
    }
  }, [updateData]);

  // This will be called from the login component
  const handleLoginSuccess = (newUser) => {
    setUser(newUser);
    if (onLoginSuccess) {
      onLoginSuccess(newUser); // Notify parent component
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <div className="fixed top-0 w-full z-10 bg-black">
      <nav className="navbar navbar-expand-lg h-20 navbar-dark bg-black">
        <div className="mx-auto flex items-center justify-between h-full">
          <div onClick={() => navigate('/')} className="text-red-700 font-bold hover:bg-white hover:pointer text-4xl px-3 py-2 rounded-md">
            Back Dash
          </div>

          <div className="flex space-x-4">
            <NavLink to="/" className="text-red-700 font-bold hover:bg-white text-xl px-3 py-2 rounded-md">Home</NavLink>
            <NavLink to="/eventsPage" className="text-red-700 font-bold hover:bg-white text-xl px-3 py-2 rounded-md">Events</NavLink>
            <NavLink to="/gamesPage" className="text-red-700 font-bold hover:bg-white px-3 text-xl py-2 rounded-md">Games</NavLink>
            <NavLink to="/leaderboards" className="text-red-700 font-bold hover:bg-white text-xl px-3 py-2 rounded-md">Leaderboards</NavLink>
            <NavLink to="/bookingsPage" className="text-red-700 font-bold hover:bg-white px-3 text-xl py-2 rounded-md">Bookings</NavLink>
            <NavLink to="/contactPage" className="text-red-700 font-bold hover:bg-white px-3 text-xl py-2 rounded-md">Contact</NavLink>
          </div>

          <div className="flex items-center space-x-4">
  {user ? (
    <>
      <div className="flex flex-col items-center">
        <img 
          src={user.image ? `data:image/jpeg;base64,${user.image}` : '/defaultProfilePicture.png'} 
          alt={user.name} 
          className="w-10 h-10 rounded-full"
        />
        <span className="text-red-700 font-bold hover:bg-white text-sm rounded-md">{user.name}</span>
      </div>
      <button 
        onClick={handleLogout} 
        className="text-red-700 font-bold hover:bg-white px-3 py-2 rounded-md">
        Logout
      </button>
    </>
  ) : (
    <div 
      onClick={() => navigate('/loginSignUpPage')} 
      className="text-red-700 font-bold hover:bg-white text-2xl px-3 py-2 rounded-md">
      Login / Sign Up
    </div>
  )}
</div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
