import { Helmet } from "react-helmet-async";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Typewriter } from 'react-simple-typewriter';
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext"; // adjust path as needed
import bannerImage from "../../assets/component-imgs/addRecipe-banner.png"; // update path if needed

const AddRecipe = () => {
    const { user } = useContext(AuthContext);
    const categories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan", "Snacks"];

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const image = form.image.value.trim();
        const title = form.title.value.trim();
        const cuisineType = form.cuisine.value;
        const ingredients = form.ingredients.value.trim();
        const instructions = form.instructions.value.trim();
        const prepTime = form.preparationTime.value.trim();
        const category = form.categories.value;

        if (!image || !title || !cuisineType || !ingredients || !instructions || !prepTime || !category) {
            toast.warning("Please fill out all fields!");
            return;
        }

        const newRecipe = {
            image,
            title,
            cuisineType,
            ingredients,
            instructions,
            prepTime,
            categories: category,
            likeCount: 0,
            userName: user?.displayName || "Anonymous",
            userEmail: user?.email || "unknown"
        };

        fetch("http://localhost:3000/addRecipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRecipe),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire({
                        title: "Recipe Added Successfully!",
                        icon: "success",
                        confirmButtonColor: "#d33",
                    });
                    form.reset();
                } else {
                    toast.error("Failed to add recipe.");
                }
            })
            .catch((err) => {
                toast.error("Something went wrong!");
                console.error(err);
            });
    };

    return (
        <>
        {/* Helmet */}
            <Helmet>
                <title>Add Recipe - Cooksy</title>
                <meta name="description" content="Add your favorite recipe and share it with the Cooksy community." />
            </Helmet>

            {/* ✨ Beautiful Banner ✨ */}
            <div
                className="relative h-60 sm:h-80 md:h-[300px] bg-cover bg-center flex items-center justify-center text-white text-center"
                style={{
                    backgroundImage: `url(${bannerImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="w-full h-full absolute top-0 left-0 z-0"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4 sm:p-10">
                    <h1 className="text-xl sm:text-3xl md:text-5xl font-extrabold mb-1 sm:mb-2 md:mb-4">
                        <Typewriter
                            words={["Share Your Special Recipe", "Turn Ingredients into Magic", "Create Culinary Masterpieces"]}
                            loop={true}
                            cursor
                            cursorStyle="|"
                            typeSpeed={80}
                            deleteSpeed={60}
                            delaySpeed={1500}
                        />
                    </h1>
                    <p className="text-xs sm:text-sm md:text-base text-[#fce53a] font-semibold sm:text-lg max-w-3xl">
                        Whether it’s your grandma’s secret curry or a midnight snack invention, add your recipe and let the world enjoy your cooking magic. Every flavor has a story — tell yours!
                    </p>
                </div>
            </div>

            {/* 🔥 Form Section */}
            <section className="py-12 px-4 min-h-screen bg-[var(--color-section-bg)]">
                <h1 className="max-w-4xl mx-auto py-5 text-2xl sm:text-3xl md:text-4xl text-[var(--color-primary)] font-bold">Let's Add a Recipe! Here🧑‍🍳</h1>

                <div className="max-w-4xl mx-auto bg-[var(--color-section-bg)] p-8 rounded-lg shadow shadow-red-300 border border-[var(--color-secondary)]">
                    <form onSubmit={handleSubmit} className="space-y-6 text-[var(--color-accent)] text-base sm:text-lg">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block mb-2 font-medium">Image URL</label>
                                <input type="text" name="image" placeholder="Paste your image URL" className="w-full px-4 py-3 border-2 border-[var(--color-secondary)] rounded-md" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Recipe Title</label>
                                <input type="text" name="title" placeholder="Enter recipe title" className="w-full px-4 py-3 border-2 border-[var(--color-secondary)] rounded-md" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Cuisine Type</label>
                                <select name="cuisine" className="w-full px-4 py-3 border-2 border-[var(--color-secondary)] rounded-md">
                                    <option value="" className="text-black font-normal">Select one</option>
                                    <option value="Italian" className="text-black font-normal">Italian</option>
                                    <option value="Mexican" className="text-black font-normal">Mexican</option>
                                    <option value="Indian" className="text-black font-normal">Indian</option>
                                    <option value="Chinese" className="text-black font-normal">Chinese</option>
                                    <option value="Others" className="text-black font-normal">Others</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">Ingredients</label>
                            <textarea name="ingredients" rows="3" placeholder="List ingredients separated by commas" className="w-full px-4 py-3 border-2 border-[var(--color-secondary)] rounded-md"></textarea>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">Instructions</label>
                            <textarea name="instructions" rows="4" placeholder="How to cook it?" className="w-full px-4 py-3 border-2 border-[var(--color-secondary)] rounded-md"></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 font-medium">Preparation Time (in minutes)</label>
                                <input type="number" name="preparationTime" className="w-full px-4 py-3 border-2 border-[var(--color-secondary)] rounded-md" />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Categories</label>
                                <div className="flex flex-wrap gap-4">
                                    {categories.map((category) => (
                                        <label key={category} className="flex items-center gap-2 text-sm sm:text-base">
                                            <input type="radio" name="categories" value={category} className="accent-[var(--color-secondary)]" />
                                            {category}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[var(--color-secondary)] text-white font-bold rounded-md hover:bg-red-400 transition group ">
                            <FaPlus className="transition-transform duration-500 ease-in-out group-hover:-translate-x-3" />  Add Recipe
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default AddRecipe;
