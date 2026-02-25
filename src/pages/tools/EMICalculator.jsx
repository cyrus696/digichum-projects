import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const EMICalculator = () => {
    const [loanAmount, setLoanAmount] = useState(5000000);
    const [interestRate, setInterestRate] = useState(8.5);
    const [loanTenure, setLoanTenure] = useState(20);

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
    const totalAmount = emi * loanTenure * 12;
    const totalInterest = totalAmount - loanAmount;

    const faqs = [
        {
            question: "What is EMI?",
            answer: "EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are used to pay off both interest and principal each month."
        },
        {
            question: "How is EMI calculated?",
            answer: "EMI is calculated using the formula: EMI = [P x R x (1+R)^N]/[(1+R)^N-1], where P = Principal loan amount, R = Rate of interest per month, N = Number of monthly installments."
        },
        {
            question: "Can I prepay my home loan?",
            answer: "Yes, most banks allow prepayment of home loans. However, some banks may charge a prepayment penalty. Check with your lender for specific terms."
        },
        {
            question: "What factors affect my EMI?",
            answer: "Your EMI is affected by three main factors: the loan amount (principal), the interest rate, and the loan tenure. Higher loan amounts and interest rates increase EMI, while longer tenure reduces it."
        },
        {
            question: "Is EMI tax deductible?",
            answer: "Yes, under Section 80C, you can claim deduction up to ₹1.5 lakh on principal repayment, and under Section 24(b), you can claim up to ₹2 lakh on interest paid for a self-occupied property."
        }
    ];

    return (
        <div className="font-sans text-gray-800 bg-white min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <div className="pt-[120px] pb-12 px-[6%] bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-[1200px] mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">EMI Calculator</h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Calculate your monthly home loan EMI and plan your finances better
                    </p>
                </div>
            </div>

            {/* Calculator Section */}
            <div className="px-[6%] pb-20">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Input Section */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Loan Details</h2>

                            {/* Loan Amount */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-sm font-medium text-gray-700">Loan Amount</label>
                                    <span className="text-lg font-semibold text-[#3E3D23]">₹ {loanAmount.toLocaleString('en-IN')}</span>
                                </div>
                                <input
                                    type="range"
                                    min="100000"
                                    max="50000000"
                                    step="100000"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#3E3D23]"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>₹ 1L</span>
                                    <span>₹ 5Cr</span>
                                </div>
                            </div>

                            {/* Interest Rate */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-sm font-medium text-gray-700">Interest Rate (p.a.)</label>
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
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>6%</span>
                                    <span>15%</span>
                                </div>
                            </div>

                            {/* Loan Tenure */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-sm font-medium text-gray-700">Loan Tenure</label>
                                    <span className="text-lg font-semibold text-[#3E3D23]">{loanTenure} Years</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="30"
                                    step="1"
                                    value={loanTenure}
                                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#3E3D23]"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>1 Year</span>
                                    <span>30 Years</span>
                                </div>
                            </div>
                        </div>

                        {/* Result Section */}
                        <div className="bg-gradient-to-br from-[#3E3D23] to-[#2c2b19] p-8 rounded-2xl text-white shadow-lg">
                            <h2 className="text-2xl font-semibold mb-8">Your EMI Breakdown</h2>

                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                                <p className="text-sm text-white/80 mb-2">Monthly EMI</p>
                                <p className="text-4xl font-bold">₹ {emi.toLocaleString('en-IN')}</p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                                    <span className="text-white/80">Principal Amount</span>
                                    <span className="font-semibold">₹ {loanAmount.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                                    <span className="text-white/80">Total Interest</span>
                                    <span className="font-semibold">₹ {totalInterest.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                                    <span className="text-white/80">Total Amount Payable</span>
                                    <span className="font-semibold">₹ {totalAmount.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white/80">Loan Tenure</span>
                                    <span className="font-semibold">{loanTenure} Years ({loanTenure * 12} Months)</span>
                                </div>
                            </div>

                            {/* Visual Breakdown */}
                            <div className="mt-8">
                                <p className="text-sm text-white/80 mb-3">Payment Breakdown</p>
                                <div className="flex h-4 rounded-full overflow-hidden">
                                    <div
                                        className="bg-green-400"
                                        style={{ width: `${(loanAmount / totalAmount) * 100}%` }}
                                        title="Principal"
                                    ></div>
                                    <div
                                        className="bg-orange-400"
                                        style={{ width: `${(totalInterest / totalAmount) * 100}%` }}
                                        title="Interest"
                                    ></div>
                                </div>
                                <div className="flex justify-between mt-2 text-xs">
                                    <span className="flex items-center gap-2">
                                        <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                                        Principal ({((loanAmount / totalAmount) * 100).toFixed(1)}%)
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <span className="w-3 h-3 bg-orange-400 rounded-full"></span>
                                        Interest ({((totalInterest / totalAmount) * 100).toFixed(1)}%)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-16">
                        <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
                        <div className="max-w-[900px] mx-auto space-y-4">
                            {faqs.map((faq, idx) => (
                                <details key={idx} className="bg-white border border-gray-200 rounded-xl p-6 cursor-pointer group">
                                    <summary className="font-semibold text-gray-900 list-none flex justify-between items-center">
                                        {faq.question}
                                        <span className="text-[#3E3D23] text-xl group-open:rotate-45 transition-transform">+</span>
                                    </summary>
                                    <p className="text-gray-600 mt-4 leading-relaxed">{faq.answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default EMICalculator;
