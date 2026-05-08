import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0f1311] text-gray-300 py-16 px-6 sm:px-10 lg:px-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        
        {/* Column 1: Brand & About */}
        <div className="flex flex-col gap-6">
          <Link to="/" className="text-3xl font-bold text-white tracking-wide">
            Dwello
          </Link>
          <p className="text-sm text-white/60 leading-relaxed">
            Your trusted partner in finding the perfect home. We make real estate easy, transparent, and seamless for everyone.
          </p>
          <div className="flex flex-col gap-3 mt-2">
            <a href="tel:+12462324444" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-3">
              <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              +1 246 232 4444
            </a>
            <a href="mailto:DwelloHomes@gmail.com" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-3">
              <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              DwelloHomes@gmail.com
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="flex flex-col gap-4">
            <li>
              <Link to="/" className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-transform inline-block">Home</Link>
            </li>
            <li>
              <Link to="/about" className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-transform inline-block">About Us</Link>
            </li>
            <li>
              <Link to="/buy" className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-transform inline-block">Properties</Link>
            </li>
            <li>
              <a href="#Contact-us" className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-transform inline-block">Contact</a>
            </li>
          </ul>
        </div>

        {/* Column 3: Tools & Resources */}
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-semibold text-white">Tools & Resources</h3>
          <ul className="flex flex-col gap-4">
            <li>
              <Link to="/tools/emi-calculator" className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-transform inline-block">EMI Calculator</Link>
            </li>
            <li>
              <Link to="/tools/affordability-calculator" className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-transform inline-block">Affordability Calculator</Link>
            </li>
            <li>
              <Link to="/tools/buying-guide" className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-transform inline-block">Buying Guide</Link>
            </li>
            <li>
              <Link to="/tools/home-loans" className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-transform inline-block">Home Loans</Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter & Social */}
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-semibold text-white">Newsletter</h3>
          <p className="text-sm text-white/60">Subscribe to get the latest property news and updates.</p>
          <form className="flex mt-2" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-white/5 border border-white/10 text-white placeholder-white/50 text-sm rounded-l-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-r-lg text-sm font-medium transition-colors"
            >
              Subscribe
            </button>
          </form>
          
          <div className="mt-4 flex gap-3 items-center">
            {/* Facebook */}
            <a href="#" className="bg-white/5 border border-white/10 p-2 rounded-full text-white/60 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all hover:-translate-y-1">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2.04C6.5 2.04 2 6.53 2 12C2 16.53 5.38 20.32 9.69 21.67V14.65H7.7V12H9.69V10.23C9.69 8.35 10.89 7.29 12.63 7.29C13.46 7.29 14.18 7.35 14.18 7.35V9.19H13.25C12.31 9.19 12 9.78 12 10.37V12H13.97L13.67 14.65H12V21.67C16.31 20.32 19.69 16.53 19.69 12C19.69 6.53 15.19 2.04 12 2.04Z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="bg-white/5 border border-white/10 p-2 rounded-full text-white/60 hover:text-white hover:bg-blue-500 hover:border-blue-500 transition-all hover:-translate-y-1">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="bg-white/5 border border-white/10 p-2 rounded-full text-white/60 hover:text-white hover:bg-pink-600 hover:border-pink-600 transition-all hover:-translate-y-1">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
              </svg>
            </a>
            {/* Twitter / X */}
            <a href="#" className="bg-white/5 border border-white/10 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/20 hover:border-white/20 transition-all hover:-translate-y-1">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z" />
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-white/50 text-center md:text-left">
          &copy; {new Date().getFullYear()} Dwello. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link to="#" className="text-sm text-white/50 hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="#" className="text-sm text-white/50 hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
