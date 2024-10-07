// src/components/AdminLogin.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook to navigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/admins/adminLogin', {
                email,
                password,
            });
            localStorage.setItem('token', response.data.token); // Store the token (or use context)
            navigate('/admin/dashboard'); // Redirect to the admin dashboard
        } catch (error) {
            console.error(error);
            alert('Invalid credentials');
        }
    };

    return (
        <div >
            <div className="flex justify-between">
            <form onSubmit={handleSubmit} className="border-2 border-red-700 bg-black p-4 rounded-lg w-full">
            
            <h2  className="text-red-700 font-bold text-2xl mb-4"> Admin Login</h2>
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mb-4 p-2 rounded"
                        placeholder='Email'
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='mb-4 p-2 rounded'
                        required
                        placeholder='Password'
                    />
                </div>
                <button type="submit" className="bg-red-700 text-white p-2 rounded">Login</button>
            </form>
            </div>
        </div>
    );
};

export default AdminLogin;
