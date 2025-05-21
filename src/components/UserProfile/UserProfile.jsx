import { useContext, useState } from "react";
import { IoMdLogOut } from "react-icons/io"; // logout icon
import { IoPersonCircle } from "react-icons/io5"; // profile icon
import { AuthContext } from "../../Contexts/AuthContext.jsx";
import { useNavigate } from "react-router";

const UserProfile = () => {
    const { userSignout, user } = useContext(AuthContext);
    const navigate = useNavigate();    const [isOpen, setIsOpen] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const handleLogout = async () => {
        await userSignout();
        navigate('/login');
        setIsOpen(false);
    };

    return (
        <div className="relative">
            {/* Small Profile Picture (trigger) */}
            <img
                src={user?.photoURL || "/default-user.png"}
                alt="User"
                className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            />

            {/* Sidebar Panel */}
            {isOpen && (
                <div className="absolute top-12 right-0 w-64 bg-white shadow-xl rounded-xl p-4 border z-50">
                    {/* Large Profile Picture */}
                    <div className="flex flex-col items-center gap-2">
                        <img
                            src={user?.photoURL || "/default-user.png"}
                            alt="Large User"
                            className="w-24 h-24 rounded-full border border-gray-400"
                        />
                        <h2 className="text-lg font-semibold">{user?.displayName || "User"}</h2>
                        <p className="text-sm text-gray-500 text-center">Thanks for being with us 💕</p>
                    </div>

                    <hr className="my-4" />

                    {/* Profile Button */}
                    <p
                        onClick={() => setShowDetails(!showDetails)}
                        className="w-full text-lg flex items-center justify-start gap-2 text-left text-[var(--color-accent)] hover:text-[var(--color-secondary)] font-semibold rounded-full transition-all duration-200"
                    >
                        <IoPersonCircle />
                        Profiles
                    </p>

                    {/* Profile Info (toggleable) */}
                    {showDetails && (
                        <ol className="mt-2 px-2 rounded text-sm text-gray-700">
                            <li><strong>1. Email:</strong> {user?.email || "Not available"}</li>
                        </ol>
                    )}

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="mt-3 w-full flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
                    >
                        <IoMdLogOut />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
