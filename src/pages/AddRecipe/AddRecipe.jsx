import { Helmet } from "react-helmet-async";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext"; // adjust path as needed

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
            <Helmet>
                <title>Add Recipe - Cooksy</title>
                <meta name="description" content="Add your favorite recipe and share it with the Cooksy community." />
            </Helmet>

            <section className="py-12 px-4 min-h-screen bg-[var(--color-section-bg)]">
                <div className="max-w-4xl mx-auto bg-[var(--color-section-bg)] p-8 rounded-lg shadow shadow-red-300 border border-[var(--color-secondary)]">
                    <h2 className="text-3xl sm:text-5xl font-bold md:mb-16 sm:mb-10 mb-8 text-center text-[var(--color-secondary)]">
                        Add a New Recipe
                    </h2>

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
                                    <option value="">Select one</option>
                                    <option value="Italian">Italian</option>
                                    <option value="Mexican">Mexican</option>
                                    <option value="Indian">Indian</option>
                                    <option value="Chinese">Chinese</option>
                                    <option value="Others">Others</option>
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

                        <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[var(--color-secondary)] text-white font-bold rounded-md hover:bg-red-400 transition">
                            <FaPlus /> Add Recipe
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default AddRecipe;
