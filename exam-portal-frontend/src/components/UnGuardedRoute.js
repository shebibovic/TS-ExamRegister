import React from 'react';
import { Route, Navigate } from "react-router-dom";

const UnguardedRoute = ({ children }) => {
    
    let user = JSON.parse(localStorage.getItem('user'));
    if(user?.role?.roleName === "ADMIN"){
        return <Navigate to="/adminProfile" replace />;
    }
    if(user?.role?.roleName === "PROFESSOR"){
        return <Navigate to="/professorProfile" replace />;
    }
    if(user?.role?.roleName === "STUDENT"){
        return <Navigate to="/profile" replace />;
    }
    return children;
}

export default UnguardedRoute;