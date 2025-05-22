import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaUtensils } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="py-10 pb-2">
            <div className="max-w-6xl mx-auto flex flex-col items-center lg:gap-5 gap-4">

                {/* Logo */}
                <Link to="/" className="text-5xl font-bold text-[var(--color-primary)] flex items-center gap-2 pb-4">
                    <FaUtensils className="text-[var(--color-secondary)]" />
                    <strong className="extra-bold"><span className='-rotate-16 inline-block text-6xl'>ｃ</span><span className="text-[var(--color-secondary)]">oo</span>ksy</strong>
                </Link>

                {/* Social + Links Row */}
                <div className="w-full flex flex-col xl:flex-row xl:justify-between md:items-center border-b border-[var(--color-base-200)] pb-8 px-6 md:gap-7 gap-5 xl:gap-0">

                    {/* Social Icons */}
                    <div className="flex flex-wrap justify-center md:gap-3 gap-2 text-[var(--color-primary)] md:text-3xl text-2xl">
                        <a href="https://www.facebook.com" target="_blank" rel="noreferrer"
                            className="bg-[#8dd3f1] md:p-3 p-2 rounded-full hover:opacity-80 transition">
                            <FaFacebookF />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer"
                            className="bg-[#00acee] md:p-3 p-2 rounded-full hover:opacity-80 transition">
                            <FaTwitter />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noreferrer"
                            className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 md:p-3 p-2 rounded-full hover:opacity-80 transition">
                            <FaInstagram />
                        </a>
                        <a href="https://www.youtube.com" target="_blank" rel="noreferrer"
                            className="bg-[#FF0000] md:p-3 p-2 rounded-full hover:opacity-80 transition">
                            <FaYoutube /> 
                        </a>
                    </div>

                    {/* Nav Links */}
                    <div className="flex flex-wrap justify-center xl:gap-13 md:gap-8 md:space-x-0 gap-2 space-x-4 text-base font-bold text-[var(--color-accent)]">
                        <Link to="/" className="transition">Home</Link>
                        <Link to="/all-recipes" className="transition">All Recipes</Link>
                        <Link to="/add-recipe" className="transition">Add Recipe</Link>
                        <Link to="/My-recipes" className="transition">My Recipes</Link>
                        <Link className="transition">Refund Policy</Link>
                        <Link className="transition">Contact Us</Link>
                    </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[var(--color-base-200)] text-center leading-relaxed px-4">
                    Please do not use any kind of definitions, recipes, cooking ingredients, and cooking styles. Explore more flavors,
                    master techniques, and bring your passion for cooking to life.
                </p>

                {/* Copyright */}
                <p className="text-[10px] sm:text-sm text-[var(--color-accent)] text-center px-4">
                    © 2025 Patoon. All rights reserved. Designed by Sifad Islam.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
