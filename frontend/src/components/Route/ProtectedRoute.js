import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
function ProtectedRoute({ isAdmin }) {
    const { user , isAuthenticated } = useSelector(state => state.userReducer);

    if ((isAuthenticated === false) || (isAdmin === true && user.role !== 'admin')) {
        return <Navigate to='/login' />;
    }
    return <Outlet />;
}

export default ProtectedRoute;
