import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="max-w-xl mx-auto p-8 rounded-lg shadow-xl shadow-[var(--color-accent)] border border-[var(--color-base-200)] bg-[var(--color-bg)]">
            <h2 className="text-5xl font-bold mb-6 text-center text-[var(--color-secondary)]">
                Login Here!
            </h2>

            <div className="mt-10 mb-3 text-center mx-auto flex items-center justify-center">
                <button
                    type="button"
                    className="w-[70%] hover:w-full inline-flex items-center text-center justify-center gap-2 px-6 py-2 border border-gray-300 rounded-full hover:bg-[var(--color-secondary-light)] hover:text-[var(--color-secondary)] transition font-semibold"
                    onClick={() => alert("Google login clicked!")}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="..." />
                        <path fill="#FF3D00" d="..." />
                        <path fill="#4CAF50" d="..." />
                        <path fill="#1976D2" d="..." />
                    </svg>
                    Continue with Google
                </button>
            </div>

            <p className="border-b text-center text-[var(--color-accent)] font-bold text-xl mb-10">OR</p>

            <form onSubmit={handleSubmit} className="space-y-5 text-xl text-[var(--color-accent)]">
                <div>
                    <label className="block mb-2 font-medium" htmlFor="email">
                        Email <span className="text-[var(--color-secondary)]">*</span>
                    </label>
                    <input
                        name="email"
                        type="email"
                        placeholder="Enter Your Email"
                        className="w-full px-4 py-3 border border-[var(--color-secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary-hover)] text-base"
                    />
                </div>

                <div className="relative">
                    <label className="block mb-2 font-medium" htmlFor="password">
                        Password <span className="text-[var(--color-secondary)]">*</span>
                    </label>
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Your Password"
                        className="w-full px-4 py-3 pr-12 border border-[var(--color-secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary-hover)] text-base"
                    />
                    <div
                        className="absolute right-4 bottom-[14px] text-[var(--color-secondary)] cursor-pointer text-xl"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                </div>

                <div className="text-right">
                    <a className="text-sm text-[var(--color-secondary)] hover:underline cursor-pointer">
                        Forgot Password?
                    </a>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-red-400 text-white font-bold rounded-md hover:bg-red-600 transition"
                >
                    Login
                </button>
            </form>

            <div className="mt-6 text-center">
                <p>
                    Don’t have an account?{" "}
                    <a href="/register" className="text-indigo-400 hover:underline font-semibold">
                        Register here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
