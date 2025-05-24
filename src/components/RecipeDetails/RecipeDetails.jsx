import { Link, useLoaderData } from 'react-router';
import { FaClock, FaHeart, FaRegBookmark, FaUtensils } from 'react-icons/fa';
import { FaBowlFood } from "react-icons/fa6";
import { GoArrowRight } from "react-icons/go";
import { Helmet } from 'react-helmet-async';

const RecipeDetails = () => {
    const recipe = useLoaderData();
    const {
        image,
        title,
        cuisineType,
        ingredients,
        instructions,
        prepTime,
        categories,
        likes
    } = recipe;

    return (
        <>
            {/* Helmet */}
            <Helmet>
                <title>{title ? `${title} RECIPE - Cooksy` : "Recipe Details - Cooksy"}</title>
                <meta
                    name="description"
                    content="View detailed instructions, ingredients, and more for this amazing recipe on Cooksy!"
                />
            </Helmet>

            <div className="max-w-5xl mx-auto px-8 py-20 md:grid md:grid-cols-2 flex flex-col justify-center item-center gap-10 items-start">
                {/* Left Side Image */}
                <img
                    src={image}// replace this with your actual image path
                    alt={recipe.title}
                    className="rounded-xl shadow-lg w-full md:mx-0 mx-auto object-cover"
                />

                {/* Right Side Details */}
                <div className="space-y-4 w-full flex flex-col justify-center items-start md:mx-0 mx-auto">
                    <p className="text-red-500 font-bold uppercase text-5xl">{title}</p>

                    {/* Author + Icons */}
                    <div className="w-full flex flex-wrap sm:items-center gap-4 items-start justify-between py-2">
                        {/* Author Info */}
                        <div className="flex items-center gap-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 64 64"
                                width="48"
                                height="48"
                            >
                                <circle cx="32" cy="32" r="30" fill="#FFEDD5" stroke="#FDBA74" strokeWidth="2" />
                                <path d="M24 16c-1-6 6-9 10-6 4-3 11 0 10 6 3 1 4 5 3 7H21c-1-2 0-6 3-7z" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1" />
                                <circle cx="32" cy="36" r="12" fill="#FCD34D" />
                                <circle cx="28" cy="34" r="2" fill="#1F2937" />
                                <circle cx="36" cy="34" r="2" fill="#1F2937" />
                                <path d="M28 40c2 2 6 2 8 0" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
                                <path d="M24 48c0 4 16 4 16 0v-4H24v4z" fill="#F87171" stroke="#B91C1C" strokeWidth="1" />
                            </svg>
                            <div>
                                <p className="font-semibold text-gray-700">Smart Chef</p>
                                <p className="text-sm text-gray-500">Recipe Author</p>
                            </div>
                        </div>

                        {/* Icons */}
                        <div className="flex items-center gap-3">
                            <button className="p-2 rounded-full bg-pink-100 text-pink-500 hover:bg-pink-200 transition">
                                <FaHeart className="text-xl" />
                            </button>
                            <button className="p-2 rounded-full bg-blue-100 text-blue-500 hover:bg-blue-200 transition">
                                <FaRegBookmark className="text-xl" />
                            </button>
                        </div>
                    </div>

                    {/* Divider */}
                    <hr className="w-full border-t border-gray-200 mb-8" />


                    {/* Info row */}
                    <div className="flex gap-4 text-base text-gray-600 flex-wrap">
                        <div className="flex items-center gap-2">
                            <FaClock /> <span>{prepTime} min</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaUtensils /> <span>{cuisineType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaBowlFood /> <span>{categories}</span>
                        </div>
                    </div>

                    {/* Instruction Info */}
                    <div className='mb-6'>
                        <h1 className="text-xl font-semibold mb-2">instructions</h1>
                        <h2 className="text-xl md:text-2xl font-bold leading-tight text-gray-400">
                            {instructions.map(i => <li>{i}</li>)}
                        </h2>
                    </div>


                    {/* Ingredients */}
                    <div>
                        <h2 className="text-xl font-semibold">Ingredients <span className="text-sm text-gray-500">(1 Person)</span></h2>
                        <div className="text-gray-700 text-sm">
                            {ingredients.map(i => <li>{i}</li>)}
                        </div>
                    </div>


                    {/* Button */}
                    <div className="mt-4 flex gap-5">
                        <Link
                            to='/all-recipes'
                            className="flex gap-2 items-center hover:bg-red-100 transition text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-8 py-2 md:py-3 bg-white text-red-500 font-semibold rounded-full group shadow-md"
                        >
                            <span>See All Recipes</span>
                            <GoArrowRight className="transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
                        </Link>
                        <button
                            className="flex gap-2 items-center hover:bg-red-100 transition text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-8 py-2 md:py-3 bg-white text-red-500 font-semibold rounded-full group shadow-md"
                        >
                            <span>Try It</span>
                            <GoArrowRight className="transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecipeDetails;
