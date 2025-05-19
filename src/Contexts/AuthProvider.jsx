import React, { Children } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {

    const userInfo = {
        Name: 'Sifad islam',
        Email: 'Siafyed99"gmail.com'
    }

    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;