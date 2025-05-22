import React, { useEffect, useState } from 'react';
import { FaHeart, FaUtensils, FaClock } from 'react-icons/fa';
import Loader from '../../components/Loader/Loader';

const AllRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllRecipes = async () => {
            try {
                const res = await fetch('http://localhost:3000/allRecipes');
                if (!res.ok) throw new Error('Failed to fetch recipes');
                const data = await res.json();
                setRecipes(data);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllRecipes();
    }, []);

    return (
        <div className="px-4 md:px-8 lg:px-16 py-10">
            <h1 className="text-3xl font-bold mb-8 text-center">
                All Recipes: {recipes.length}
            </h1>

            {loading ? (
                <Loader />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {recipes.map(({ _id, image, title, likes = 0, cuisineType, prepTime, category }) => (
                        <div
                            key={_id}
                            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-[360px] flex flex-col"
                        >
                            {/* Top 70% - Image & Like Button */}
                            <div className="relative h-[67%]">
                                <img
                                    src={image}
                                    alt={title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                                <button className="absolute top-2 left-2 bg-white text-red-500 text-xs px-3 py-1 rounded-full shadow hover:scale-105 transition-transform">
                                    <FaHeart className="inline-block mr-1" /> {likes}
                                </button>
                            </div>

                            {/* Bottom 30% - Text & Button */}
                            <div className="h-[43%] p-3 flex flex-col justify-between">
                                {/* Cuisine & Prep Time */}
                                <div className="flex gap-5 text-sm font-medium text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <FaUtensils />
                                        <span>{cuisineType}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaClock />
                                        <span>{prepTime} min</span>
                                    </div>
                                </div>

                                {/* Title & Category */}
                                <div>
                                    <h3 className="text-2xl font-semibold hover:underline cursor-pointer line-clamp-1">
                                        {title}
                                    </h3>
                                    <p className="text-red-500 text-xs capitalize">{category}</p>
                                </div>

                                {/* View Details Button */}
                                <button className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1.5 px-3 rounded w-full transition-colors">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllRecipes;
