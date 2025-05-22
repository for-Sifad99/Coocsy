import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from '../../components/Banner/Banner';
import TopRecipes from '../../components/TopRecipes/TopRecipes';


const Home = () => {
    return (
        <>
            {/* Helmet */}
            <Helmet>
                <title>Home - Cooksy</title>
                <meta name="description" content="Welcome to Cooksy - Discover delicious recipes and share your culinary creations with the world!" />
            </Helmet>

            {/* Banner Section */}
            <section>
                <Banner />
            </section>

            {/* Top Recipes Section */}
            <section>
                <TopRecipes />
            </section>


        </>
    );
};

export default Home;