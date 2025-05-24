import React, { useEffect, useState } from "react";
import { FaHeart, FaUtensils } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { Link, useNavigate } from "react-router";

const TopRecipes = () => {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/allRecipes")
            .then(res => res.json())
            .then(data => {
                // Sort by likes descending and take top 6
                const topLiked = data.sort((a, b) => b.likes - a.likes).slice(0, 6);
                setRecipes(topLiked);
            })
            .catch(err => console.error("Failed to fetch recipes:", err));
    }, []);

    return (
        <section className="bg-[var(--color-section-bg)] md:py-14 sm:py-12 py-10 sm:mx-6 md:mx-4 mx-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-[var(--color-primary)] text-2xl sm:text-4xl font-bold text-center md:mb-4 mb-2">
                    🍽️ Top Recipes!
                </h2>
                <p className="text-center text-[var(--color-accent)] max-w-2xl mx-auto text-xs sm:text-base md:mb-10 mb-6">
                    Craving something amazing? Discover our most liked recipes handpicked just for you by food lovers worldwide! 🌍✨
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 gap-4">
                    {recipes.map((recipe) => (
                        <div
                            key={recipe._id}
                            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 relative"
                        >
                            <div className="relative">
                                <img
                                    src={recipe.image}
                                    alt={recipe.title}
                                    className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
                                />
                                <button className="absolute top-2 left-2 bg-white text-[var(--color-secondary)] text-base px-4 py-2 rounded-full shadow hover:scale-105 transition-transform">
                                    <FaHeart className="inline-block mr-1" /> {recipe.likes}
                                </button>
                            </div>
                            <div className="p-3 flex flex-col `gap-2">
                                <div className="flex items-center gap-3 text-base font-medium">
                                    <span className="text-gray-600 flex items-center">
                                        <FaUtensils className="mr-1" /> {recipe.cuisineType}
                                    </span>
                                </div>
                                <h3 className="text-3xl text-black font-semibold hover:underline cursor-pointer">
                                    {recipe.title}
                                </h3>
                                <Link to={`/recipe-details/${recipe._id}`}>
                                <button className="mt-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded w-full transition-colors">
                                    View Details
                                </button>
                                </Link> 
                            </div>
                        </div>
                    ))}
                </div>

                {/* See All Recipes Button */}
                <div className="mt-12 flex justify-center">
                    <button
                        onClick={() => navigate("/all-recipes")}
                        className="flex gap-2 items-center hover:bg-red-100 transition text-lg sm:text-xl md:text-xl px-6 sm:px-8 md:px-8 py-3 md:py-4 bg-white text-red-500 font-semibold rounded-full group shadow-md"
                    >
                        <span>See All Recipes</span>
                        <GoArrowRight className="transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TopRecipes;
