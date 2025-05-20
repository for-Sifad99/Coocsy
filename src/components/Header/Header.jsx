import { NavLink, useLocation } from "react-router";
import { FaUtensils, FaUserPlus, FaBars, FaTimes, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useState, useEffect } from "react";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    // Close menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const navLinkStyle = ({ isActive }) =>
        `font-semibold px-4 py-2 rounded-full transition-all duration-200 text-sm md:text-base 
        ${isActive ? "bg-red-100 text-red-600" : "text-gray-700 hover:bg-red-50 hover:text-red-600"}`;

    const navLinks = (
        <>
            <NavLink to="/" className={navLinkStyle}>
                {({ isActive }) => (
                    <span className="flex items-center gap-1">
                        Home
                        <span className="hidden md:inline">
                            {isActive ? <FaChevronDown /> : <FaChevronUp />}
                        </span>
                    </span>
                )}
            </NavLink>
            <NavLink to="/all-recipes" className={navLinkStyle}>
                {({ isActive }) => (
                    <span className="flex items-center gap-1">
                        All Recipes
                        <span className="hidden md:inline">
                            {isActive ? <FaChevronDown /> : <FaChevronUp />}
                        </span>
                    </span>
                )}
            </NavLink>
            <NavLink to="/add-recipe" className={navLinkStyle}>
                {({ isActive }) => (
                    <span className="flex items-center gap-2">
                        Add Recipe
                        <span className="hidden md:inline">
                            {isActive ? <FaChevronDown /> : <FaChevronUp />}
                        </span>
                    </span>
                )}
            </NavLink>
            <NavLink to="/my-recipes" className={navLinkStyle}>
                {({ isActive }) => (
                    <span className="flex items-center gap-2">
                        My Recipes
                        <span className="hidden md:inline">
                            {isActive ? <FaChevronDown /> : <FaChevronUp />}
                        </span>
                    </span>
                )}
            </NavLink>
        </>
    );

    return (
        <nav className="bg-white px-4 py-3 md:px-6 md:py-4">
            <div className="flex items-center">
                {/* Logo Left */}
                <NavLink to="/" className="text-2xl font-bold text-red-600 flex items-center gap-2">
                    <FaUtensils />
                    <strong className="extra-bold">Platea</strong>
                </NavLink>

                {/* Desktop Links */}
                <div className="hidden md:flex items-start gap-4 ml-10 mr-auto">
                    {navLinks}
                </div>

                {/* Right Side - Desktop Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <NavLink to="/register">
                        <FaUserPlus className="text-xl text-gray-700 hover:text-red-500 transition" />
                    </NavLink>
                    <NavLink
                        to="/login"
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    >
                        Login
                    </NavLink>
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden ml-auto">
                    <button
                        className="text-2xl text-gray-800"
                        onClick={() => setIsOpen(true)}
                    >
                        <FaBars />
                    </button>
                </div>
            </div>

            {/* Backdrop Overlay */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-opacity-20 z-50"
                />
            )}

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-full bg-white z-50 transform transition-transform duration-300
                ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="px-6 py-3 h-full flex flex-col justify-between">
                    <div>
                        {/* Close Button & Logo */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-red-600 flex items-center gap-2">
                                <FaUtensils />
                                <strong className="extra-bold">Platea</strong>
                            </h2>
                            <button
                                className="text-2xl text-gray-700"
                                onClick={() => setIsOpen(false)}
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Nav Links */}
                        <div className="flex flex-col items-center gap-2 text-center">
                            {navLinks}
                        </div>
                    </div>

                    {/* Bottom Buttons */}
                    <div className="flex flex-col items-center gap-4 mb-auto mt-4">
                        <NavLink to="/register">
                            <FaUserPlus className="text-2xl text-gray-700 hover:text-red-500 transition" />
                        </NavLink>
                        <NavLink
                            to="/login"
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                        >
                            Login
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
