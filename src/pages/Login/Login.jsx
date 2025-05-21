import React, { useContext, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import successAnimation from "../../assets/animations/successLottie.json";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

const Login = () => {
    const { signInUser, googleSignIn, forgotPassword, setUser } = useContext(AuthContext);
    const [success, setSuccess] = useState(false);
    const emailRef = useRef();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const formdata = new FormData(form);
        const email = formdata.get('email');
        const password = formdata.get('password')

        // Manual validation
        if (!email) {
            toast.error("Please enter your email!");
            return;
        }
        if (!password) {
            toast.error("Please enter your password!");
            return;
        }

        // Firebase login
        signInUser(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                setSuccess(true);

                setTimeout(() => {
                    navigate(location.state?.from || '/');
                }, 2500);
            })
            .catch((error) => {
                if (error.code === 'auth/invalid-credential') {
                    toast.error('Invalid email or password. Please try again.');
                } else if (error.code === 'auth/user-not-found') {
                    toast.error('User not found. Please register first.');
                } else {
                    toast.error(error.message);
                }
            });
    };

    // Google Authentication Login
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                const user = result.user;
                setUser(user);
                navigate(location.state?.from || '/');
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    // User reset password
    const handleReset = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;

        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        try {
            forgotPassword(email);
            // Show sweet success message
            Swal.fire({
                title: 'Success!',
                text: 'We’ve sent you a reset link. Let’s check your email!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Optional: Redirect to email (user browser must allow popups)
                    window.open('https://mail.google.com', '_blank');
                }
            });

        } catch (error) {
            toast.error(error.message || "Something went wrong!");
        }
};


return (
    <>
        {/* Helmet */}
        <Helmet>
            <title>Login - Cooksy</title>
            <meta name="description" content="Login to your Cooksy account to explore, save, and manage recipes." />
        </Helmet>

        <div className="relative max-w-xl mx-auto p-8 rounded-lg shadow-xl shadow-[var(--color-accent)] border border-[var(--color-base-200)] bg-[var(--color-bg)]">

            {success && (
                <div
                    className="absolute inset-0 bg-transparent bg-opacity-20 backdrop-blur-sm z-40"
                    aria-modal="true"
                    role="dialog"
                >
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg p-6 flex flex-col items-center max-w-sm bg-opacity-0">

                        <Lottie
                            animationData={successAnimation}
                            loop={false}
                            style={{ height: 250, width: 250 }}
                        />
                        <p className="text-green-600 font-bold mt-4 text-center">
                            Successfully Logged in!
                        </p>
                    </div>
                </div>
            )}

            <h2 className="text-5xl font-bold mb-6 text-center text-[var(--color-secondary)]">
                Login Here!
            </h2>

            <div className="mt-10 mb-3 text-center mx-auto flex items-center justify-center">
                <button
                    onClick={handleGoogleSignIn}
                    type="button"
                    className="w-full max-w-xs sm:max-w-md md:max-w-[70%] inline-flex items-center justify-center gap-2 px-6 py-2 border border-gray-300 rounded-full hover:bg-[var(--color-secondary-light)] hover:text-[var(--color-secondary)] transition font-semibold text-sm sm:text-base"
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

            <form onSubmit={handleLogin} className="space-y-5 text-xl text-[var(--color-accent)]">
                <div>
                    <label className="block mb-2 font-medium">
                        Email <span className="text-[var(--color-secondary)]">*</span>
                    </label>
                    <input
                        name="email"
                        type="email"
                        ref={emailRef}
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
                    <a onClick={handleReset} className="text-sm text-[var(--color-secondary)] hover:underline cursor-pointer">
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
    </>
);
};

export default Login;
