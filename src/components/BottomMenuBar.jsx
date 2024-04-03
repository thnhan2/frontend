import React, { useState } from 'react';
import { Menu, Bag2, Stickynote, ProfileCircle } from 'iconsax-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
function MenuBarItem({ icon, label, onClick, badge }) {
    const badgeStyle =
        badge > 0 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500';
    return (
        <button
            style={{ boxSizing: 'border-box' }}
            onClick={onClick}
            className="relative flex flex-col items-center justify-center focus:outline-none"
        >
            <div className="icon-bg rounded-full mb-1 flex items-center justify-center">
                {icon}
            </div>
            {badge > 0 && (
                <span
                    className={`absolute -top-2 -right-2 rounded-full w-4 h-4 text-xs flex items-center justify-center ${badgeStyle}`}
                >
                    {badge}
                </span>
            )}
            <span className="text-xs">{label}</span>
        </button>
    );
}
function BottomMenuBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleMenuItemClick = (path) => {
        navigate(path);
    };

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderCount = orders.length;

    return (
        <nav className="fixed bottom-0 right-0 flex items-center justify-end p-4">
            <div className="relative">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="bg-blue-500 text-white rounded-full p-3 focus:outline-none z-10"
                    style={{ borderColor: 'green', borderWidth: 2 }}
                >
                    <FaPlus color="currentColor" size={24} />
                </button>
                {isMenuOpen && (
                    <div className="absolute bottom-full mb-4 flex flex-col items-center space-y-4">
                        <MenuBarItem
                            icon={<Menu size="24" color="currentColor" />}
                            label="Menu"
                            onClick={() => handleMenuItemClick('/home')}
                            badge={0}
                            style={{ borderColor: 'green', borderWidth: 2 }}
                        />
                        <MenuBarItem
                            icon={<Bag2 size="24" color="currentColor" />}
                            label="Orders"
                            onClick={() => handleMenuItemClick('/orders')}
                            badge={orderCount}
                            style={{ borderColor: 'green', borderWidth: 2 }}
                        />
                        <MenuBarItem
                            icon={<Stickynote size="24" color="currentColor" />}
                            label="Notes"
                            onClick={() => handleMenuItemClick('/notes')}
                            badge={0}
                            style={{ borderColor: 'green', borderWidth: 2 }}
                        />
                        <MenuBarItem
                            icon={
                                <ProfileCircle size="24" color="currentColor" />
                            }
                            label="Profile"
                            onClick={() => handleMenuItemClick('/profile')}
                            badge={0}
                            style={{ borderColor: 'green', borderWidth: 2 }}
                        />
                    </div>
                )}
            </div>
        </nav>
    );
}
export default BottomMenuBar;
