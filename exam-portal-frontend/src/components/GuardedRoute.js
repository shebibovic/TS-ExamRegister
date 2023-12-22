import React from 'react';
import { Route, Navigate } from "react-router-dom";

const GuardedRoute = ({ role, children, anyRole = false }) => {
    
    
    let user = JSON.parse(localStorage.getItem('user'));
    if(anyRole && user){
        return children;
    }
    if(role != user?.role?.roleName){
        if(user?.role?.roleName === "ADMIN"){
            return <Navigate to="/adminProfile" replace />;
        }
        if(user?.role?.roleName === "PROFESSOR"){
            return <Navigate to="/professorProfile" replace />;
        }
        if(user?.role?.roleName === "STUDENT"){
            return <Navigate to="/profile" replace />;
        }
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default GuardedRoute;