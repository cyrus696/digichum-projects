import React from 'react';
import { Link } from 'react-router-dom';

const AdviceTools = () => {
    const tools = [
        {
            title: "EMI Calculator",
            desc: "Know how much you'll have to pay every month.",
            link: "/tools/emi-calculator",
            icon: (
                <svg className="w-8 h-8 text-[#3E3D23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
            ),
            action: "Calculate Now"
        },
        {
            title: "Home Loans",
            desc: "View best home loan offers from top banks.",
            link: "/tools/home-loans",
            icon: (
                <svg className="w-8 h-8 text-[#3E3D23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
            ),
            action: "View Offers"
        },
        {
            title: "Interior Budget",
            desc: "Estimate the cost of interior designing your home.",
            link: "/tools/budget-estimator",
            icon: (
                <svg className="w-8 h-8 text-[#3E3D23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
            ),
            action: "Get Estimate"
        },
        {
            title: "Rates & Trends",
            desc: "Check property rates and trends in your city.",
            link: "/tools/rates-trends",
            icon: (
                <svg className="w-8 h-8 text-[#3E3D23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
            ),
            action: "Check Trends"
        },
        {
            title: "Buying Guide",
            desc: "Complete guide for first-time home buyers.",
            link: "/tools/buying-guide",
            icon: (
                <svg className="w-8 h-8 text-[#3E3D23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
            ),
            action: "Read Guide"
        },
        {
            title: "Affordability Calculator",
            desc: "Find out how much property you can afford.",
            link: "/tools/affordability-calculator",
            icon: (
                <svg className="w-8 h-8 text-[#3E3D23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            ),
            action: "Calculate"
        },
        {
            title: "Eligibility Calculator",
            desc: "Check your home loan eligibility instantly.",
            link: "/tools/eligibility-calculator",
            icon: (
                <svg className="w-8 h-8 text-[#3E3D23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            ),
            action: "Check Eligibility"
        }
    ];

    return (
        <section className="py-20 px-[6%] bg-gray-50 text-black">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex justify-between items-end mb-12 max-md:flex-col max-md:items-start max-md:gap-4">
                    <div>
                        <h2 className="text-4xl font-thin mb-3">Advice & Tools</h2>
                        <p className="text-gray-500 max-w-lg">Everything you need to make the right decision.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tools.map((tool, idx) => (
                        <Link key={idx} to={tool.link} className="block bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-start gap-4">
                            <div className="p-3 bg-gray-50 rounded-xl mb-2">
                                {tool.icon}
                            </div>
                            <h3 className="text-xl font-medium">{tool.title}</h3>
                            <p className="text-gray-500 text-sm mb-4 leading-relaxed">{tool.desc}</p>
                            <span className="text-sm font-semibold text-[#3E3D23] mt-auto flex items-center gap-2 group">
                                {tool.action}
                                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AdviceTools;
