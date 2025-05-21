import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from "../../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    //? Create User:
    const createUser = (email, password) => {
        // setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    //? Signin User:
    const signInUser = (email, password) => {
        // setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    //? Forgot Password:
    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    //? Google Sign in:
    const provider = new GoogleAuthProvider();
    const googleSignIn = () => {
        return signInWithPopup(auth, provider)
    }

    //? SignOut:
    const userSignout = () => {
        // setLoading(true);
        return signOut(auth);
    };

    const authData = {
        user,
        setUser,
        createUser,
        googleSignIn,
        signInUser,
        forgotPassword,
        userSignout
    }

    //? Observation :
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            // setLoading(false);
            console.log('Observed user: ', currentUser);
        });

        return () => {
            unSubscribe();  // cleanup
        };
    }, []); // empty dependency list


    return (
        <AuthContext value={authData}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;