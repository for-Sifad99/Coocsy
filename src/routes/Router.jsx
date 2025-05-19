import React from 'react';
import { createBrowserRouter } from "react-router";
import Root from '../layouts/Root'
import Home from '../pages/Home/Home'
import AllRecipes from '../pages/AllRecipes/AllRecipes'
import AddRecipes from '../pages/AddRecipes/AddRecipes'
import MyRecipes from '../pages/MyRecipes/MyRecipes'
import Profile from '../pages/Profile/Profile'
import Register from '../pages/Register/Register'
import Login from '../pages/Login/Login'
import ErrorPage from '../pages/ErrorPage/ErrorPage';


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            { index: true, Component: Home },
            { path: 'all-recipes', Component: AllRecipes },
            { path: 'add-recipes', Component: AddRecipes },
            { path: 'my-recipes', Component: MyRecipes },
            { path: 'profile', Component: Profile },
            { path: 'register', Component: Register },
            { path: 'login', Component: Login },
        ]
    },
    {
        path: "/*",
        element: <ErrorPage />,
    },
]);

export default router;