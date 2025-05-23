import React from 'react';
import { useLoaderData } from 'react-router';

const RecipeDetails = () => {
    const recipe = useLoaderData();

    return (
        <div>
            <h2>This is Recipe Details Page!!</h2>
            {recipe ? (
                <div>
                    <h3>{recipe.title}</h3>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default RecipeDetails;