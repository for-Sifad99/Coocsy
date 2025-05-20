import React from "react";


const Register = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="max-w-xl mx-auto p-8 rounded-lg shadow-xl shadow-[var(--color-accent)] border border-[var(--color-base-200)] bg-[var(--color-bg)]">
            <h2 className="text-5xl font-bold mb-6 text-center text-[var(--color-secondary)]">
                Register Now!
            </h2>

            <div className="mt-10 mb-3 text-center mx-auto flex items-center justify-center">
                <button
                    type="button"
                    className="w-[70%] hover:w-full inline-flex items-center text-center justify-center gap-2 px-6 py-2 border border-gray-300 rounded-full hover:bg-[var(--color-secondary-light)] hover:text-[var(--color-secondary)] transition font-semibold"
                    onClick={() => alert("Google login clicked!")}
                >
                    {/* Google Icon SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.641C34.125 32.828 29.473 36 24 36c-7.732 0-14-6.268-14-14s6.268-14 14-14c3.663 0 6.994 1.372 9.548 3.606l6.768-6.768C36.604 5.502 30.684 4 24 4 12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20c0-1.342-.133-2.645-.389-3.917z" />
                        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.039 17.566 18.678 14 24 14c3.663 0 6.994 1.372 9.548 3.606l6.768-6.768C36.604 5.502 30.684 4 24 4 16.534 4 10.006 8.418 6.306 14.691z" />
                        <path fill="#4CAF50" d="M24 44c6.104 0 11.437-2.455 15.299-6.429l-7.297-6.041C29.991 33.91 27.15 35 24 35c-5.099 0-9.417-3.081-11.11-7.37l-6.543 5.046C8.48 39.758 15.799 44 24 44z" />
                        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.641c-1.048 5.372-5.683 9.25-11.641 9.25-6.028 0-11-4.972-11-11s4.972-11 11-11c3.663 0 6.994 1.372 9.548 3.606l6.768-6.768C36.604 5.502 30.684 4 24 4 12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20c0-1.342-.133-2.645-.389-3.917z" />
                    </svg>
                    Continue with Google
                </button>
            </div>

            <p className="border-b text-center text-[var(--color-accent)] font-bold text-xl mb-10">OR</p>
            <form onSubmit={handleSubmit} className="space-y-5 text-xl text-[var(--color-accent)]">
                <div>
                    <label className="block mb-2 font-medium">
                        Name <span className="text-[var(--color-secondary)]">*</span>
                    </label>
                    <input
                        name="name"
                        type="text"
                        placeholder="Enter Your Name"
                        className="w-full px-4 py-3 border border-[var(--color-secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary-hover)] text-base"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="email"
                        type="email"
                        placeholder="Enter Your Email"
                        className="w-full px-4 py-3 border border-[var(--color-secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary-hover)] text-base"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium" >
                        Photo URL
                    </label>
                    <input
                        name="photoURL"
                        type="url"
                        placeholder="Give Your Photo URL"
                        className="w-full px-4 py-3 border border-[var(--color-secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary-hover)] text-base"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium" >
                        Password <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Enter A Password"
                        className="w-full px-4 py-3 border border-[var(--color-secondary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary-hover)] text-base"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-red-400 text-white font-bold rounded-md hover:bg-red-600 transition"
                >
                    Register
                </button>
            </form>

            <div className="mt-6 text-center">
                <p>
                    Already have an account?{" "}
                    <a href="/login" className="text-indigo-400 hover:underline font-semibold">
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
