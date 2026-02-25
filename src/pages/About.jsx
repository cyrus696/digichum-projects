import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import cityImg from '../assets/backgrounds/City imag.webp';
import constructionImg from '../assets/backgrounds/Construction .webp';
import project1 from '../assets/projects/project-1.webp';
import project2 from '../assets/projects/project-2.webp';
import project3 from '../assets/projects/project-3.webp';
import businessImg from '../assets/misc/busuness planing .webp';

// ── Animated counter hook ──────────────────────────────────────────────────
function useCounter(target, duration = 2000, start = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [target, duration, start]);
    return count;
}

// ── Intersection observer hook ─────────────────────────────────────────────
function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [threshold]);
    return [ref, inView];
}

// ── Stat Card ──────────────────────────────────────────────────────────────
const StatCard = ({ value, suffix, label, start }) => {
    const count = useCounter(value, 2000, start);
    return (
        <div className="flex flex-col items-center">
            <span className="text-5xl md:text-6xl font-bold text-[#3E3D23]">
                {count.toLocaleString()}{suffix}
            </span>
            <span className="mt-2 text-gray-500 text-sm font-medium tracking-wide uppercase">{label}</span>
        </div>
    );
};

// ── Value Card ─────────────────────────────────────────────────────────────
const ValueCard = ({ icon, title, desc, delay }) => (
    <div
        className="group bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        style={{ transitionDelay: `${delay}ms` }}
    >
        <div className="w-12 h-12 rounded-xl bg-[#3E3D23]/10 flex items-center justify-center mb-5 group-hover:bg-[#3E3D23] transition-colors duration-300">
            <span className="text-2xl group-hover:grayscale-0 transition-all">{icon}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
);

// ── Team Member Card ───────────────────────────────────────────────────────
const TeamCard = ({ image, name, role, quote }) => (
    <div className="group text-center">
        <div className="relative w-36 h-36 mx-auto mb-4 rounded-full overflow-hidden shadow-lg ring-4 ring-white group-hover:ring-[#3E3D23]/30 transition-all duration-300">
            <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </div>
        <h4 className="font-semibold text-gray-800 text-base">{name}</h4>
        <p className="text-[#3E3D23] text-sm font-medium mb-2">{role}</p>
        <p className="text-gray-400 text-xs italic max-w-[200px] mx-auto leading-relaxed">"{quote}"</p>
    </div>
);

// ── Timeline Item ──────────────────────────────────────────────────────────
const TimelineItem = ({ year, title, desc, align }) => (
    <div className={`flex items-start gap-6 ${align === 'right' ? 'flex-row-reverse text-right' : ''}`}>
        <div className="flex-1">
            <span className="inline-block text-xs font-bold text-white bg-[#3E3D23] px-3 py-1 rounded-full mb-2">{year}</span>
            <h4 className="text-gray-800 font-semibold text-base mb-1">{title}</h4>
            <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
        </div>
        <div className="flex flex-col items-center pt-1">
            <div className="w-4 h-4 rounded-full bg-[#3E3D23] ring-4 ring-[#3E3D23]/20 shrink-0" />
            <div className="w-[2px] h-full bg-[#3E3D23]/20 mt-2" />
        </div>
        <div className="flex-1" />
    </div>
);

// ── Main Component ─────────────────────────────────────────────────────────
const About = () => {
    const [statsRef, statsInView] = useInView(0.2);
    const [valuesRef, valuesInView] = useInView(0.1);
    const [storyRef, storyInView] = useInView(0.15);

    const values = [
        { icon: '🏡', title: 'Transparency First', desc: 'Every transaction, every listing — we believe in full transparency so you can make decisions with complete confidence.' },
        { icon: '🤝', title: 'Client-Centric', desc: 'You are not just a customer. We build lasting relationships, guiding you at every step of your property journey.' },
        { icon: '🔍', title: 'Expert Research', desc: 'Our team dives deep into market data, neighbourhood trends, and investment signals to bring you the best opportunities.' },
        { icon: '⚡', title: 'Speed & Efficiency', desc: 'From search to sale, we streamline every step so you spend less time waiting and more time enjoying your new home.' },
        {
            icon: '🌱', title: 'Sustainable Living', desc: "We champion eco-friendly projects and green building practices, because tomorrow's homes should respect the planet."
        },
        { icon: '🛡️', title: 'Secure Transactions', desc: 'RERA-compliant listings, verified developers, and end-to-end legal support ensure your investment is always protected.' },
    ];

    const team = [
        { image: project1, name: 'Rahul Sharma', role: 'CEO & Founder', quote: 'Every family deserves a dream home.' },
        { image: project2, name: 'Priya Nair', role: 'Head of Sales', quote: 'We match people with places they love.' },
        { image: project3, name: 'Akash Verma', role: 'Lead Architect', quote: 'Design is the soul of every space.' },
        { image: businessImg, name: 'Sneha Patel', role: 'Client Relations', quote: 'A happy client is our greatest achievement.' },
    ];

    const milestones = [
        { year: '2015', title: 'Founded in Mumbai', desc: 'Dwello was born with a simple mission — make real estate transparent and accessible for everyone.' },
        { year: '2017', title: '1,000+ Successful Deals', desc: 'Crossed a monumental milestone as families across India started trusting Dwello for their property needs.' },
        { year: '2019', title: 'Expanded Pan-India', desc: 'Opened offices in Bangalore, Delhi NCR, Hyderabad, and Pune to better serve clients across the country.' },
        { year: '2022', title: 'Digital Platform Launch', desc: 'Launched our AI-powered search and smart tools, revolutionising how India buys and sells property online.' },
        { year: '2024', title: '10,000+ Happy Families', desc: 'Today, over ten thousand families call their Dwello-found homes their sanctuaries.' },
    ];

    return (
        <div className="font-sans text-gray-800 bg-white min-h-screen">
            <Navbar />

            {/* ── HERO ── */}
            <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
                <img
                    src={cityImg}
                    alt="City skyline"
                    className="absolute inset-0 w-full h-full object-cover scale-105"
                    style={{ filter: 'brightness(0.35)' }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

                <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
                    <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-white/60 mb-5 border border-white/20 px-5 py-2 rounded-full backdrop-blur-sm">
                        About Dwello
                    </span>
                    <h1 className="text-5xl md:text-7xl font-light leading-tight mb-6">
                        We Help You Find<br />
                        <span className="font-bold italic text-white">Where You Belong</span>
                    </h1>
                    <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                        Since 2015, Dwello has been India's most trusted real estate platform — connecting families, investors, and dream-seekers with the perfect property.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            to="/buy"
                            className="bg-[#3E3D23] hover:bg-[#2e2c18] text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-2xl hover:scale-105 no-underline"
                        >
                            Explore Properties
                        </Link>
                        <a
                            href="#our-story"
                            className="border border-white/40 hover:border-white text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-white/10 no-underline"
                        >
                            Our Story ↓
                        </a>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
                    <span className="text-xs tracking-widest uppercase">Scroll</span>
                    <div className="w-[1px] h-10 bg-white/20 animate-pulse" />
                </div>
            </section>

            {/* ── STATS ── */}
            <section ref={statsRef} className="py-20 px-[6%] bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
                    <StatCard value={10000} suffix="+" label="Happy Families" start={statsInView} />
                    <StatCard value={500} suffix="+" label="Verified Developers" start={statsInView} />
                    <StatCard value={25} suffix="+" label="Cities Covered" start={statsInView} />
                    <StatCard value={9} suffix="/10" label="Client Satisfaction" start={statsInView} />
                </div>
            </section>

            {/* ── OUR STORY ── */}
            <section id="our-story" ref={storyRef} className="py-24 px-[6%]">
                <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-center">
                    {/* Image collage */}
                    <div className="relative h-[480px]">
                        <img
                            src={constructionImg}
                            alt="Construction"
                            className="absolute top-0 left-0 w-[72%] h-[60%] object-cover rounded-2xl shadow-xl"
                        />
                        <img
                            src={businessImg}
                            alt="Business planning"
                            className="absolute bottom-0 right-0 w-[60%] h-[50%] object-cover rounded-2xl shadow-xl border-4 border-white"
                        />
                        {/* Accent badge */}
                        <div
                            className={`absolute bottom-16 left-0 bg-[#3E3D23] text-white rounded-2xl px-6 py-4 shadow-2xl transition-all duration-700 ${storyInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                            style={{ transitionDelay: '400ms' }}
                        >
                            <p className="text-3xl font-bold">9+</p>
                            <p className="text-xs text-white/70 uppercase tracking-wide">Years of Excellence</p>
                        </div>
                    </div>

                    {/* Text */}
                    <div className={`transition-all duration-700 ${storyInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#3E3D23] mb-4 block">Our Story</span>
                        <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
                            Built on <span className="font-bold">Trust</span> &amp;<br />Powered by <span className="font-bold">Passion</span>
                        </h2>
                        <p className="text-gray-500 leading-relaxed mb-5">
                            Dwello was founded in 2015 in Mumbai by a group of passionate real estate professionals who saw a common problem — buying a home was unnecessarily complicated, opaque, and stressful. We set out to change that.
                        </p>
                        <p className="text-gray-500 leading-relaxed mb-8">
                            Today, we operate across 25+ cities with a network of 500+ verified developers, offering everything from budget apartments to luxury villas, commercial spaces, and investment plots — all under one roof.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 text-gray-600 text-sm">
                                <span className="w-5 h-5 rounded-full bg-[#3E3D23] text-white text-xs flex items-center justify-center font-bold">✓</span>
                                RERA Compliant Listings
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 text-sm">
                                <span className="w-5 h-5 rounded-full bg-[#3E3D23] text-white text-xs flex items-center justify-center font-bold">✓</span>
                                Verified Developers
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 text-sm">
                                <span className="w-5 h-5 rounded-full bg-[#3E3D23] text-white text-xs flex items-center justify-center font-bold">✓</span>
                                Zero Hidden Fees
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── OUR VALUES ── */}
            <section ref={valuesRef} className="py-24 px-[6%] bg-gray-50/60">
                <div className="max-w-[1200px] mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#3E3D23] mb-3 block">What We Stand For</span>
                        <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                            Our Core <span className="font-bold">Values</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {values.map((v, i) => (
                            <div
                                key={i}
                                className={`transition-all duration-500 ${valuesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{ transitionDelay: `${i * 80}ms` }}
                            >
                                <ValueCard icon={v.icon} title={v.title} desc={v.desc} delay={i * 60} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── JOURNEY TIMELINE ── */}
            <section className="py-24 px-[6%]">
                <div className="max-w-[750px] mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#3E3D23] mb-3 block">Milestones</span>
                        <h2 className="text-4xl font-light text-gray-900">
                            Our <span className="font-bold">Journey</span>
                        </h2>
                    </div>
                    <div className="relative border-l-2 border-[#3E3D23]/20 ml-4 space-y-10 pl-8">
                        {milestones.map((m, i) => (
                            <div key={i} className="relative">
                                <div className="absolute -left-[43px] w-5 h-5 rounded-full bg-[#3E3D23] ring-4 ring-[#3E3D23]/15 top-1" />
                                <span className="inline-block text-xs font-bold text-white bg-[#3E3D23] px-3 py-1 rounded-full mb-2">{m.year}</span>
                                <h4 className="text-gray-800 font-semibold text-base mb-1">{m.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TEAM ── */}
            <section className="py-24 px-[6%] bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-[1100px] mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#3E3D23] mb-3 block">The People Behind Dwello</span>
                        <h2 className="text-4xl md:text-5xl font-light text-gray-900">
                            Meet Our <span className="font-bold">Team</span>
                        </h2>
                        <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
                            A passionate group of real estate experts, technologists, and client champions dedicated to making your property journey seamless.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                        {team.map((member, i) => (
                            <TeamCard key={i} {...member} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIAL BANNER ── */}
            <section className="py-20 px-[6%] bg-[#3E3D23]">
                <div className="max-w-[800px] mx-auto text-center text-white">
                    <svg className="w-10 h-10 text-white/30 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.36 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.36 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                    </svg>
                    <p className="text-2xl md:text-3xl font-light leading-relaxed mb-8 text-white/90 italic">
                        "Dwello made buying our first home an absolute breeze. The team's transparency and dedication gave us complete confidence every step of the way."
                    </p>
                    <div className="flex items-center justify-center gap-3">
                        <img src={project3} alt="Client" className="w-11 h-11 rounded-full object-cover border-2 border-white/30" />
                        <div className="text-left">
                            <p className="font-semibold text-sm text-white">Anjali & Rohan Mehta</p>
                            <p className="text-white/50 text-xs">Homeowners, Pune • 2024</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-24 px-[6%]">
                <div className="max-w-[1100px] mx-auto bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-100 shadow-sm p-12 md:p-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                        Ready to Find Your <span className="font-bold">Dream Home?</span>
                    </h2>
                    <p className="text-gray-500 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                        Browse thousands of verified properties across India, or list your own in just minutes.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            to="/buy"
                            className="bg-[#3E3D23] hover:bg-[#2e2c18] text-white px-10 py-3.5 rounded-full font-medium transition-all duration-300 hover:shadow-xl hover:scale-105 no-underline text-sm"
                        >
                            Browse Properties
                        </Link>
                        <Link
                            to="/sell/post-property"
                            className="border border-[#3E3D23] text-[#3E3D23] hover:bg-[#3E3D23] hover:text-white px-10 py-3.5 rounded-full font-medium transition-all duration-300 no-underline text-sm"
                        >
                            List Your Property
                        </Link>
                        <Link
                            to="/news"
                            className="border border-gray-200 text-gray-600 hover:border-[#3E3D23] hover:text-[#3E3D23] px-10 py-3.5 rounded-full font-medium transition-all duration-300 no-underline text-sm"
                        >
                            Read Our Blog
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
