import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext'; // ✅ named import
import { Navigate } from 'react-router'; // should be 'react-router-dom', not 'react-router'

const PrivetRouter = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (user && user?.email) {
        return children;
    }
    return <Navigate to='/login' />;
};

export default PrivetRouter;
