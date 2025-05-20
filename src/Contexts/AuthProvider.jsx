import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from "../../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, updateProfile } from 'firebase/auth';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    //? Create User:
    const createUser = (email, password) => {
        // setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    //? Google Sign in:
    const provider = new GoogleAuthProvider();
    const googleSignIn = () => {
        return signInWithPopup(auth, provider)
     }

    // //? Update User:
    const updateUser = (userInfo) => {
        // setLoading(true);
        return updateProfile(auth.currentUser, userInfo)
        }

    const authData = {
        user,
        setUser,
        createUser,
        googleSignIn,
        updateUser
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