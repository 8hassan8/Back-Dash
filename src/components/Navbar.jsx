import React, { useState, useEffect, useContext } from 'react';
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
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu toggle

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Update user state if it exists
    }
  }, [updateData]);

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
      <nav className="h-20 bg-black flex items-center justify-between px-4 md:px-6 lg:px-8">
        <div 
          onClick={() => navigate('/')} 
          className="text-red-700 font-bold hover:bg-white text-2xl sm:text-3xl md:text-4xl px-3 py-2 rounded-md cursor-pointer">
          Back Dash
        </div>

        {/* Hamburger button for mobile and tablet */}
        <div className="lg:hidden flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-red-700 text-3xl focus:outline-none">
            &#9776; {/* This is the hamburger icon (three lines) */}
          </button>
        </div>

        {/* Links for larger screens (hidden on mobile/tablets) */}
        <div className="hidden lg:flex space-x-4 xl:space-x-6">
          <NavLink to="/" className="text-red-700 font-bold hover:bg-white text-xl px-3 py-2 rounded-md">Home</NavLink>
          <NavLink to="/eventsPage" className="text-red-700 font-bold hover:bg-white text-xl px-3 py-2 rounded-md">Events</NavLink>
          <NavLink to="/gamesPage" className="text-red-700 font-bold hover:bg-white text-xl px-3 py-2 rounded-md">Games</NavLink>
          <NavLink to="/leaderboards" className="text-red-700 font-bold hover:bg-white text-xl px-3 py-2 rounded-md">Leaderboards</NavLink>
          <NavLink to="/bookingsPage" className="text-red-700 font-bold hover:bg-white text-xl px-3 py-2 rounded-md">Bookings</NavLink>
          <NavLink to="/contactPage" className="text-red-700 font-bold hover:bg-white text-xl px-3 py-2 rounded-md">Contact</NavLink>
        </div>

        {/* User Information & Login/Logout */}
        <div className="hidden lg:flex items-center space-x-4">
          {user ? (
            <>
              <div className="flex flex-col items-center">
                <img 
                  src={user.image ? `data:image/jpeg;base64,${user.image}` : ''} 
                  alt={user.name} 
                  className="w-10 h-10 rounded-full"
                  onClick={() => navigate('/userPage')}
                />
                <span className="text-red-700 font-bold text-sm">{user.name}</span>
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

        {/* Mobile Menu Dropdown */}
          <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} absolute top-20 left-0 w-full bg-black`}>
            <div className="flex flex-col space-y-2">
              <NavLink 
                to="/" 
                className="text-red-700 font-bold hover:bg-white text-lg px-3 py-2 rounded-md"
                onClick={() => setIsOpen(false)} // Close menu on navigation
              >
                Home
              </NavLink>
              <NavLink 
                to="/eventsPage" 
                className="text-red-700 font-bold hover:bg-white text-lg px-3 py-2 rounded-md"
                onClick={() => setIsOpen(false)} // Close menu on navigation
              >
                Events
              </NavLink>
              <NavLink 
                to="/gamesPage" 
                className="text-red-700 font-bold hover:bg-white text-lg px-3 py-2 rounded-md"
                onClick={() => setIsOpen(false)} // Close menu on navigation
              >
                Games
              </NavLink>
              <NavLink 
                to="/leaderboards" 
                className="text-red-700 font-bold hover:bg-white text-lg px-3 py-2 rounded-md"
                onClick={() => setIsOpen(false)} // Close menu on navigation
              >
                Leaderboards
              </NavLink>
              <NavLink 
                to="/bookingsPage" 
                className="text-red-700 font-bold hover:bg-white text-lg px-3 py-2 rounded-md"
                onClick={() => setIsOpen(false)} // Close menu on navigation
              >
                Bookings
              </NavLink>
              <NavLink 
                to="/contactPage" 
                className="text-red-700 font-bold hover:bg-white text-lg px-3 py-2 rounded-md"
                onClick={() => setIsOpen(false)} // Close menu on navigation
              >
                Contact
              </NavLink>

              {user ? (
                <>
                  <div className="flex flex-col items-center">
                    <img 
                      src={user.image ? `data:image/jpeg;base64,${user.image}` : ''} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full"
                      onClick={() => { 
                        navigate('/userPage');
                        setIsOpen(false); // Close menu on navigation
                      }}
                    />
                    <span className="text-red-700 font-bold text-sm">{user.name}</span>
                  </div>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false); // Close menu after logout
                    }} 
                    className="text-red-700 font-bold hover:bg-white px-3 py-2 rounded-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div 
                  onClick={() => {
                    navigate('/loginSignUpPage');
                    setIsOpen(false); // Close menu on navigation
                  }} 
                  className="text-red-700 font-bold hover:bg-white text-lg px-3 py-2 rounded-md"
                >
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
