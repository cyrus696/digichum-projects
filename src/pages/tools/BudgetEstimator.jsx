import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const BudgetEstimator = () => {
    const [area, setArea] = useState(1000);
    const [quality, setQuality] = useState('standard');

    const qualityMultipliers = {
        basic: { name: 'Basic', multiplier: 800, desc: 'Budget-friendly materials' },
        standard: { name: 'Standard', multiplier: 1500, desc: 'Good quality materials' },
        premium: { name: 'Premium', multiplier: 2500, desc: 'High-end luxury materials' }
    };

    const rooms = [
        { name: 'Living Room', basic: 150000, standard: 250000, premium: 400000 },
        { name: 'Bedrooms (per room)', basic: 100000, standard: 180000, premium: 300000 },
        { name: 'Kitchen', basic: 200000, standard: 350000, premium: 600000 },
        { name: 'Bathrooms (per bathroom)', basic: 80000, standard: 150000, premium: 250000 },
        { name: 'Dining Area', basic: 80000, standard: 140000, premium: 220000 },
        { name: 'Flooring', basic: 250, standard: 450, premium: 800, perSqFt: true },
        { name: 'Painting', basic: 30, standard: 50, premium: 80, perSqFt: true },
        { name: 'Electrical Work', basic: 150, standard: 250, premium: 400, perSqFt: true },
        { name: 'Plumbing', basic: 100, standard: 180, premium: 300, perSqFt: true },
    ];

    const calculateTotal = () => {
        let total = 0;
        rooms.forEach(room => {
            if (room.perSqFt) {
                total += room[quality] * area;
            } else {
                total += room[quality];
            }
        });
        return Math.round(total);
    };

    const totalEstimate = calculateTotal();

    return (
        <div className="font-sans text-gray-800 bg-white min-h-screen">
            <Navbar />

            <div className="pt-[120px] pb-12 px-[6%] bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-[1200px] mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">Interior Budget Estimator</h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Get an estimated cost for interior designing your home
                    </p>
                </div>
            </div>

            <div className="px-[6%] pb-20">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

                        {/* Area Input */}
                        <div className="lg:col-span-3 bg-white p-8 rounded-2xl border border-gray-200">
                            <div className="max-w-[600px] mx-auto">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-sm font-medium text-gray-700">Property Area (sq.ft)</label>
                                    <span className="text-2xl font-semibold text-[#3E3D23]">{area} sq.ft</span>
                                </div>
                                <input
                                    type="range"
                                    min="300"
                                    max="5000"
                                    step="50"
                                    value={area}
                                    onChange={(e) => setArea(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#3E3D23]"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>300 sq.ft</span>
                                    <span>5000 sq.ft</span>
                                </div>
                            </div>
                        </div>

                        {/* Quality Selection */}
                        {Object.entries(qualityMultipliers).map(([key, value]) => (
                            <div
                                key={key}
                                onClick={() => setQuality(key)}
                                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${quality === key
                                        ? 'border-[#3E3D23] bg-[#3E3D23]/5 shadow-md'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.name}</h3>
                                <p className="text-sm text-gray-600 mb-4">{value.desc}</p>
                                <p className="text-2xl font-bold text-[#3E3D23]">₹ {value.multiplier}/sq.ft</p>
                            </div>
                        ))}
                    </div>

                    {/* Itemized Breakdown */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-2xl border border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Cost Breakdown</h2>
                            <div className="space-y-3">
                                {rooms.map((room, idx) => (
                                    <div key={idx} className="flex justify-between items-center pb-3 border-b border-gray-100">
                                        <span className="text-sm text-gray-700">{room.name}</span>
                                        <span className="font-semibold text-gray-900">
                                            ₹ {(room.perSqFt ? room[quality] * area : room[quality]).toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#3E3D23] to-[#2c2b19] p-8 rounded-2xl text-white shadow-lg">
                            <h2 className="text-2xl font-semibold mb-6">Total Estimate</h2>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                                <p className="text-sm text-white/80 mb-2">Estimated Budget</p>
                                <p className="text-4xl font-bold">₹ {totalEstimate.toLocaleString('en-IN')}</p>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                                    <span className="text-white/80">Quality Level</span>
                                    <span className="font-semibold capitalize">{quality}</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                                    <span className="text-white/80">Property Area</span>
                                    <span className="font-semibold">{area} sq.ft</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white/80">Cost per sq.ft</span>
                                    <span className="font-semibold">₹ {Math.round(totalEstimate / area)}</span>
                                </div>
                            </div>
                            <div className="mt-6 p-4 bg-white/10 rounded-lg">
                                <p className="text-xs text-white/70">
                                    * This is an approximate estimate. Actual costs may vary based on location, materials, and contractor charges.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default BudgetEstimator;
