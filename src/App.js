import React from'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import LoginSignUpPage from './pages/LoginSignUpPage';
import AuthProvider from './context/authContext';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoutes from './components/ProtectedRoutes';
import AddGame from './components/AddGame';
import GamesPage from './pages/GamesPage';
import { useState } from'react';
import EventsPage from './pages/EventsPage';
import BookingsPage from './pages/BookingsPage';
import ContactPage from './pages/ContactPage';

function App() {

  const [user, setUser] = useState(null);

  // Handle login success in the app's main component to share user data between Navbar and Login page
  const handleLoginSuccess = (newUser) => {
    setUser(newUser);
  };
  return (
    <div className="App">
      
      <Router>
      <div className="flex flex-col min-h-screen">
        
        <main className="flex-grow pt-20">
          <AuthProvider>
          <Navbar onLoginSuccess={handleLoginSuccess} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/loginSignUpPage" element={<LoginSignUpPage onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/gamesPage" element={<GamesPage />} />
            <Route path="/eventsPage" element={<EventsPage />} />
            <Route path="/bookingsPage" element={<BookingsPage />} />
            <Route path="/contactPage" element={<ContactPage />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" 
              element={
            <ProtectedRoutes isAdmin={true}>
                <AdminDashboard />
            </ProtectedRoutes>
        }  />
          </Routes>
          </AuthProvider>
        </main>
        <Footer />
      </div>
     </Router>
    </div>
  );
}

export default App;
