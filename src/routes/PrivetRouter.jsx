import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext'; // ✅ named import
import { Navigate } from 'react-router'; // should be 'react-router-dom', not 'react-router'

const PrivetRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    // set loading when user Null
    if (loading) {
        return <h1>LOADING.....</h1>
    }

    // return children after user login
    if (user && user?.email) {
        return children;
    }

    // navigate user in to login page if not registered or logged in
    return <Navigate to='/login' />;
};

export default PrivetRouter;
