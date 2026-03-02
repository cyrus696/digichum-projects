import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const HomeLoans = () => {
    const [selectedBank, setSelectedBank] = useState('All');

    const banks = ['All', 'SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak'];

    const loanOffers = [
        { bank: "SBI", rate: "8.50%", processing: "0.35%", tenure: "Up to 30 years", features: ["No prepayment charges", "Doorstep service", "Quick approval"], logo: "🏦" },
        { bank: "HDFC", rate: "8.60%", processing: "0.50%", tenure: "Up to 30 years", features: ["Flexible repayment", "Top-up loan facility", "Balance transfer"], logo: "🏦" },
        { bank: "ICICI", rate: "8.75%", processing: "0.50%", tenure: "Up to 30 years", features: ["Instant approval", "Minimal documentation", "Attractive rates for women"], logo: "🏦" },
        { bank: "Axis", rate: "8.70%", processing: "0.50%", tenure: "Up to 30 years", features: ["Quick disbursal", "Online application", "Special offers"], logo: "🏦" },
        { bank: "Kotak", rate: "8.65%", processing: "0.50%", tenure: "Up to 25 years", features: ["Competitive rates", "Easy documentation", "Fast processing"], logo: "🏦" },
        { bank: "PNB", rate: "8.55%", processing: "0.35%", tenure: "Up to 30 years", features: ["Low processing fee", "Government backed", "Reliable service"], logo: "🏦" },
    ];

    const filteredOffers = selectedBank === 'All' ? loanOffers : loanOffers.filter(offer => offer.bank === selectedBank);

    const faqs = [
        { q: "What is the minimum income required for a home loan?", a: "Most banks require a minimum monthly income of ₹25,000 for salaried individuals and ₹2-3 lakhs annual income for self-employed." },
        { q: "Can I get a home loan with a low credit score?", a: "While possible, a credit score below 650 may result in higher interest rates or lower loan amounts. A score of 750+ is ideal." },
        { q: "What is the maximum loan tenure?", a: "Most banks offer home loans for up to 30 years, but the actual tenure depends on your age and repayment capacity." },
        { q: "Are there any tax benefits on home loans?", a: "Yes, you can claim deductions under Section 80C (principal) and Section 24(b) (interest) of the Income Tax Act." },
    ];

    return (
        <div className="font-sans text-gray-800 bg-white min-h-screen">
            <Navbar />

            <div className="pt-[120px] pb-12 px-[6%] bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-[1200px] mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">Home Loan Offers</h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Compare the best home loan offers from top banks and choose the right one for you
                    </p>
                </div>
            </div>

            {/* Filter */}
            <div className="px-[6%] pb-8">
                <div className="max-w-[1200px] mx-auto">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {banks.map((bank) => (
                            <button
                                key={bank}
                                onClick={() => setSelectedBank(bank)}
                                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${selectedBank === bank
                                        ? 'bg-[#3E3D23] text-white shadow-md'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:border-[#3E3D23]'
                                    }`}
                            >
                                {bank}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Loan Offers */}
            <div className="px-[6%] pb-12">
                <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredOffers.map((offer, idx) => (
                        <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-4xl">{offer.logo}</span>
                                    <h3 className="text-xl font-semibold text-gray-900">{offer.bank}</h3>
                                </div>
                            </div>
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                    <span className="text-sm text-gray-600">Interest Rate</span>
                                    <span className="font-semibold text-[#3E3D23]">{offer.rate}</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                    <span className="text-sm text-gray-600">Processing Fee</span>
                                    <span className="font-semibold">{offer.processing}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Max Tenure</span>
                                    <span className="font-semibold">{offer.tenure}</span>
                                </div>
                            </div>
                            <div className="mb-6">
                                <p className="text-xs font-semibold text-gray-700 mb-2">Key Features:</p>
                                <ul className="space-y-1">
                                    {offer.features.map((feature, i) => (
                                        <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                                            <span className="text-green-600 mt-0.5">✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button className="w-full bg-[#3E3D23] text-white py-3 rounded-xl font-medium hover:bg-[#2c2b19] transition-colors">
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Comparison Table */}
            <div className="px-[6%] pb-12 bg-gray-50">
                <div className="max-w-[1200px] mx-auto py-12">
                    <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">Quick Comparison</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-xl overflow-hidden border border-gray-200">
                            <thead className="bg-[#3E3D23] text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left">Bank</th>
                                    <th className="px-6 py-4 text-left">Interest Rate</th>
                                    <th className="px-6 py-4 text-left">Processing Fee</th>
                                    <th className="px-6 py-4 text-left">Max Tenure</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loanOffers.map((offer, idx) => (
                                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="px-6 py-4 font-semibold">{offer.bank}</td>
                                        <td className="px-6 py-4 text-[#3E3D23] font-semibold">{offer.rate}</td>
                                        <td className="px-6 py-4">{offer.processing}</td>
                                        <td className="px-6 py-4">{offer.tenure}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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

export default HomeLoans;
