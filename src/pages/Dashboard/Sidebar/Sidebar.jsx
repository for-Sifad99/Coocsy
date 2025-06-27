import React, { useContext, useState } from 'react';
import { FaBars, FaList, FaPlus, FaThLarge, FaTimes } from 'react-icons/fa';
import { IoMdLogOut } from 'react-icons/io';
import { Link, NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../../Contexts/AuthContext';
import Swal from 'sweetalert2';

const Sidebar = () => {
    const { user, userSignout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    // User logout function
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
        }
    };

    const navItems = [
        { name: 'Overview', icon: <FaThLarge />, path: '/dash/overview' },
        { name: 'All Items', icon: <FaList />, path: '/dash/allItems' },
        { name: 'Add Items', icon: <FaPlus />, path: '/dash/addItems' },
        { name: 'My Items', icon: <FaList />, path: '/dash/myItems' },
    ];

    // Navbar links active style here
    const activeStyle = ({ isActive }) =>
        ` flex items-center gap-3 py-2 px-6 border-2  hover:border-[#101f23] hover:bg-[#101f23] hover:text-white rounded-full transition ${isActive ? 'bg-[#101f23] text-white hover:border-[#101f23]' : "text-[#101f23] bg-white border-gray-300"}`;

    return (
        <div>
            {/* Hamburger Menu */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden focus:outline-none p-2 mr-5 text-[#101f23] border border-gray-300 hover:bg-[#101f23] hover:text-white  transition-all duration-500 rounded-full"
            >
                <FaBars size={16} />
            </button>
            {/* Sidebar */}
            <div
                className={`min-h-screen bg-white w-64 space-y-6 py-7 px-2 absolute md:relative md:translate-x-0 top-0 left-0 rounded-xl z-10 transform ${isOpen ? 'translate-x-0' : '-translate-x-70'
                    } transition-transform duration-200 ease-in-out`}
            >
                <div className='flex justify-between items-center'>
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold px-4">
                        🍔 CookApp
                    </Link>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden focus:outline-none p-1 mr-5 text-[#101f23] border border-gray-300 hover:bg-[#101f23] hover:text-white  transition-all duration-500 rounded-full"
                    >
                        <FaTimes size={16}/>
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-2 mt-8 px-4">
                    {navItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={activeStyle}
                        >
                            {item.icon}
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                {/* Bottom User Info */}
                <div className="absolute bottom-3 left-3 right-4 p-2 bg-[var(--color-section-bg)] rounded-lg flex items-center justify-between gap-2 text-sm">
                    <img
                        src={user?.photoURL || 'https://i.pravatar.cc/40'}
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                        <p className="font-semibold text-black">{user?.displayName || 'Mr. Or Mss. User'}</p>
                        <p className="text-xs text-gray-700 truncate">{user?.email || 'theuser@gmail.com'}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-red-400 hover:text-red-500 transition"
                        title="Logout"
                    >
                        <IoMdLogOut size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
