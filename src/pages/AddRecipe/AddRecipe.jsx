import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AddRecipe = () => {
    const categories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan", "Snacks"];

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formdata = new FormData(form);
        const newRecipe = Object.fromEntries(formdata.entries())
        
        // Create a new recipe in the DB:
        fetch('http://localhost:3000/addRecipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRecipe)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: "Recipe Added Successfully!",
                        icon: "success",
                        draggable: true,
                    });
                    form.reset();
                } else {
                    toast.error("Failed to add recipe.");
                }
            })         
    }

    return (
        <section className="py-12 px-4 min-h-screen bg-[#fff8f0]">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h2 className="sm:text-5xl text-3xl font-bold mb-6 text-center text-[var(--color-secondary)]">
                    Add a New Recipe
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6 text-[var(--color-accent)] text-base sm:text-lg">
                    <div>
                        <label className="block mb-2 font-medium">Image URL</label>
                        <input
                            type="text"
                            name="image"
                            placeholder="Paste your image URL"
                            className="w-full px-4 py-3 border border-[var(--color-secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary-hover)]"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Recipe Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter recipe title"
                            className="w-full px-4 py-3 border border-[var(--color-secondary)] rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Ingredients</label>
                        <textarea
                            name="ingredients"
                            rows="3"
                            placeholder="List ingredients separated by commas"
                            className="w-full px-4 py-3 border border-[var(--color-secondary)] rounded-md"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Instructions</label>
                        <textarea
                            name="instructions"
                            rows="4"
                            placeholder="How to cook it?"
                            className="w-full px-4 py-3 border border-[var(--color-secondary)] rounded-md"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Cuisine Type</label>
                        <select
                            name="cuisine"
                            className="w-full px-4 py-3 border border-[var(--color-secondary)] rounded-md"
                        >
                            <option value="">Select one</option>
                            <option value="Italian">Italian</option>
                            <option value="Mexican">Mexican</option>
                            <option value="Indian">Indian</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Preparation Time (in minutes)</label>
                        <input
                            type="number"
                            name="preparationTime"
                            className="w-full px-4 py-3 border border-[var(--color-secondary)] rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Categories</label>
                        <div className="flex flex-wrap gap-4">
                            {categories.map((category) => (
                                <label key={category} className="flex items-center gap-2 text-sm sm:text-base">
                                    <input
                                        type="radio"
                                        name="categories"
                                        className="accent-[var(--color-secondary)]"
                                    />
                                    {category}
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[var(--color-secondary)] text-white font-bold rounded-md hover:bg-[var(--color-secondary-hover)] transition"
                    >
                        <FaPlus /> Add Recipe
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AddRecipe;
