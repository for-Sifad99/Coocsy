import React, { useEffect, useState } from 'react';

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
            <h1 >All Recipes: {recipes.length}</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {recipes.map((recipe) => (
                        <li key={recipe._id}>
                            <h3>{recipe.title}</h3>
                            <p><strong>Instructions:</strong> {recipe.instructions}</p>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default AllRecipes;
