import { useContext, useState } from "react";
import { IoMdLogOut } from "react-icons/io"; // logout icon
import { IoPersonCircle } from "react-icons/io5"; // profile icon
import { AuthContext } from "../../Contexts/AuthContext.jsx";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const UserProfile = () => {
    const { userSignout, user } = useContext(AuthContext);
    const navigate = useNavigate(); const [isOpen, setIsOpen] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    // User logout Authentication
    const handleLogout = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, logout!',
            cancelButtonText: 'No, stay',
        });

        if (result.isConfirmed) {
            await userSignout();
            navigate('/login');
            setIsOpen(false);
            Swal.fire('Logged out!', 'You have been logged out successfully.', 'success');
        } else {
            // No action needed, alert will just close
            return;
        }
    };

    return (
        <div className="relative">
            {/* Small Profile Picture (trigger) */}
            <img
                src={user?.photoURL || "/default-user.png"}
                alt="User"
                className="w-12 h-12 rounded-full border-4 border-[var(--color-secondary-light)] cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            />

            {/* Sidebar Panel */}
            {isOpen && (
                <div className="absolute top-12 right-0 w-70 bg-[var(--color-bg)] shadow-sm shadow-red-300 rounded-xl p-4 z-50">
                    {/* Large Profile Picture */}
                    <div className="flex flex-col items-center gap-2">
                        <img
                            src={user?.photoURL || "/default-user.png"}
                            alt="Large User"
                            className="w-20 h-20 rounded-full border-4 border-[var(--color-secondary-light)]"
                        />
                        <h2 className="text-3xl font-semibold text-center text-[var(--color-primary)]"><span className="text-[var(--color-secondary)]">HI !!</span> <br /> {user?.displayName || "User"}🔥 </h2>
                        <p className="text-sm text-[var(--color-base-200)] text-center">Thanks for being with us 💕</p>
                    </div>

                    <hr className="my-4" />

                    {/* Profile Button */}
                    <p
                        onClick={() => setShowDetails(!showDetails)}
                        className="w-full text-lg flex items-center justify-start gap-2 text-left text-[var(--color-accent)] hover:text-[var(--color-secondary)] font-semibold rounded-full transition-all duration-200 cursor-pointer"
                    >
                        <IoPersonCircle />
                        Profiles
                    </p>

                    {/* Profile Info (toggleable) */}
                    {showDetails && (
                        <ol className="mt-1 px-2 rounded text-sm text-[var(--color-base-200)]">
                            <li><strong>1. </strong> {user?.email || "Not available"}</li>
                        </ol>
                    )}

                    {/* Logout Button */}
                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="mt-3 w-full flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition group"
                    >
                        <span className="font-semibold">Logout</span>
                        <IoMdLogOut
                            className="transition-transform duration-300 ease-in-out group-hover:translate-x-2"
                        />
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
