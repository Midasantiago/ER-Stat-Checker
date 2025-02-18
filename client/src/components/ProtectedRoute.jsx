import React from 'react';
import Auth from '../utils/auth';

const ProtectedRoute = ({ children }) => {

    // Check if user is logged in
    const isLoggedIn = Auth.loggedIn(); 

    // Redirect to login if not authenticated
    if (!isLoggedIn) {
        window.location.replace('/login');
    }

    // Render the protected page if authenticated
    return children;
}

export default ProtectedRoute;