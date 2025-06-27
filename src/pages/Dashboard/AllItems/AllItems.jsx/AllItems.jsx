import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaHeart, FaUtensils, FaClock } from 'react-icons/fa';
import 'animate.css';
import { AuthContext } from '../../../../Contexts/AuthContext';
import { Link } from 'react-router';



const AllItems = () => {
    const { data } = useContext(AuthContext);
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [cuisineFilter, setCuisineFilter] = useState('');

    useEffect(() => {
        if (data?.length) {
            setRecipes(data);
            setFilteredRecipes(data);
        };
    }, [data]);

    useEffect(() => {
        let filtered = [...recipes];

        if (cuisineFilter) {
            filtered = filtered.filter(recipe =>
                recipe.cuisineType.toLowerCase() === cuisineFilter.toLowerCase()
            );
        }

        if (searchTerm.trim() !== '') {
            filtered = filtered.filter(recipe =>
                recipe.cuisineType.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredRecipes(filtered);
    }, [searchTerm, cuisineFilter, recipes]);

    return (
        <>
            <Helmet>
                <title>All Recipes - Cooksy</title>
                <meta name="description" content="Explore all available recipes from chefs and food lovers around the world!" />
            </Helmet>

            <div className="py-8">
                    {/* Section Header */}
                    <div className="mb-4 sm:mb-6 space-y-1 sm:space-y-3">
                        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-black">
                            🍽️ Savor & Serve
                        </h2>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-md sm:max-w-xl md:max-w-2xl">
                            A delicious collection of{' '}
                            <span className="text-[var(--color-secondary)] font-semibold">
                                {filteredRecipes.length}
                            </span>{' '}
                            hand-picked recipes for every food lover. Explore and enjoy a variety
                            of tastes from around the world! 🌍✨
                        </p>
                    </div>

                    {/* Search Form */}
                    <form onSubmit={e => e.preventDefault()}>
                        <div className="flex flex-col md:flex-row gap-3 items-stretch max-w-3xl">
                            {/* Dropdown */}
                            <label className="flex items-center bg-[#e9e4e4] border-2 border-[#e9e4e4] rounded px-3 py-2 text-sm sm:text-base cursor-pointer select-none min-w-[148px] w-full md:w-auto">
                                <FaUtensils size={20} className="text-red-600 mr-2 min-w-[20px]" />
                                <select
                                    className="bg-[#e9e4e4] text-black outline-none cursor-pointer w-full"
                                    value={cuisineFilter}
                                    onChange={e => setCuisineFilter(e.target.value)}
                                >
                                    <option value="">All</option>
                                    <option value="Italian">Italian</option>
                                    <option value="Chinese">Chinese</option>
                                    <option value="Indian">Indian</option>
                                    <option value="Mexican">Mexican</option>
                                    {/* Add more options as needed */}
                                </select>
                            </label>

                            {/* Search Input */}
                            <label className="flex items-center bg-[#e9e4e4] border-2 border-[#e9e4e4] rounded px-2 py-2 w-full">
                                <input
                                    type="text"
                                    placeholder="Find recipes by Cuisine"
                                    className="w-full text-sm sm:text-base p-2 focus:outline-none text-black bg-[#e9e4e4] placeholder:text-xs sm:placeholder:text-sm"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />
                            </label>

                            {/* Search Button */}
                            <div className="w-full md:w-auto">
                                <button
                                    type="button"
                                className="w-full md:w-[110px] lg:w-[140px] bg-[#101f23] text-white hover:bg-red-600 text-xs sm:text-sm px-4 py-3 md:py-5 rounded-lg transition duration-500 cursor-pointer"
                                    onClick={() => { }}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </form>

                {/* Table Format */}
                <div className="overflow-x-auto rounded-lg shadow-md mt-4">
                    <table className="w-full text-left table-auto border-collapse">
                        <thead>
                            <tr className="text-white bg-[#101f23]">
                                <th className="px-4 py-3">Image</th>
                                <th className="px-4 py-3">Title</th>
                                <th className="px-4 py-3">Cuisine</th>
                                <th className="px-4 py-3">Likes</th>
                                <th className="px-4 py-3">Prep Time</th>
                                <th className="px-4 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRecipes.map(({ _id, image, title, likes = 0, cuisineType, prepTime }) => (
                                <tr key={_id} className="border-b-2 border-gray-300 hover:bg-[#f9f9f9] transition duration-300">
                                    <td className="px-4 py-1">
                                        <img
                                            src={image}
                                            alt={title}
                                            className="w-14 h-14 object-cover rounded-md border"
                                        />
                                    </td>
                                    <td className="px-4 py-1 font-semibold">{title}</td>
                                    <td className="px-4 py-1 text-red-500 font-medium">{cuisineType}</td>
                                    <td className="px-4 py-6 flex justify-center items-center gap-1 text-red-500 font-medium">
                                        <FaHeart /> {likes}
                                    </td>
                                    <td className="px-4 py-1 text-gray-600">
                                        <FaClock className="inline-block mr-1" /> {prepTime} min
                                    </td>
                                    <td className="px-4 py-1">
                                        <Link to={`/recipe-details/${_id}`}>
                                            <button className="bg-[#101f23] hover:bg-red-600 text-white text-sm px-4 py-2 rounded-full transition duration-300">
                                                View Details
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AllItems;
