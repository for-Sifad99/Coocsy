import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthContext'; // 
const Overview = () => {
    const { user } = useContext(AuthContext);
    const [counts, setCounts] = useState({
        totalRecipes: 0,
        myRecipes: 0,
        favorites: 0
    });

    useEffect(() => {
        if (user?.email) {
            fetch(`https://localhost:3000/overview?email=${user.email}`)
                .then(res => res.json())
                .then(data => setCounts(data));
        }
    }, [user?.email]);

    return (
        <div className="py-8">
            <div className='mb-8'>
                <h2 className="text-3xl md:text-4xl text-black font-bold mb-2 md:mb-4">
                    Dashboard Overview! 💫
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 max-w-2xl">
                    Here you'll find a summary of your activity, quick stats, and access to important sections.
                </p>
            </div>

            <div className="max-w-3xl grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-blue-100 text-blue-800 p-4 rounded-xl shadow">
                    <h3 className="text-lg font-semibold">Total Recipes</h3>
                    <p className="text-2xl font-bold">{counts.totalRecipes}</p>
                </div>
                <div className="bg-green-100 text-green-800 p-4 rounded-xl shadow">
                    <h3 className="text-lg font-semibold">My Recipes</h3>
                    <p className="text-2xl font-bold">{counts.myRecipes}</p>
                </div>
                <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl shadow">
                    <h3 className="text-lg font-semibold">Favorites</h3>
                    <p className="text-2xl font-bold">{counts.favorites}</p>
                </div>
            </div>
        </div>
    );
};

export default Overview;
