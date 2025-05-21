import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext'; // ✅ named import
import { Navigate, useLocation } from 'react-router'; // should be 'react-router-dom', not 'react-router'
import Loader from '../components/Loader/Loader';

const PrivetRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    // set loading when user Null
    if (loading) {
        return <Loader />
    }

    // return children after user login
    if (user && user?.email) {
        return children;
    }

    // navigate user where he/she want to go
    return <Navigate to='/login' state={{ from: location?.pathname }} replace />;
};

export default PrivetRouter;
