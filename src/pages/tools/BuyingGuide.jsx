import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const BuyingGuide = () => {
    const steps = [
        {
            step: 1,
            title: "Assess Your Financial Situation",
            desc: "Determine your budget, check credit score, and calculate how much you can afford",
            checklist: ["Check credit score", "Calculate monthly budget", "Save for down payment", "Get pre-approved for loan"]
        },
        {
            step: 2,
            title: "Research & Shortlist Properties",
            desc: "Identify preferred locations, property types, and create a shortlist",
            checklist: ["Define requirements (BHK, area, amenities)", "Research neighborhoods", "Check connectivity and infrastructure", "Shortlist 5-10 properties"]
        },
        {
            step: 3,
            title: "Property Visits & Inspection",
            desc: "Visit shortlisted properties and conduct thorough inspections",
            checklist: ["Schedule site visits", "Check construction quality", "Verify amenities", "Inspect legal documents"]
        },
        {
            step: 4,
            title: "Legal Verification",
            desc: "Verify all legal documents and ensure clear title",
            checklist: ["Title deed verification", "Check for encumbrances", "Verify RERA registration", "Review sale agreement"]
        },
        {
            step: 5,
            title: "Loan Application",
            desc: "Apply for home loan and complete documentation",
            checklist: ["Compare loan offers", "Submit application", "Provide required documents", "Get loan sanction letter"]
        },
        {
            step: 6,
            title: "Negotiation & Booking",
            desc: "Negotiate price and book the property",
            checklist: ["Negotiate final price", "Pay booking amount", "Sign booking agreement", "Get payment receipt"]
        },
        {
            step: 7,
            title: "Registration & Possession",
            desc: "Complete registration and take possession",
            checklist: ["Pay stamp duty and registration fees", "Register property", "Complete final payment", "Take possession"]
        }
    ];

    const tips = [
        { title: "Location is Key", desc: "Choose a location with good connectivity, infrastructure, and future growth potential" },
        { title: "Check Builder Reputation", desc: "Research the builder's track record, previous projects, and customer reviews" },
        { title: "Verify Legal Documents", desc: "Always verify all legal documents through a lawyer before making any payment" },
        { title: "Don't Rush", desc: "Take your time to research, compare, and make an informed decision" },
        { title: "Hidden Costs", desc: "Factor in registration, stamp duty, maintenance, and other hidden costs" },
        { title: "Future Resale Value", desc: "Consider the property's potential for appreciation and resale value" }
    ];

    const faqs = [
        { q: "What documents should I check before buying?", a: "Title deed, sale deed, encumbrance certificate, property tax receipts, approved building plan, completion certificate, and RERA registration." },
        { q: "How much should I pay as down payment?", a: "Typically 20% of the property value. Higher down payment reduces loan amount and EMI burden." },
        { q: "What is RERA and why is it important?", a: "RERA (Real Estate Regulatory Authority) protects homebuyers' interests. Always buy RERA-registered properties for legal protection." },
        { q: "Should I buy under-construction or ready-to-move property?", a: "Under-construction is cheaper but has completion risk. Ready-to-move is costlier but offers immediate possession and no construction delays." }
    ];

    return (
        <div className="font-sans text-gray-800 bg-white min-h-screen">
            <Navbar />

            <div className="pt-[120px] pb-12 px-[6%] bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-[1200px] mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">Home Buying Guide</h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        A complete step-by-step guide for first-time home buyers
                    </p>
                </div>
            </div>

            {/* Steps */}
            <div className="px-[6%] pb-12">
                <div className="max-w-[900px] mx-auto">
                    <h2 className="text-3xl font-light text-gray-900 mb-8">Step-by-Step Process</h2>
                    <div className="space-y-6">
                        {steps.map((item, idx) => (
                            <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all">
                                <div className="flex items-start gap-6">
                                    <div className="flex-shrink-0 w-16 h-16 bg-[#3E3D23] text-white rounded-full flex items-center justify-center text-2xl font-bold">
                                        {item.step}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                                        <p className="text-gray-600 mb-4">{item.desc}</p>
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <p className="text-sm font-semibold text-gray-700 mb-2">Checklist:</p>
                                            <ul className="space-y-1">
                                                {item.checklist.map((check, i) => (
                                                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                                        <span className="text-green-600 mt-0.5">✓</span>
                                                        {check}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tips */}
            <div className="px-[6%] pb-12 bg-gray-50">
                <div className="max-w-[1200px] mx-auto py-12">
                    <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">Expert Tips</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tips.map((tip, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                    <span className="text-[#3E3D23]">💡</span>
                                    {tip.title}
                                </h3>
                                <p className="text-sm text-gray-600">{tip.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ */}
            <div className="px-[6%] pb-20">
                <div className="max-w-[900px] mx-auto">
                    <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
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
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default BuyingGuide;
