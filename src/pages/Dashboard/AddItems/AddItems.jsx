import { Helmet } from "react-helmet-async";
import { FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Typewriter } from 'react-simple-typewriter';
import { useContext, useState } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";


const AddItems = () => {
    const { user } = useContext(AuthContext);
    const categories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan", "Snacks"];

    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [ingredientInput, setIngredientInput] = useState("");
    const [instructionInput, setInstructionInput] = useState("");

    const addIngredient = () => {
        if (ingredientInput.trim()) {
            setIngredients([...ingredients, ingredientInput.trim()]);
            setIngredientInput("");
        }
    };

    const removeIngredient = (index) => {
        const newList = [...ingredients];
        newList.splice(index, 1);
        setIngredients(newList);
    };

    const addInstruction = () => {
        if (instructionInput.trim()) {
            setInstructions([...instructions, instructionInput.trim()]);
            setInstructionInput("");
        }
    };

    const removeInstruction = (index) => {
        const newList = [...instructions];
        newList.splice(index, 1);
        setInstructions(newList);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const image = form.image.value.trim();
        const title = form.title.value.trim();
        const cuisineType = form.cuisine.value;
        const prepTime = form.preparationTime.value.trim();
        const category = form.categories.value;

        if (!image || !title || !cuisineType || ingredients.length === 0 || instructions.length === 0 || !prepTime || !category) {
            toast.warning("Please fill out all fields properly!");
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
            likes: 0,
            userName: user?.displayName || "Anonymous",
            userEmail: user?.email || "unknown"
        };

        fetch("https://recipe-book-server-kappa.vercel.app/addRecipes", {
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
                    setIngredients([]);
                    setInstructions([]);
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

            <section className="py-8">
                <h1 className="max-w-4xl pb-10 text-2xl sm:text-3xl md:text-4xl text-black font-bold">Let's Add a Recipe! Here🧑‍🍳</h1>

                <div className="max-w-4xl">
                    <form onSubmit={handleSubmit} className="space-y-6 text-gray-800 text-base sm:text-lg">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block mb-2 font-medium">Image URL</label>
                                <input type="text" name="image" placeholder="Paste your image URL" className="w-full px-4 py-3 border-2 border-black rounded-md" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Recipe Title</label>
                                <input type="text" name="title" placeholder="Enter recipe title" className="w-full px-4 py-3 border-2 border-black rounded-md" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium">Cuisine Type</label>
                                <select name="cuisine" className="w-full px-4 py-3 text-[#777D86] border-2 rounded-md">
                                    <option value="">Select one</option>
                                    <option value="Italian">Italian</option>
                                    <option value="Mexican">Mexican</option>
                                    <option value="Indian">Indian</option>
                                    <option value="Chinese">Chinese</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                        </div>

                        {/* Ingredients */}
                        <div>
                            <label className="block mb-2 font-medium">Ingredients</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={ingredientInput}
                                    onChange={(e) => setIngredientInput(e.target.value)}
                                    placeholder="Type ingredient and click add"
                                    className="flex-grow px-4 py-2 border-2 border-black rounded-md"
                                />
                                <button type="button" onClick={addIngredient} className="bg-black text-white px-3 py-2 rounded-md hover:bg-red-600">
                                    <FaPlus />
                                </button>
                            </div>
                            <ul className="list-disc pl-5">
                                {ingredients.map((item, index) => (
                                    <li key={index} className="flex justify-between items-center gap-2">
                                        {item}
                                        <button type="button" onClick={() => removeIngredient(index)} className="text-black hover:text-red-600">
                                            <FaTrash />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Instructions */}
                        <div>
                            <label className="block mb-2 font-medium">Instructions</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={instructionInput}
                                    onChange={(e) => setInstructionInput(e.target.value)}
                                    placeholder="Type instruction and click add"
                                    className="flex-grow px-4 py-2 border-2 border-black rounded-md"
                                />
                                <button type="button" onClick={addInstruction} className="bg-black text-white px-3 py-2 rounded-md hover:bg-red-600">
                                    <FaPlus />
                                </button>
                            </div>
                            <ul className="list-decimal pl-5">
                                {instructions.map((item, index) => (
                                    <li key={index} className="flex justify-between items-center gap-2">
                                        {item}
                                        <button type="button" onClick={() => removeInstruction(index)} className="text-black hover:text-red-600">
                                            <FaTrash />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 font-medium">Preparation Time (in minutes)</label>
                                <input type="number" name="preparationTime" className="w-full px-4 py-3 border-2 border-black rounded-md" />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">Categories</label>
                                <div className="flex flex-wrap gap-4">
                                    {categories.map((category) => (
                                        <label key={category} className="flex items-center gap-2 text-sm sm:text-base">
                                            <input type="radio" name="categories" value={category} className="text-black" />
                                            {category}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-black text-white font-bold rounded-md hover:bg-red-600 transition group">
                            <FaPlus className="transition-transform duration-500 ease-in-out group-hover:-translate-x-3" />  Add Recipe
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default AddItems;