import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PrivateRoute = ({ children }) => {
    const { isLoggedIn, loading } = useAuth();

    if (loading) {
        return <div>Verificando autenticação...</div>
    }

    if (!isLoggedIn) {
        return <Navigate to="/" replace />
    }

    return children;
};

export default PrivateRoute;