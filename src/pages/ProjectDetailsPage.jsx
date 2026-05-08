import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import project1 from '../assets/projects/project-1.webp';
import flatsImg from '../assets/properties/flats.webp';
import smallHouseImg from '../assets/properties/small-house.webp';
import { getProjectData } from '../data/projectsData';

const ProjectDetailsPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('overview');
    const [loanAmount, setLoanAmount] = useState(3000000);
    const [interestRate, setInterestRate] = useState(8.5);
    const [loanTenure, setLoanTenure] = useState(20);
    const navScrollRef = useRef(null);

    // Get project data based on ID
    const projectData = getProjectData(projectId);

    // Redirect if project not found
    useEffect(() => {
        if (!projectData) {
            navigate('/');
        }
    }, [projectData, navigate]);

    // Scroll-based section detection
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-150px 0px -50% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all sections
        const sections = document.querySelectorAll('[id]');
        sections.forEach((section) => {
            if (section.id && section.id !== '') {
                observer.observe(section);
            }
        });

        return () => {
            sections.forEach((section) => {
                if (section.id && section.id !== '') {
                    observer.unobserve(section);
                }
            });
        };
    }, []);

    // Auto-scroll navigation to show active section
    useEffect(() => {
        if (navScrollRef.current && activeSection) {
            const activeButton = navScrollRef.current.querySelector(`button[data-section="${activeSection}"]`);
            if (activeButton) {
                const container = navScrollRef.current;
                const buttonLeft = activeButton.offsetLeft;
                const buttonWidth = activeButton.offsetWidth;
                const containerWidth = container.offsetWidth;
                const scrollLeft = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);

                container.scrollTo({
                    left: scrollLeft,
                    behavior: 'smooth'
                });
            }
        }
    }, [activeSection]);

    // Horizontal scroll functions
    const scrollNav = (direction) => {
        if (navScrollRef.current) {
            const scrollAmount = 200;
            navScrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // Calculate EMI
    const calculateEMI = () => {
        const principal = loanAmount;
        const ratePerMonth = interestRate / 12 / 100;
        const numberOfMonths = loanTenure * 12;
        const emi = (principal * ratePerMonth * Math.pow(1 + ratePerMonth, numberOfMonths)) /
            (Math.pow(1 + ratePerMonth, numberOfMonths) - 1);
        return Math.round(emi);
    };

    const emi = calculateEMI();

    const sections = [
        { id: 'overview', label: 'Overview' },
        { id: 'highlights', label: 'Highlights' },
        { id: 'about', label: 'About Project' },
        { id: 'floor-plans', label: 'Floor Plans' },
        { id: 'virtual-tour', label: 'Virtual Tour' },
        { id: 'amenities', label: 'Amenities' },
        { id: 'reviews', label: 'Reviews' },
        { id: 'price-trends', label: 'Price Trends' },
        { id: 'brochure', label: 'Brochure' },
        { id: 'calculator', label: 'EMI Calculator' },
        { id: 'locality', label: 'Locality' },
        { id: 'compare', label: 'Compare' },
        { id: 'developer', label: 'Developer' },
        { id: 'qna', label: 'Q&A' },
        { id: 'faq', label: 'FAQ' },
        { id: 'similar', label: 'Similar Projects' },
        { id: 'news', label: 'News' }
    ];

    const amenities = [
        { name: "Swimming Pool", icon: "🏊" },
        { name: "Gymnasium", icon: "💪" },
        { name: "Kids Play Area", icon: "🎮" },
        { name: "Clubhouse", icon: "🏛️" },
        { name: "Landscaped Gardens", icon: "🌳" },
        { name: "Jogging Track", icon: "🏃" },
        { name: "Indoor Games", icon: "🎯" },
        { name: "Yoga/Meditation", icon: "🧘" },
        { name: "Party Hall", icon: "🎉" },
        { name: "Amphitheatre", icon: "🎭" },
        { name: "Sports Court", icon: "🏀" },
        { name: "Parking", icon: "🚗" }
    ];

    const reviews = [
        { name: "Rajesh Kumar", rating: 5, date: "Jan 2024", comment: "Excellent project with world-class amenities. The location is perfect and connectivity is great." },
        { name: "Priya Sharma", rating: 4, date: "Dec 2023", comment: "Good construction quality and spacious apartments. Possession was on time." },
        { name: "Amit Patel", rating: 5, date: "Nov 2023", comment: "Best investment decision. The property value has already appreciated significantly." }
    ];

    const faqs = [
        { q: "What is the RERA registration number?", a: "The project is registered under RERA with registration number: RERA-GRG-PROJ-123-2023" },
        { q: "What are the payment plans available?", a: "We offer flexible payment plans including construction-linked, down payment, and subvention schemes." },
        { q: "Is home loan assistance available?", a: "Yes, we have tie-ups with leading banks offering attractive interest rates and quick loan approvals." },
        { q: "What is the possession date?", a: "The project is ready to move. Immediate possession is available." }
    ];

    const similarProjects = [
        { name: "Emerald Hills", location: "Sector 65, Gurgaon", price: "₹ 3.1 Cr - 5.0 Cr", image: project1 },
        { name: "M3M Golfestate", location: "Sector 65, Gurgaon", price: "₹ 4.5 Cr+", image: flatsImg },
        { name: "DLF Cyber City", location: "Phase 3, Gurgaon", price: "₹ 1.8 Cr - 3.5 Cr", image: smallHouseImg }
    ];

    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 150;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };

    return (
        <div className="font-sans text-gray-800 bg-white min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <div className="pt-[120px] pb-8 px-[6%] bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="h-[400px] rounded-2xl overflow-hidden mb-4">
                                <img src={project1} alt={projectData.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <img src={flatsImg} alt="Gallery" className="h-[120px] w-full object-cover rounded-xl" />
                                <img src={smallHouseImg} alt="Gallery" className="h-[120px] w-full object-cover rounded-xl" />
                                <img src={project1} alt="Gallery" className="h-[120px] w-full object-cover rounded-xl" />
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 h-fit sticky top-[140px]">
                            <h1 className="text-3xl font-semibold text-gray-900 mb-2">{projectData.name}</h1>
                            <p className="text-gray-600 mb-4 flex items-center gap-2">
                                <span>📍</span> {projectData.location}
                            </p>
                            <div className="mb-6">
                                <p className="text-3xl font-bold text-[#3E3D23] mb-2">{projectData.price}</p>
                                <p className="text-sm text-gray-500">{projectData.area}</p>
                            </div>
                            <div className="space-y-3 mb-6 text-sm">
                                <div className="flex justify-between pb-2 border-b border-gray-100">
                                    <span className="text-gray-600">Status</span>
                                    <span className="font-semibold text-green-600">{projectData.status}</span>
                                </div>
                                <div className="flex justify-between pb-2 border-b border-gray-100">
                                    <span className="text-gray-600">Possession</span>
                                    <span className="font-semibold">{projectData.possession}</span>
                                </div>
                                <div className="flex justify-between pb-2 border-b border-gray-100">
                                    <span className="text-gray-600">Configurations</span>
                                    <span className="font-semibold">{projectData.configurations.join(', ')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">RERA</span>
                                    <span className="font-semibold text-xs">{projectData.rera}</span>
                                </div>
                            </div>
                            <button className="w-full bg-[#3E3D23] text-white py-3 rounded-xl font-medium hover:bg-[#2c2b19] transition-colors mb-3">
                                Contact Developer
                            </button>
                            <button className="w-full bg-white text-[#3E3D23] border-2 border-[#3E3D23] py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                                Schedule Site Visit
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Navigation */}
            <div className="sticky top-[72px] bg-white border-b border-gray-200 z-40 shadow-sm">
                <div className="px-[6%]">
                    <div className="max-w-[1400px] mx-auto relative">
                        {/* Left Scroll Button */}
                        <button
                            onClick={() => scrollNav('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition-colors"
                            aria-label="Scroll left"
                        >
                            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>

                        {/* Navigation Tabs */}
                        <div
                            ref={navScrollRef}
                            className="overflow-x-auto py-2 px-12"
                            style={{
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                                WebkitOverflowScrolling: 'touch'
                            }}
                        >
                            <style>{`
                                .overflow-x-auto::-webkit-scrollbar {
                                    display: none;
                                }
                            `}</style>
                            <div className="flex gap-1 w-max">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        data-section={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-lg transition-all duration-300 ${activeSection === section.id
                                            ? 'bg-[#3E3D23] text-white shadow-md scale-105'
                                            : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        {section.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right Scroll Button */}
                        <button
                            onClick={() => scrollNav('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition-colors"
                            aria-label="Scroll right"
                        >
                            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            <div className="px-[6%] py-12">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-12">

                            {/* Overview */}
                            <section id="overview" className="scroll-mt-32">
                                <h2 className="text-3xl font-semibold text-gray-900 mb-6">Overview</h2>
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <p className="text-gray-700 leading-relaxed">
                                        {projectData.description}
                                    </p>
                                </div>
                            </section>

                            {/* Highlights */}
                            <section id="highlights" className="scroll-mt-32">
                                <h2 className="text-3xl font-semibold text-gray-900 mb-6">Project Highlights</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {projectData.highlights && projectData.highlights.map((highlight, idx) => (
                                        <div key={idx} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                                            <span className="text-green-600 mt-1">✓</span>
                                            <p className="text-gray-700">{highlight}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* About Project */}
                            <section id="about" className="scroll-mt-32">
                                <h2 className="text-3xl font-semibold text-gray-900 mb-6">More About Project</h2>
                                <div className="space-y-4">
                                    <div className="bg-white border border-gray-200 p-6 rounded-xl">
                                        <h3 className="font-semibold text-gray-900 mb-3">Specifications</h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-gray-600">Total Area</p>
                                                <p className="font-semibold">{projectData.totalArea}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Total Units</p>
                                                <p className="font-semibold">{projectData.totalUnits}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Towers</p>
                                                <p className="font-semibold">{projectData.towers}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Floors</p>
                                                <p className="font-semibold">{projectData.floors}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Parking</p>
                                                <p className="font-semibold">Covered & Open</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Lifts</p>
                                                <p className="font-semibold">3 per tower</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Floor Plans */}
                            <section id="floor-plans" className="scroll-mt-32">
                                <h2 className="text-3xl font-semibold text-gray-900 mb-6">Floor Plans</h2>
                                <div className="space-y-4">
                                    <div className="bg-gray-50 p-6 rounded-xl">
                                        <h3 className="font-semibold text-gray-900 mb-4">3 BHK - 1850 sq.ft</h3>
                                        <div className="bg-white h-[300px] rounded-xl flex items-center justify-center border border-gray-200">
                                            <p className="text-gray-400">Floor plan image placeholder</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-6 rounded-xl">
                                        <h3 className="font-semibold text-gray-900 mb-4">4 BHK - 2800 sq.ft</h3>
                                        <div className="bg-white h-[300px] rounded-xl flex items-center justify-center border border-gray-200">
                                            <p className="text-gray-400">Floor plan image placeholder</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Virtual Tour */}
                            <section id="virtual-tour" className="scroll-mt-32">
                                <h2 className="text-3xl font-semibold text-gray-900 mb-6">Virtual Tour</h2>
                                <div className="bg-gray-900 h-[400px] rounded-xl flex items-center justify-center">
                                    <div className="text-center text-white">
                                        <p className="text-6xl mb-4">▶️</p>
                                        <p className="text-lg">360° Virtual Tour</p>
                                        <p className="text-sm text-gray-400 mt-2">Click to start the tour</p>
                                    </div>
                                </div>
                            </section>

                            {/* Amenities */}
                            <section id="amenities" className="scroll-mt-32">
                                <h2 className="text-3xl font-semibold text-gray-900 mb-6">Amenities</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {amenities.map((amenity, idx) => (
                                        <div key={idx} className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition-shadow">
                                            <div className="text-4xl mb-3">{amenity.icon}</div>
                                            <p className="text-sm font-medium text-gray-700">{amenity.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Reviews */}
                            <section id="reviews" className="scroll-mt-32">
                                <h2 className="text-3xl font-semibold text-gray-900 mb-6">Ratings & Reviews</h2>
                                <div className="bg-gray-50 p-6 rounded-xl mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="text-center">
                                            <p className="text-5xl font-bold text-[#3E3D23]">4.7</p>
                                            <p className="text-sm text-gray-600 mt-1">out of 5</p>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-yellow-500">★★★★★</span>
                                                <div className="flex-1 bg-gray-200 h-2 rounded-full">
                                                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                                                </div>
                                                <span className="text-sm text-gray-600">80%</span>
                                            </div>
                                            <p className="text-sm text-gray-600">Based on 150 reviews</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {reviews.map((review, idx) => (
                                        <div key={idx} className="bg-white border border-gray-200 p-6 rounded-xl">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <p className="font-semibold text-gray-900">{review.name}</p>
                                                    <p className="text-sm text-gray-500">{review.date}</p>
                                                </div>
                                                <div className="text-yellow-500">{'★'.repeat(review.rating)}</div>
                                            </div>
                                            <p className="text-gray-700">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Price Trends */}
                            <section id="price-trends" className="scroll-mt-32">
                                <h2 className="text-3xl font-semibold text-gray-900 mb-6">Price Trends</h2>
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <div className="mb-6">
                                        <p className="text-sm text-gray-600 mb-2">Average Price per sq.ft</p>
                                        <p className="text-3xl font-bold text-[#3E3D23]">₹ 13,500</p>
                                        <p className="text-sm text-green-600 mt-1">↑ 12% in last 6 months</p>
                                    </div>
                                    <div className="h-[200px] flex items-end justify-between gap-2">
                                        {[11000, 11500, 12000, 12500, 13000, 13500].map((price, idx) => (
                                            <div key={idx} className="flex-1 flex flex-col items-center">
                                                <div
                                                    className="w-full bg-gradient-to-t from-[#3E3D23] to-[#5a5838] rounded-t-lg"
                                                    style={{ height: `${(price / 13500) * 100}%` }}
                                                ></div>
                                                <p className="text-xs text-gray-600 mt-2">M{idx + 1}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Brochure */}
                            <section id="brochure" className="scroll-mt-32">
                                <h2 className="text-3xl font-semibold text-gray-900 mb-6">Download Brochure</h2>
                                <div className="bg-gradient-to-br from-[#3E3D23] to-[#2c2b19] p-8 rounded-xl text-white">
                                    <h3 className="text-2xl font-semibold mb-3">Get Complete Project Details</h3>
                                    <p className="text-white/80 mb-6">Download the detailed brochure with floor plans, pricing, and amenities</p>
                                    <button className="bg-white text-[#3E3D23] px-8 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors">
                                        📥 Download Brochure
                                    </button>
                                </div>
                            </section>

                            {/* EMI Calculator */}
                            <section id="calculator" className="scroll-mt-32">
                                <h2 className="text-3xl font-semibold text-gray-900 mb-6">EMI Calculator</h2>
                                <div className="bg-gray-50 p-8 rounded-xl">
                                    <div className="mb-6">
                                        <div className="flex justify-between items-center mb-3">
                                            <label className="text-sm font-medium text-gray-700">Loan Amount</label>
                                            <span className="text-lg font-semibold text-[#3E3D23]">₹ {loanAmount.toLocaleString('en-IN')}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="1000000"
                                            max="10000000"
                                            step="100000"
                                            value={loanAmount}
                                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#3E3D23]"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <div className="flex justify-between items-center mb-3">
                                            <label className="text-sm font-medium text-gray-700">Interest Rate</label>
                                            <span className="text-lg font-semibold text-[#3E3D23]">{interestRate}%</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="6"
                                            max="15"
                                            step="0.1"
                                            value={interestRate}
                                            onChange={(e) => setInterestRate(Number(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#3E3D23]"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <div className="flex justify-between items-center mb-3">
                                            <label className="text-sm font-medium text-gray-700">Loan Tenure</label>
                                            <span className="text-lg font-semibold text-[#3E3D23]">{loanTenure} Years</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="5"
                                            max="30"
                                            step="1"
                                            value={loanTenure}
                                            onChange={(e) => setLoanTenure(Number(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#3E3D23]"
                                        />
                                    </div>
                                    <div className="bg-white p-6 rounded-xl">
                                        <p className="text-sm text-gray-600 mb-2">Monthly EMI</p>
                                        <p className="text-4xl font-bold text-[#3E3D23]">₹ {emi.toLocaleString('en-IN')}</p>
                                    </div>
                                </div>
                            </section>

                            {/* Locality */}
                            <section id="locality" className="scroll-mt-32">
                                <h2 className="text-3xl font-semibold text-gray-900 mb-6">Locality Information</h2>
                                <div className="space-y-4">
                                    <div className="bg-gray-50 p-6 rounded-xl">
                                        <h3 className="font-semibold text-gray-900 mb-4">Nearby Places</h3>
                                        <div className="space-y-3">
                                            {projectData.nearbyPlaces && projectData.nearbyPlaces.length > 0 ? (
                                                projectData.nearbyPlaces.map((place, idx) => (
                                                    <div key={idx} className="flex justify-between items-center">
                                                        <span className="text-gray-700">{place.name}</span>
                                                        <span className="text-sm text-gray-600">{place.distance}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-gray-600">Nearby places information coming soon</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="bg-gray-200 h-[300px] rounded-xl flex items-center justify-center">
                                        <p className="text-gray-600">Map View</p>
                                    </div>
                                </div>
                            </section>

                            {/* Compare Properties */}
                            <section id="compare" className="scroll-mt-32">
                                <h2 className="text-3xl font-semibold text-gray-900 mb-6">Compare Properties</h2>
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <p className="text-gray-700 mb-4">Compare this project with similar properties in the area</p>
                                    <button className="bg-[#3E3D23] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#2c2b19] transition-colors">
                                        Compare Now
                                    </button>
                                </div>
                            </section>

                            {/* About Developer */}
                            <section id="developer" className="scroll-mt-32">
                                <h2 className="text-3xl font-semibold text-gray-900 mb-6">About Developer</h2>
                                <div className="bg-white border border-gray-200 p-8 rounded-xl">
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">{projectData.developer}</h3>
                                    <p className="text-gray-700 mb-6">
                                        DLF Limited is India's largest real estate company with over 75 years of experience. Known for delivering quality projects on time, DLF has developed residential, commercial, and retail properties across major cities in India.
                                    </p>
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                            <p className="text-3xl font-bold text-[#3E3D23]">75+</p>
                                            <p className="text-sm text-gray-600">Years Experience</p>
                                        </div>
                                        <div>
                                            <p className="text-3xl font-bold text-[#3E3D23]">300+</p>
                                            <p className="text-sm text-gray-600">Projects Delivered</p>
                                        </div>
                                        <div>
                                            <p className="text-3xl font-bold text-[#3E3D23]">50K+</p>
                                            <p className="text-sm text-gray-600">Happy Families</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Q&A */}
                            <section id="qna" className="scroll-mt-32">
                                <h2 className="text-3xl font-semibold text-gray-900 mb-6">Questions & Answers</h2>
                                <div className="bg-gray-50 p-6 rounded-xl mb-4">
                                    <textarea
                                        className="w-full p-4 border border-gray-300 rounded-xl resize-none"
                                        rows="3"
                                        placeholder="Ask a question about this project..."
                                    ></textarea>
                                    <button className="mt-3 bg-[#3E3D23] text-white px-6 py-2 rounded-xl font-medium hover:bg-[#2c2b19] transition-colors">
                                        Post Question
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-white border border-gray-200 p-6 rounded-xl">
                                        <p className="font-semibold text-gray-900 mb-2">Q: Is parking included in the price?</p>
                                        <p className="text-gray-700 text-sm">A: Yes, one covered parking space is included with each unit.</p>
                                    </div>
                                </div>
                            </section>

                            {/* FAQ */}
                            <section id="faq" className="scroll-mt-32">
                                <h2 className="text-3xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
                                <div className="space-y-4">
                                    {faqs.map((faq, idx) => (
                                        <details key={idx} className="bg-white border border-gray-200 rounded-xl p-6 cursor-pointer group">
                                            <summary className="font-semibold text-gray-900 list-none flex justify-between items-center">
                                                {faq.q}
                                                <span className="text-[#3E3D23] text-xl group-open:rotate-45 transition-transform">+</span>
                                            </summary>
                                            <p className="text-gray-600 mt-4 leading-relaxed">{faq.a}</p>
                                        </details>
                                    ))}
                                </div>
                            </section>

                            {/* Similar Projects */}
                            <section id="similar" className="scroll-mt-32">
                                <h2 className="text-3xl font-semibold text-gray-900 mb-6">Similar Projects</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {similarProjects.map((project, idx) => (
                                        <div key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                                            <img src={project.image} alt={project.name} className="w-full h-[180px] object-cover" />
                                            <div className="p-4">
                                                <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
                                                <p className="text-sm text-gray-600 mb-2">{project.location}</p>
                                                <p className="text-lg font-bold text-[#3E3D23]">{project.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* News */}
                            <section id="news" className="scroll-mt-32">
                                <h2 className="text-3xl font-semibold text-gray-900 mb-6">Related News</h2>
                                <div className="space-y-4">
                                    <div className="bg-white border border-gray-200 p-6 rounded-xl">
                                        <p className="text-sm text-gray-500 mb-2">Jan 15, 2024</p>
                                        <h3 className="font-semibold text-gray-900 mb-2">Gurgaon Real Estate Market Shows Strong Growth</h3>
                                        <p className="text-gray-700 text-sm">Property prices in Sector 58 have appreciated by 15% in the last year...</p>
                                    </div>
                                </div>
                            </section>

                        </div>

                        {/* Sidebar - Empty for now, can add widgets */}
                        <div className="hidden lg:block">
                            <div className="sticky top-[200px]">
                                {/* Additional widgets can go here */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProjectDetailsPage;
