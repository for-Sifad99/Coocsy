import React from "react";
import { FaHeart, FaUtensils } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router";

const TopRecipes = () => {
    const navigate = useNavigate();

    const recipes = [
        {
            id: 1,
            title: "Cheesy Spinach and Artichoke Dip Platter",
            category: "Appetizers",
            cuisine: "American",
            likes: 5,
            image: "https://i.postimg.cc/jSBzxsXs/pecipe-1.jpg",
        },
        {
            id: 2,
            title: "Instant Pot Honey Garlic Beef crazy Chops",
            category: "Instant Pot",
            cuisine: "Turkish",
            likes: 40,
            image: "https://i.postimg.cc/HkMrtbwg/recipe-2.jpg",
        },
        {
            id: 3,
            title: "Grilled Shrimp Skewers with Honey Lime Glaze",
            category: "BBQ & Grilling",
            cuisine: "Indian",
            likes: 48,
            image: "https://i.postimg.cc/Gt3D79cj/recipe-2.jpg",
        },
        {
            id: 4,
            title: "Creamy Chicken Alfredo Pasta",
            category: "Main Course",
            cuisine: "Italian",
            likes: 32,
            image: "https://i.postimg.cc/8P25ssqn/recipe-4.jpg",
        },
        {
            id: 5,
            title: "Classic French Onion Soup",
            category: "Soups",
            cuisine: "French",
            likes: 28,
            image: "https://i.postimg.cc/MHsQhxHJ/recipe-3.jpg",
        },
        {
            id: 6,
            title: "Spicy Korean Chicken Wings",
            category: "Snacks",
            cuisine: "Korean",
            likes: 37,
            image: "https://i.postimg.cc/3JRp2yf8/recipe-4.jpg",
        },
    ];

    return (
        <section className="bg-[#f9f6f3] py-14 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-4">
                    🍽️ Top Recipes!
                </h2>
                <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
                    Craving something amazing? Discover our most liked recipes handpicked just for you by food lovers worldwide! 🌍✨
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recipes.map((recipe) => (
                        <div
                            key={recipe.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 relative"
                        >
                            <div className="relative">
                                <img
                                    src={recipe.image}
                                    alt={recipe.title}
                                    className="w-full h-72 object-cover hover:scale-105 transition-transform duration-300"
                                />
                                <button className="absolute top-2 right-2 bg-white text-red-500 p-2 rounded-full shadow hover:scale-110 transition-transform">
                                    <FaHeart />
                                </button>
                            </div>
                            <div className="p-5 flex flex-col gap-3">
                                <div className="flex items-center gap-3 text-sm font-medium">
                                    <p className="text-red-500">{recipe.category}</p>
                                    <span className="text-gray-600 flex items-center gap-1">
                                        <FaUtensils /> {recipe.cuisine}
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold hover:underline cursor-pointer">
                                    {recipe.title}
                                </h3>
                                <button className="mt-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded w-full transition-colors">
                                    View Details
                                </button>
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
