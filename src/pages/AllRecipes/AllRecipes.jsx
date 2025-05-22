import React, { useEffect, useState } from 'react';
import { FaHeart, FaUtensils, FaClock } from 'react-icons/fa';
import Loader from '../../components/Loader/Loader';
import 'animate.css';
import { Helmet } from 'react-helmet-async';

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
        <>
        {/* Helmet */}
            <Helmet>
                <title>All Recipes - Cooksy</title>
                <meta name="description" content="Explore all available recipes from chefs and food lovers around the world!" />
            </Helmet>

            <div className="px-4 sm:px-6 md:px-8 lg:px-16 py-8 md:py-10 lg:py-14 bg-[var(--color-section-bg)]">
                {/* Section Header */}
                <div className="text-center mb-5 sm:mb-7 md:mb-10 lg:mb-14 space-y-3 sm:space-y-4">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-primary)]">
                        🍽️ Savor & Serve!
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-[var(--color-accent)] max-w-md sm:max-w-xl md:max-w-2xl mx-auto">
                        A delicious collection of <span className="text-[var(--color-secondary)] font-semibold">{recipes.length}</span> hand-picked recipes for every food lover. Explore and enjoy a variety of tastes from around the world! 🌍✨
                    </p>
                </div>

                {/* Loader */}
                {loading ? (
                    <Loader />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {recipes.map(({ _id, image, title, likes = 0, cuisineType, prepTime, category }, i) => (
                            <div
                                key={_id}
                                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-[360px] flex flex-col animate__animated animate__fadeInUp"
                                style={{ animationDelay: `${i * 0.2}s`, animationFillMode: 'both' }}
                            >
                                {/* Image Section */}
                                <div className="relative h-[67%]">
                                    <img
                                        src={image}
                                        alt={title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                    <button className="absolute top-2 left-2 bg-white text-[var(--color-secondary)] text-xs px-3 py-1 rounded-full shadow hover:scale-105 transition-transform">
                                        <FaHeart className="inline-block mr-1" /> {likes}
                                    </button>
                                </div>

                                {/* Info Section */}
                                <div className="h-[43%] p-3 flex flex-col justify-between">
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

                                    <div>
                                        <h3 className="text-2xl
                                    font-bold hover:underline cursor-pointer line-clamp-1">
                                            {title}
                                        </h3>
                                        <p className="text-red-500 text-xs capitalize">{category}</p>
                                    </div>

                                    <button className="bg-red-500 hover:bg-[var(--color-secondary)]  text-white text-sm font-medium py-1.5 px-3 rounded-full w-full transition-colors">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default AllRecipes;
