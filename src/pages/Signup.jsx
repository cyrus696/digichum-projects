import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authBg from '../assets/backgrounds/auth-bg.webp';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!agreed) { setError('Please agree to the Terms & Privacy Policy.'); return; }
        if (password !== confirm) { setError('Passwords do not match.'); return; }
        if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
        // Demo signup — in a real app you'd call your backend here
        signup(name, email);
        navigate('/dashboard');
    };

    return (
        <section className="relative min-h-screen overflow-hidden flex max-md:flex-col">
            {/* Left Side (Background) */}
            <div
                className="w-full min-h-screen pt-8 bg-cover bg-center bg-fixed flex flex-col justify-start p-12 max-md:p-8 max-md:h-screen text-center relative"
                style={{ backgroundImage: `url(${authBg})` }}
            >
                <div className="absolute inset-0 bg-black/40 z-0"></div>
                <h1 className="relative z-10 text-[32px] text-white font-bold drop-shadow-lg mb-[30px]">Dwello Homes</h1>
            </div>

            {/* Right Side (Form) */}
            <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-[380px] bg-[#1c1c1df2] rounded-[14px] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.6)] z-20 max-md:top-[55%] max-md:w-[85%] max-md:max-w-[380px] max-lg:w-[60%]">
                <form className="w-full flex flex-col items-start text-white" onSubmit={handleSubmit}>
                    <h2 className="text-white mb-6 text-2xl font-bold">Create Account</h2>

                    {error && <p className="text-red-400 text-sm mb-4 w-full">{error}</p>}

                    <input
                        type="text" placeholder="Full Name" required
                        value={name} onChange={e => setName(e.target.value)}
                        className="w-full p-3 mb-4 border border-[#ccc] rounded-md text-white bg-transparent outline-none focus:border-blue-500"
                    />
                    <input
                        type="email" placeholder="Email Address" required
                        value={email} onChange={e => setEmail(e.target.value)}
                        className="w-full p-3 mb-4 border border-[#ccc] rounded-md text-white bg-transparent outline-none focus:border-blue-500"
                    />
                    <input
                        type="tel" placeholder="Phone Number" required
                        value={phone} onChange={e => setPhone(e.target.value)}
                        className="w-full p-3 mb-4 border border-[#ccc] rounded-md text-white bg-transparent outline-none focus:border-blue-500"
                    />
                    <input
                        type="password" placeholder="Password" required
                        value={password} onChange={e => setPassword(e.target.value)}
                        className="w-full p-3 mb-4 border border-[#ccc] rounded-md text-white bg-transparent outline-none focus:border-blue-500"
                    />
                    <input
                        type="password" placeholder="Confirm Password" required
                        value={confirm} onChange={e => setConfirm(e.target.value)}
                        className="w-full p-3 mb-4 border border-[#ccc] rounded-md text-white bg-transparent outline-none focus:border-blue-500"
                    />

                    <div className="flex items-center gap-2 text-xs mb-4 text-white whitespace-nowrap">
                        <input type="checkbox" id="terms" required checked={agreed} onChange={e => setAgreed(e.target.checked)} className="m-0" />
                        <label htmlFor="terms">I agree to the Terms &amp; Privacy Policy</label>
                    </div>

                    <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-lg text-base cursor-pointer hover:bg-blue-600 transition-colors">
                        Create Account
                    </button>

                    <p className="text-center w-full mt-5 text-white text-sm">
                        Already have an account? <Link to="/login" className="text-[#5656fb] font-medium no-underline hover:text-blue-400">Login</Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Signup;
