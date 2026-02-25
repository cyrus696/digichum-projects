import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const EligibilityCalculator = () => {
    const [monthlyIncome, setMonthlyIncome] = useState(80000);
    const [age, setAge] = useState(30);
    const [existingEMI, setExistingEMI] = useState(10000);
    const [creditScore, setCreditScore] = useState(750);
    const [employmentType, setEmploymentType] = useState('salaried');

    // Calculate eligibility
    const calculateEligibility = () => {
        // Multiplier based on employment type
        const multiplier = employmentType === 'salaried' ? 60 : 48;

        // Age factor (younger age = longer tenure = higher eligibility)
        const ageFactor = age < 30 ? 1.1 : age < 40 ? 1.0 : age < 50 ? 0.9 : 0.8;

        // Credit score factor
        const creditFactor = creditScore >= 750 ? 1.0 : creditScore >= 700 ? 0.9 : 0.8;

        // Calculate net income available for EMI (60% of income minus existing EMI)
        const availableIncome = (monthlyIncome * 0.6) - existingEMI;

        // Calculate eligible loan amount
        const eligibleLoan = availableIncome * multiplier * ageFactor * creditFactor;

        // Calculate eligibility status
        const status = eligibleLoan > 1000000 ? 'High' : eligibleLoan > 500000 ? 'Moderate' : 'Low';

        return {
            eligibleLoan: Math.max(0, Math.round(eligibleLoan)),
            maxEMI: Math.round(availableIncome),
            status: status
        };
    };

    const result = calculateEligibility();

    const documents = [
        { category: "Identity Proof", items: ["Aadhaar Card", "PAN Card", "Passport", "Voter ID", "Driving License"] },
        { category: "Address Proof", items: ["Aadhaar Card", "Passport", "Utility Bills (not older than 3 months)", "Rent Agreement"] },
        { category: "Income Proof (Salaried)", items: ["Last 6 months salary slips", "Last 2 years Form 16", "Last 6 months bank statements"] },
        { category: "Income Proof (Self-Employed)", items: ["Last 2 years ITR with computation", "Last 6 months bank statements", "Business proof documents"] },
        { category: "Property Documents", items: ["Sale Agreement", "Property Tax Receipts", "Approved Building Plan", "NOC from Builder"] }
    ];

    return (
        <div className="font-sans text-gray-800 bg-white min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <div className="pt-[120px] pb-12 px-[6%] bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-[1200px] mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">Home Loan Eligibility Calculator</h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Check your home loan eligibility instantly based on your income and profile
                    </p>
                </div>
            </div>

            {/* Calculator Section */}
            <div className="px-[6%] pb-12">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Input Section */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Your Profile</h2>

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

                            {/* Age */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-sm font-medium text-gray-700">Your Age</label>
                                    <span className="text-lg font-semibold text-[#3E3D23]">{age} Years</span>
                                </div>
                                <input
                                    type="range"
                                    min="21"
                                    max="65"
                                    step="1"
                                    value={age}
                                    onChange={(e) => setAge(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#3E3D23]"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>21 Years</span>
                                    <span>65 Years</span>
                                </div>
                            </div>

                            {/* Existing EMI */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-sm font-medium text-gray-700">Existing EMI (if any)</label>
                                    <span className="text-lg font-semibold text-[#3E3D23]">₹ {existingEMI.toLocaleString('en-IN')}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100000"
                                    step="1000"
                                    value={existingEMI}
                                    onChange={(e) => setExistingEMI(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#3E3D23]"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>₹ 0</span>
                                    <span>₹ 1L</span>
                                </div>
                            </div>

                            {/* Credit Score */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-sm font-medium text-gray-700">Credit Score</label>
                                    <span className="text-lg font-semibold text-[#3E3D23]">{creditScore}</span>
                                </div>
                                <input
                                    type="range"
                                    min="300"
                                    max="900"
                                    step="10"
                                    value={creditScore}
                                    onChange={(e) => setCreditScore(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#3E3D23]"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>300</span>
                                    <span>900</span>
                                </div>
                            </div>

                            {/* Employment Type */}
                            <div className="mb-8">
                                <label className="text-sm font-medium text-gray-700 mb-3 block">Employment Type</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setEmploymentType('salaried')}
                                        className={`p-4 rounded-xl border-2 transition-all ${employmentType === 'salaried'
                                                ? 'border-[#3E3D23] bg-[#3E3D23]/5'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <p className="font-semibold text-gray-900">Salaried</p>
                                        <p className="text-xs text-gray-500 mt-1">Fixed monthly income</p>
                                    </button>
                                    <button
                                        onClick={() => setEmploymentType('self-employed')}
                                        className={`p-4 rounded-xl border-2 transition-all ${employmentType === 'self-employed'
                                                ? 'border-[#3E3D23] bg-[#3E3D23]/5'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <p className="font-semibold text-gray-900">Self-Employed</p>
                                        <p className="text-xs text-gray-500 mt-1">Business/Professional</p>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Result Section */}
                        <div className="bg-gradient-to-br from-[#3E3D23] to-[#2c2b19] p-8 rounded-2xl text-white shadow-lg">
                            <h2 className="text-2xl font-semibold mb-8">Your Eligibility</h2>

                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                                <p className="text-sm text-white/80 mb-2">Eligible Loan Amount</p>
                                <p className="text-4xl font-bold">₹ {result.eligibleLoan.toLocaleString('en-IN')}</p>
                                <div className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold ${result.status === 'High' ? 'bg-green-500' :
                                        result.status === 'Moderate' ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}>
                                    {result.status} Eligibility
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                                    <span className="text-white/80">Maximum EMI</span>
                                    <span className="font-semibold">₹ {result.maxEMI.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                                    <span className="text-white/80">Monthly Income</span>
                                    <span className="font-semibold">₹ {monthlyIncome.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                                    <span className="text-white/80">Existing EMI</span>
                                    <span className="font-semibold">₹ {existingEMI.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white/80">Credit Score</span>
                                    <span className="font-semibold">{creditScore}</span>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-white/10 rounded-lg">
                                <p className="text-xs text-white/70">
                                    * This is an indicative eligibility. Actual loan approval depends on lender's assessment, property value, and other factors.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Informational Sections */}
            <div className="px-[6%] pb-20 bg-gray-50">
                <div className="max-w-[900px] mx-auto py-16">

                    {/* What is Home Loan Eligibility */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-light text-gray-900 mb-6">What is Home Loan Eligibility?</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Home loan eligibility refers to the maximum loan amount that a financial institution is willing to lend you based on your financial profile, income, age, credit history, and existing liabilities. It determines whether you qualify for a home loan and how much you can borrow.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Banks and financial institutions assess your eligibility to ensure you can comfortably repay the loan without financial strain. A higher eligibility means you can afford a more expensive property, while lower eligibility may require you to increase your down payment or look for properties in a lower price range.
                        </p>
                    </div>

                    {/* How is it Calculated */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-light text-gray-900 mb-6">How is Home Loan Eligibility Calculated?</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Lenders use various factors to calculate your home loan eligibility. Here are the key components:
                        </p>
                        <div className="space-y-4">
                            <div className="bg-white p-6 rounded-xl border border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-2">1. Monthly Income</h3>
                                <p className="text-gray-600 text-sm">Your gross monthly income is the primary factor. Higher income means higher eligibility. For salaried individuals, basic salary + allowances are considered. For self-employed, average profit over the last 2-3 years is used.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-2">2. Age</h3>
                                <p className="text-gray-600 text-sm">Younger applicants get longer loan tenure (up to 30 years), increasing eligibility. Most banks have a maximum age limit of 60-65 years at loan maturity.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-2">3. Existing Obligations</h3>
                                <p className="text-gray-600 text-sm">Current EMIs, credit card dues, and other liabilities reduce your eligibility as they decrease your repayment capacity.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-2">4. Credit Score</h3>
                                <p className="text-gray-600 text-sm">A score of 750+ is considered excellent and can increase your eligibility. Lower scores may result in reduced loan amounts or higher interest rates.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-2">5. Employment Stability</h3>
                                <p className="text-gray-600 text-sm">Salaried individuals with stable employment get better eligibility. Self-employed need to show consistent business income for 2-3 years.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-2">6. FOIR (Fixed Obligation to Income Ratio)</h3>
                                <p className="text-gray-600 text-sm">Banks typically allow 50-60% of your monthly income for EMI. This ratio determines your maximum EMI capacity and thus loan eligibility.</p>
                            </div>
                        </div>
                    </div>

                    {/* Documents Required */}
                    <div>
                        <h2 className="text-3xl font-light text-gray-900 mb-6">Documents Required for Home Loan</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            To apply for a home loan, you'll need to submit various documents for verification. Here's a comprehensive list:
                        </p>
                        <div className="space-y-6">
                            {documents.map((doc, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200">
                                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <span className="w-8 h-8 bg-[#3E3D23] text-white rounded-full flex items-center justify-center text-sm">
                                            {idx + 1}
                                        </span>
                                        {doc.category}
                                    </h3>
                                    <ul className="space-y-2 ml-10">
                                        {doc.items.map((item, i) => (
                                            <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                                                <span className="text-[#3E3D23] mt-1">•</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                            <p className="text-sm text-blue-900">
                                <strong>Note:</strong> Document requirements may vary by lender. It's advisable to check with your specific bank or financial institution for their exact requirements. Keep all documents ready in original and photocopy format.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default EligibilityCalculator;
