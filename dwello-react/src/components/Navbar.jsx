import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

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
    }, [location]);

    return (
        <header
            className={`fixed top-0 w-full flex justify-between items-center z-50 transition-all duration-300 ease-in-out px-[13%] py-6
            ${scrolled
                    ? 'mx-auto left-0 right-0 mt-5 w-fit justify-center rounded-full bg-black/60 backdrop-blur-[15px] shadow-lg py-3 px-10'
                    : 'bg-transparent'
                }
            /* Mobile specifics override */
            max-md:px-[30px] max-md:py-5
            max-md:scrolled:w-full max-md:scrolled:mt-5 max-md:scrolled:mx-auto max-md:scrolled:left-0 max-md:scrolled:right-0 max-md:scrolled:rounded-none max-md:scrolled:bg-transparent max-md:scrolled:backdrop-blur-none max-md:scrolled:shadow-none
            `}
        >
            {/* Logo - Hidden on desktop scroll, but maybe keep visible on mobile? 
                Original CSS hides it on scroll. 
            */}
            <div className={`text-[22px] font-semibold tracking-[0.3ch] transition-all duration-300
                ${scrolled ? 'opacity-0 invisible w-0 m-0 overflow-hidden max-md:visible max-md:opacity-100 max-md:w-auto' : 'text-white'}
            `}>
                Dwello
            </div>

            {/* Hamburger Icon (Mobile) */}
            <div
                className={`hidden max-md:flex flex-col gap-[5px] cursor-pointer z-[1001]
                ${scrolled ? 'fixed top-[25px] right-[20px]' : ''}
                `}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={`w-[25px] h-[2px] bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
                <span className={`w-[25px] h-[2px] bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-[25px] h-[2px] bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
            </div>

            {/* Nav Links */}
            <nav className={`
                flex items-center
                max-md:fixed max-md:top-[70px] max-md:right-[20px] max-md:w-[250px] max-md:bg-[#0f1311]/95 max-md:backdrop-blur-[10px] 
                max-md:flex-col max-md:p-5 max-md:gap-[15px] max-md:rounded-xl max-md:shadow-2xl 
                max-md:transition-all max-md:duration-300 max-md:origin-top-right
                ${isOpen ? 'max-md:opacity-100 max-md:visible max-md:scale-100' : 'max-md:opacity-0 max-md:invisible max-md:scale-75'}
            `}>
                <Link to="/" className="text-[#ddd] no-underline ml-7 text-sm pb-1.5 hover:text-white relative group transition-colors duration-300 max-md:m-0 max-md:text-lg max-md:w-full max-md:border-b max-md:border-white/10 max-md:p-2">
                    Home
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full max-md:hidden"></span>
                </Link>
                <Link to="/rent" className="text-[#ddd] no-underline ml-7 text-sm pb-1.5 hover:text-white relative group transition-colors duration-300 max-md:m-0 max-md:text-lg max-md:w-full max-md:border-b max-md:border-white/10 max-md:p-2">
                    Rent
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full max-md:hidden"></span>
                </Link>
                <Link to="/buy" className="text-[#ddd] no-underline ml-7 text-sm pb-1.5 hover:text-white relative group transition-colors duration-300 max-md:m-0 max-md:text-lg max-md:w-full max-md:border-b max-md:border-white/10 max-md:p-2">
                    Buy
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full max-md:hidden"></span>
                </Link>
                <Link to="/sell" className="text-[#ddd] no-underline ml-7 text-sm pb-1.5 hover:text-white relative group transition-colors duration-300 max-md:m-0 max-md:text-lg max-md:w-full max-md:border-b max-md:border-white/10 max-md:p-2">
                    Sell
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full max-md:hidden"></span>
                </Link>
                <a href="#Contact-us" className="text-[#ddd] no-underline ml-7 text-sm pb-1.5 hover:text-white relative group transition-colors duration-300 max-md:m-0 max-md:text-lg max-md:w-full max-md:border-b max-md:border-white/10 max-md:p-2">
                    Contact
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full max-md:hidden"></span>
                </a>
                <Link to="/about" className="text-[#ddd] no-underline ml-7 text-sm pb-1.5 hover:text-white relative group transition-colors duration-300 max-md:m-0 max-md:text-lg max-md:w-full max-md:border-b-0 max-md:p-2">
                    About
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full max-md:hidden"></span>
                </Link>
            </nav>

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
