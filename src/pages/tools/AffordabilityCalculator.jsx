import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const AffordabilityCalculator = () => {
    const [monthlyIncome, setMonthlyIncome] = useState(100000);
    const [monthlyExpenses, setMonthlyExpenses] = useState(40000);
    const [downPayment, setDownPayment] = useState(1000000);
    const [interestRate, setInterestRate] = useState(8.5);
    const [loanTenure, setLoanTenure] = useState(20);

    // Calculate affordable property price
    const calculateAffordability = () => {
        const monthlyIncome_num = monthlyIncome;
        const monthlyExpenses_num = monthlyExpenses;
        const availableForEMI = (monthlyIncome_num - monthlyExpenses_num) * 0.5; // 50% of surplus income

        // Calculate max loan amount based on EMI
        const ratePerMonth = interestRate / 12 / 100;
        const numberOfMonths = loanTenure * 12;

        const maxLoan = (availableForEMI * (Math.pow(1 + ratePerMonth, numberOfMonths) - 1)) /
            (ratePerMonth * Math.pow(1 + ratePerMonth, numberOfMonths));

        const affordablePrice = maxLoan + downPayment;

        return {
            affordablePrice: Math.round(affordablePrice),
            maxLoan: Math.round(maxLoan),
            emi: Math.round(availableForEMI)
        };
    };

    const result = calculateAffordability();

    return (
        <div className="font-sans text-gray-800 bg-white min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <div className="pt-[120px] pb-12 px-[6%] bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-[1200px] mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">Affordability Calculator</h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Find out how much property you can afford based on your income and expenses
                    </p>
                </div>
            </div>

            {/* Calculator Section */}
            <div className="px-[6%] pb-12">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Input Section */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Your Financial Details</h2>

                            {/* Monthly Income */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-sm font-medium text-gray-700">Monthly Income</label>
                                    <span className="text-lg font-semibold text-[#3E3D23]">₹ {monthlyIncome.toLocaleString('en-IN')}</span>
                                </div>
                                <input
                                    type="range"
                                    min="20000"
                                    max="500000"
                                    step="5000"
                                    value={monthlyIncome}
                                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#3E3D23]"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>₹ 20K</span>
                                    <span>₹ 5L</span>
                                </div>
                            </div>

                            {/* Monthly Expenses */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-sm font-medium text-gray-700">Monthly Expenses</label>
                                    <span className="text-lg font-semibold text-[#3E3D23]">₹ {monthlyExpenses.toLocaleString('en-IN')}</span>
                                </div>
                                <input
                                    type="range"
                                    min="10000"
                                    max="300000"
                                    step="5000"
                                    value={monthlyExpenses}
                                    onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#3E3D23]"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>₹ 10K</span>
                                    <span>₹ 3L</span>
                                </div>
                            </div>

                            {/* Down Payment */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-sm font-medium text-gray-700">Down Payment Available</label>
                                    <span className="text-lg font-semibold text-[#3E3D23]">₹ {downPayment.toLocaleString('en-IN')}</span>
                                </div>
                                <input
                                    type="range"
                                    min="100000"
                                    max="10000000"
                                    step="100000"
                                    value={downPayment}
                                    onChange={(e) => setDownPayment(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#3E3D23]"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>₹ 1L</span>
                                    <span>₹ 1Cr</span>
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
                                    min="5"
                                    max="30"
                                    step="1"
                                    value={loanTenure}
                                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#3E3D23]"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>5 Years</span>
                                    <span>30 Years</span>
                                </div>
                            </div>
                        </div>

                        {/* Result Section */}
                        <div className="bg-gradient-to-br from-[#3E3D23] to-[#2c2b19] p-8 rounded-2xl text-white shadow-lg">
                            <h2 className="text-2xl font-semibold mb-8">You Can Afford</h2>

                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                                <p className="text-sm text-white/80 mb-2">Property Price</p>
                                <p className="text-4xl font-bold">₹ {result.affordablePrice.toLocaleString('en-IN')}</p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                                    <span className="text-white/80">Maximum Loan Amount</span>
                                    <span className="font-semibold">₹ {result.maxLoan.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                                    <span className="text-white/80">Down Payment</span>
                                    <span className="font-semibold">₹ {downPayment.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                                    <span className="text-white/80">Estimated Monthly EMI</span>
                                    <span className="font-semibold">₹ {result.emi.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white/80">Surplus Income</span>
                                    <span className="font-semibold">₹ {(monthlyIncome - monthlyExpenses).toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-white/10 rounded-lg">
                                <p className="text-xs text-white/70">
                                    * This calculation assumes 50% of your surplus income can be used for EMI payments. Actual loan approval depends on various factors including credit score, employment stability, and lender policies.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Informational Sections */}
            <div className="px-[6%] pb-20 bg-gray-50">
                <div className="max-w-[900px] mx-auto py-16">

                    {/* What is Affordability Calculator */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-light text-gray-900 mb-6">What is an Affordability Calculator?</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            An affordability calculator is a financial tool that helps you determine how much property you can realistically afford to purchase based on your current financial situation. It takes into account your monthly income, existing expenses, available down payment, and loan parameters to calculate the maximum property price you should consider.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            This calculator uses the 50% rule, which suggests that your EMI should not exceed 50% of your surplus income (income minus expenses). This ensures you maintain a healthy financial balance while servicing your home loan.
                        </p>
                    </div>

                    {/* Benefits */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-light text-gray-900 mb-6">Benefits of Using an Affordability Calculator</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-xl border border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="text-green-600">✓</span> Realistic Budget Planning
                                </h3>
                                <p className="text-gray-600 text-sm">Helps you set a realistic budget and avoid overextending your finances.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="text-green-600">✓</span> Prevents Financial Stress
                                </h3>
                                <p className="text-gray-600 text-sm">Ensures your EMI is manageable and doesn't strain your monthly budget.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="text-green-600">✓</span> Better Property Search
                                </h3>
                                <p className="text-gray-600 text-sm">Narrows down your property search to options within your budget range.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="text-green-600">✓</span> Loan Approval Confidence
                                </h3>
                                <p className="text-gray-600 text-sm">Increases chances of loan approval by staying within affordable limits.</p>
                            </div>
                        </div>
                    </div>

                    {/* Factors that Affect Affordability */}
                    <div>
                        <h2 className="text-3xl font-light text-gray-900 mb-6">Factors that Affect Property Affordability</h2>
                        <div className="space-y-4">
                            <div className="bg-white p-6 rounded-xl border border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-2">1. Monthly Income</h3>
                                <p className="text-gray-600 text-sm">Higher income allows for larger EMI payments and thus more expensive properties. Include all stable sources of income.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-2">2. Existing Financial Obligations</h3>
                                <p className="text-gray-600 text-sm">Current EMIs, rent, insurance premiums, and other monthly expenses reduce your available surplus for home loan EMI.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-2">3. Down Payment</h3>
                                <p className="text-gray-600 text-sm">A larger down payment reduces the loan amount needed, making more expensive properties affordable. Aim for at least 20% down payment.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-2">4. Interest Rate</h3>
                                <p className="text-gray-600 text-sm">Lower interest rates mean lower EMIs, increasing your purchasing power. Even a 0.5% difference can significantly impact affordability.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-2">5. Loan Tenure</h3>
                                <p className="text-gray-600 text-sm">Longer tenure reduces monthly EMI but increases total interest paid. Balance between affordable EMI and total cost.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-2">6. Credit Score</h3>
                                <p className="text-gray-600 text-sm">A good credit score (750+) can help you negotiate better interest rates, improving your affordability.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AffordabilityCalculator;
