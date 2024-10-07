// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children, isAdmin }) => {
    const token = localStorage.getItem('token'); // Check if token exists
    const userRole = JSON.parse(localStorage.getItem('userRole')); // Assuming userRole is stored

    if (!token || !isAdmin) {
        return <Navigate to="/admin/login" replace />;
    }

    return children; // Render the protected component
};

export default ProtectedRoutes;
