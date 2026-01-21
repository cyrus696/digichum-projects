import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <section className="relative min-h-screen overflow-hidden flex max-md:flex-col">
            {/* Left Side (Background) */}
            <div
                className="w-full min-h-screen pt-20 bg-cover bg-center bg-fixed flex flex-col justify-start p-12 max-md:p-8 max-md:h-screen text-center relative"
                style={{ backgroundImage: `url('/assets/auth-bg.jpg')` }}
            >
                <div className="absolute inset-0 bg-black/40 z-0"></div>
                <h1 className="relative z-10 text-[42px] text-white font-bold drop-shadow-lg mb-[50px]">Dwello Homes</h1>
            </div>

            {/* Right Side (Form) */}
            <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-[380px] bg-[#1c1c1df2] rounded-[14px] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.6)] z-20 max-md:top-1/2 max-md:w-[85%] max-md:max-w-[380px] max-lg:w-[60%]">
                <form className="w-full flex flex-col items-start text-white">
                    <h2 className="text-white mb-6 text-2xl font-bold">Login</h2>

                    <input type="email" placeholder="Email Address" required className="w-full p-3 mb-4 border border-[#ccc] rounded-md text-white outline-none focus:border-blue-500" />
                    <input type="password" placeholder="Password" required className="w-full p-3 mb-4 border border-[#ccc] rounded-md text-white outline-none focus:border-blue-500" />

                    <div className="flex items-center gap-2 text-xs mb-4 text-white whitespace-nowrap">
                        <input type="checkbox" id="terms" className="m-0" />
                        <label htmlFor="terms">I agree to the Terms & Privacy Policy</label>
                    </div>

                    <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-lg text-base cursor-pointer hover:bg-blue-600 transition-colors">
                        Sign in
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 w-full my-5 text-[#aaa] text-sm">
                        <span className="flex-1 h-[1px] bg-[#555]"></span>
                        <p className="m-0">or</p>
                        <span className="flex-1 h-[1px] bg-[#555]"></span>
                    </div>

                    {/* Google Button */}
                    <button type="button" className="w-full p-3 bg-white text-black rounded-lg flex items-center justify-center gap-2.5 text-[15px] cursor-pointer hover:bg-gray-100 transition-colors">
                        <img src="/assets/search.png" alt="Google" className="w-[18px] h-[18px]" />
                        Sign in with Google
                    </button>

                    <p className="text-center w-full mt-5 text-[#aaa] text-sm">
                        Need an account? <Link to="/signup" className="text-blue-500 font-medium no-underline hover:text-blue-400">Create one</Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Login;
