import React, { useState } from 'react';
import { Home, Bag2, Stickynote, ProfileCircle } from 'iconsax-react';
import { useNavigate, useLocation } from 'react-router-dom';

function MenuBarItem({ icon, label, onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center justify-center focus:outline-none"
        >
            {icon}
            <span className="text-xs">{label}</span>
        </button>
    );
}

function BottomMenuBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuItemClick = (path) => {
        if (location.pathname === path) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate(path);
        }
    };

    return (
        <nav className="fixed bottom-4 right-4">
            <div className="relative">
                <button
                    onClick={toggleMenu}
                    className="bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                </button>
                {isMenuOpen && (
                    <div className="absolute bottom-full left-0 mb-3 bg-white shadow-lg rounded-md p-4">
                        <div className="py-1">
                            <MenuBarItem
                                icon={<Home size={24} />}
                                label="Home"
                                onClick={() => handleMenuItemClick('/home')}
                            />
                            <MenuBarItem
                                icon={<Bag2 size={24} />}
                                label="Bag"
                                onClick={handleMenuItemClick}
                            />
                            <MenuBarItem
                                icon={<Stickynote size={24} />}
                                label="Notes"
                                onClick={handleMenuItemClick}
                            />
                            <MenuBarItem
                                icon={<ProfileCircle size={24} />}
                                label="Profile"
                                onClick={handleMenuItemClick}
                            />
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default BottomMenuBar;
