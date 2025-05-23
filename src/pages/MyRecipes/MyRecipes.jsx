import React, { useState, useEffect } from 'react';

const MyRecipes = () => {
    // Replace this with your auth user email dynamically
    const userEmail = "sifayed99@gmail.com";

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRecipe, setCurrentRecipe] = useState(null);

    // Form state for update
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        ingredients: '',
        instructions: '',
        cuisineType: '',
        prepTime: '',
        categories: '',
        likeCount: 0,
    });

    // Fetch user recipes on mount
    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3000/recipes?email=${encodeURIComponent(userEmail)}`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch recipes');
                return res.json();
            })
            .then(data => {
                setRecipes(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [userEmail]);

    // Delete recipe handler
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this recipe?')) return;

        try {
            const res = await fetch(`http://localhost:3000/recipes/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete recipe');

            setRecipes(recipes.filter(recipe => recipe._id !== id));
        } catch (err) {
            alert('Delete failed: ' + err.message);
        }
    };

    // Open update modal and fill form
    const openUpdateModal = (recipe) => {
        setCurrentRecipe(recipe);
        setFormData({
            title: recipe.title || '',
            image: recipe.image || '',
            ingredients: recipe.ingredients || '',
            instructions: recipe.instructions || '',
            cuisineType: recipe.cuisineType || '',
            prepTime: recipe.prepTime || '',
            categories: recipe.categories || '',
            likeCount: recipe.likeCount || 0,
        });
        setIsModalOpen(true);
    };

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Submit update form
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3000/recipes/${currentRecipe._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!res.ok) throw new Error('Failed to update recipe');

            // Update recipe in local state
            setRecipes(recipes.map(r => (r._id === currentRecipe._id ? { ...r, ...formData } : r)));

            setIsModalOpen(false);
            setCurrentRecipe(null);
        } catch (err) {
            alert('Update failed: ' + err.message);
        }
    };

    return (
        <div style={{ maxWidth: 900, margin: 'auto', padding: 20 }}>
            <h1>🍲 My Recipes</h1>

            {loading && <p>Loading your recipes...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && recipes.length === 0 && <p>You have no recipes added yet.</p>}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
                {recipes.map(recipe => (
                    <div
                        key={recipe._id}
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: 8,
                            width: 300,
                            padding: 15,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        }}
                    >
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 6 }}
                        />
                        <h3>{recipe.title}</h3>
                        <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                        <p><strong>Instructions:</strong> {recipe.instructions}</p>
                        <p><strong>Cuisine Type:</strong> {recipe.cuisineType}</p>
                        <p><strong>Prep Time:</strong> {recipe.prepTime} hours</p>
                        <p><strong>Category:</strong> {recipe.categories}</p>
                        <p><strong>Like Count:</strong> {recipe.likeCount}</p>

                        <button
                            onClick={() => openUpdateModal(recipe)}
                            style={{ marginRight: 10, padding: '6px 12px', cursor: 'pointer' }}
                        >
                            Update
                        </button>

                        <button
                            onClick={() => handleDelete(recipe._id)}
                            style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: 4 }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            {/* Update Modal */}
            {isModalOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0, left: 0,
                        width: '100vw', height: '100vh',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        zIndex: 9999,
                    }}
                    onClick={() => setIsModalOpen(false)} // Close modal if click outside form
                >
                    <form
                        onClick={e => e.stopPropagation()} // Prevent modal close on form click
                        onSubmit={handleUpdateSubmit}
                        style={{
                            backgroundColor: 'white',
                            padding: 30,
                            borderRadius: 10,
                            maxWidth: 500,
                            width: '100%',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                        }}
                    >
                        <h2>Update Recipe</h2>

                        <label>
                            Title:
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: 8, marginBottom: 10 }}
                            />
                        </label>

                        <label>
                            Image URL:
                            <input
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: 8, marginBottom: 10 }}
                            />
                        </label>

                        <label>
                            Ingredients:
                            <textarea
                                name="ingredients"
                                value={formData.ingredients}
                                onChange={handleChange}
                                required
                                rows={3}
                                style={{ width: '100%', padding: 8, marginBottom: 10 }}
                            />
                        </label>

                        <label>
                            Instructions:
                            <textarea
                                name="instructions"
                                value={formData.instructions}
                                onChange={handleChange}
                                required
                                rows={3}
                                style={{ width: '100%', padding: 8, marginBottom: 10 }}
                            />
                        </label>

                        <label>
                            Cuisine Type:
                            <input
                                name="cuisineType"
                                value={formData.cuisineType}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: 8, marginBottom: 10 }}
                            />
                        </label>

                        <label>
                            Preparation Time (hours):
                            <input
                                type="number"
                                name="prepTime"
                                value={formData.prepTime}
                                onChange={handleChange}
                                required
                                min="0"
                                style={{ width: '100%', padding: 8, marginBottom: 10 }}
                            />
                        </label>

                        <label>
                            Category:
                            <input
                                name="categories"
                                value={formData.categories}
                                onChange={handleChange}
                                required
                                style={{ width: '100%', padding: 8, marginBottom: 10 }}
                            />
                        </label>

                        <label>
                            Like Count:
                            <input
                                type="number"
                                name="likeCount"
                                value={formData.likeCount}
                                onChange={handleChange}
                                min="0"
                                style={{ width: '100%', padding: 8, marginBottom: 10 }}
                            />
                        </label>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                style={{ padding: '8px 16px', cursor: 'pointer' }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: 4 }}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default MyRecipes;
