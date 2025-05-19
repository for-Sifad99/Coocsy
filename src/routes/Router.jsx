import React from 'react';
import { createBrowserRouter } from "react-router"
import PrivetRouter from '../routes/PrivetRouter'
import Root from '../layouts/Root'
import Home from '../pages/Home/Home'
import AllRecipes from '../pages/AllRecipes/AllRecipes'
import RecipeDetails from '../pages/RecipeDetails/RecipeDetails'
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
            {
                index: true,
                Component: Home
            },
            {
                path: '/all-recipes',
                Component: AllRecipes
            },
            {
                path: '/recipe-details',
                element: <PrivetRouter>
                    <RecipeDetails />
                </PrivetRouter>
            },
            {
                path: '/add-recipes',
                element: <PrivetRouter>
                    <AddRecipes />
                </PrivetRouter>
            },
            {
                path: '/my-recipes',
                element: <PrivetRouter>
                    <MyRecipes />
                </PrivetRouter>
            },
            {
                path: '/profile',
                Component: Profile
            },
            {
                path: '/register',
                Component: Register
            },
            {
                path: '/login',
                Component: Login
            },
        ]
    },
    {
        path: "/*",
        element: <ErrorPage />,
    },
]);

export default router;