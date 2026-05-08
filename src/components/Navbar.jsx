import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const { wishlist } = useWishlist();
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleContactClick = (e) => {
        e.preventDefault();
        if (location.pathname === '/') {
            // Already on home page, just scroll
            const el = document.getElementById('Contact-us');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Navigate to home, then scroll after page loads
            navigate('/');
            setTimeout(() => {
                const el = document.getElementById('Contact-us');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    };

    // TODO: Replace this with actual authentication logic
    // For now, set to false to show Login/Sign Up buttons
    // Set to true to show Profile dropdown
    // const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
        setIsProfileOpen(false);
    }, [location]);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isProfileOpen && !event.target.closest('.profile-dropdown')) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isProfileOpen]);

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
        navigate('/');
    };

    return (
        <header
            className={`fixed top-0 left-1/2 -translate-x-1/2 max-w-7xl w-full flex justify-between items-center z-[1000] transition-all duration-300 ease-in-out px-8 py-4
            bg-black/40 backdrop-blur-md border-b border-white/10
            ${scrolled ? 'shadow-lg bg-black/60' : ''}
            max-md:px-6 max-md:w-full
            `}
        >
            {/* Logo - Always visible */}
            <Link to="/" className="flex items-center gap-2 group">
                <div className="text-2xl font-bold tracking-wide text-white transition-all duration-300 group-hover:text-blue-400">
                    Dwello
                </div>
            </Link>

            {/* Mobile Icons Container */}
            <div className="hidden max-md:flex items-center gap-5 z-[1001]">
                {/* Mobile Wishlist Icon */}
                <Link to="/dashboard" className="relative flex items-center justify-center no-underline" title="My Wishlist">
                    <svg className={`w-[22px] h-[22px] transition-colors ${wishlist.length > 0 ? 'fill-red-500 text-red-500' : 'fill-transparent text-white/90'}`} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {wishlist.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                            {wishlist.length}
                        </span>
                    )}
                </Link>

                {/* Hamburger Icon */}
                <div
                    className="flex flex-col gap-[5px] cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className={`w-[25px] h-[2px] bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
                    <span className={`w-[25px] h-[2px] bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`w-[25px] h-[2px] bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
                </div>
            </div>

            {/* Nav Links - Center */}
            <nav className={`
                flex items-center gap-8
                max-md:fixed max-md:top-[70px] max-md:right-[20px] max-md:w-[280px] max-md:bg-[#0f1311]/95 max-md:backdrop-blur-[10px] 
                max-md:flex-col max-md:p-6 max-md:gap-4 max-md:rounded-xl max-md:shadow-2xl max-md:z-[1002]
                max-md:transition-all max-md:duration-300 max-md:origin-top-right max-md:border max-md:border-white/10
                ${isOpen ? 'max-md:opacity-100 max-md:visible max-md:scale-100' : 'max-md:opacity-0 max-md:invisible max-md:scale-75'}
            `}>
                <Link to="/" className="text-white/90 no-underline text-sm font-medium hover:text-white relative group transition-colors duration-300 max-md:w-full max-md:text-base max-md:border-b max-md:border-white/10 max-md:pb-3">
                    Home
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full max-md:hidden"></span>
                </Link>
                <Link to="/rent" className="text-white/90 no-underline text-sm font-medium hover:text-white relative group transition-colors duration-300 max-md:w-full max-md:text-base max-md:border-b max-md:border-white/10 max-md:pb-3">
                    Rent
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full max-md:hidden"></span>
                </Link>
                <Link to="/buy" className="text-white/90 no-underline text-sm font-medium hover:text-white relative group transition-colors duration-300 max-md:w-full max-md:text-base max-md:border-b max-md:border-white/10 max-md:pb-3">
                    Buy
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full max-md:hidden"></span>
                </Link>
                <Link to="/sell" className="text-white/90 no-underline text-sm font-medium hover:text-white relative group transition-colors duration-300 max-md:w-full max-md:text-base max-md:border-b max-md:border-white/10 max-md:pb-3">
                    Sell
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full max-md:hidden"></span>
                </Link>
                <button onClick={handleContactClick} className="text-white/90 bg-transparent border-none cursor-pointer text-sm font-medium hover:text-white relative group transition-colors duration-300 max-md:w-full max-md:text-base max-md:border-b max-md:border-white/10 max-md:pb-3 max-md:text-left">
                    Contact
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full max-md:hidden"></span>
                </button>
                <Link to="/about" className="text-white/90 no-underline text-sm font-medium hover:text-white relative group transition-colors duration-300 max-md:w-full max-md:text-base max-md:pb-3">
                    About
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full max-md:hidden"></span>
                </Link>

                {/* Mobile Auth Section */}
                <div className="hidden max-md:flex max-md:flex-col max-md:w-full max-md:gap-3 max-md:mt-2 max-md:pt-4 max-md:border-t max-md:border-white/10">
                    {!isAuthenticated ? (
                        <>
                            <Link to="/login" className="text-white/90 no-underline text-base font-medium hover:text-white transition-colors duration-300 text-center py-2">
                                Login
                            </Link>
                            <Link to="/signup" className="bg-blue-500 hover:bg-blue-600 text-white no-underline text-base font-medium transition-all duration-300 py-2.5 rounded-lg text-center shadow-md">
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/dashboard" className="text-white/90 no-underline text-base font-medium hover:text-white transition-colors duration-300 text-center py-2">
                                Dashboard
                            </Link>
                            <button onClick={handleLogout} className="text-white/90 text-base font-medium hover:text-white transition-colors duration-300 text-center py-2 bg-transparent border-none cursor-pointer">
                                Logout
                            </button>
                        </>
                    )}
                    {/* Builder Portal — always visible in mobile menu */}
                    <div className="pt-3 border-t border-white/10">
                        <Link
                            to="/builder/login"
                            className="flex items-center justify-center gap-2 no-underline text-amber-400 font-semibold text-sm py-2.5 rounded-lg border border-amber-400/30 hover:bg-amber-400/10 transition-all duration-300"
                        >
                            🏗️ Builder / Developer Portal
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Right Section - Auth Buttons or Profile (Desktop) */}
            <div className="flex items-center gap-4 max-md:hidden">
                <Link to="/builder/login"
                    className="text-amber-400 no-underline text-xs font-semibold hover:text-amber-300 transition-colors duration-300 px-3 py-1.5 rounded-lg border border-amber-400/30 hover:border-amber-400/60 hover:bg-amber-400/10"
                    title="Builder & Developer Portal"
                >
                    🏗️ For Builders
                </Link>

                {/* Desktop Wishlist Icon */}
                <Link to="/dashboard" className="relative flex items-center justify-center no-underline mx-2" title="My Wishlist">
                    <svg className={`w-5 h-5 transition-colors ${wishlist.length > 0 ? 'fill-red-500 text-red-500' : 'fill-transparent text-white/80 hover:text-white'}`} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {wishlist.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                            {wishlist.length}
                        </span>
                    )}
                </Link>

                {!isAuthenticated ? (
                    // Show Login/Sign Up buttons when not authenticated
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="text-white/90 no-underline text-sm font-medium hover:text-white transition-colors duration-300 px-4 py-2">
                            Login
                        </Link>
                        <Link to="/signup" className="bg-blue-500 hover:bg-blue-600 text-white no-underline text-sm font-medium transition-all duration-300 px-5 py-2 rounded-lg shadow-md hover:shadow-lg">
                            Sign Up
                        </Link>
                    </div>
                ) : (
                    // Show Profile dropdown when authenticated
                    <div className="relative profile-dropdown">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors group bg-transparent border-none cursor-pointer"
                        >
                            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:border-white/40 transition-all font-bold text-sm">
                                {user?.initials || '?'}
                            </div>
                        </button>

                        {/* Dropdown Menu */}
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-[#0f1311]/95 backdrop-blur-md rounded-lg shadow-xl border border-white/10 overflow-hidden">
                                {/* User info header */}
                                <div className="px-4 py-3 border-b border-white/10">
                                    <p className="text-white font-semibold text-sm">{user?.name}</p>
                                    <p className="text-white/50 text-xs truncate">{user?.email}</p>
                                </div>
                                <Link
                                    to="/dashboard"
                                    className="block px-4 py-3 text-white/90 hover:bg-white/10 hover:text-white transition-colors no-underline text-sm"
                                    onClick={() => setIsProfileOpen(false)}
                                >
                                    <div className="flex items-center gap-3">
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                                        </svg>
                                        Dashboard
                                    </div>
                                </Link>
                                <div className="border-t border-white/10"></div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-3 text-white/90 hover:bg-white/10 hover:text-white transition-colors text-sm bg-transparent border-none cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                                        </svg>
                                        Logout
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Mobile background overlay for menu */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[1000] md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </header>
    );
};

export default Navbar;
