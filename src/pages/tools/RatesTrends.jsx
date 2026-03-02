import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const RatesTrends = () => {
    const [selectedCity, setSelectedCity] = useState('Mumbai');
    const [selectedType, setSelectedType] = useState('Residential');

    const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai'];
    const propertyTypes = ['Residential', 'Commercial', 'Plots'];

    const trendData = {
        Mumbai: { current: 18500, change: '+12%', avgPrice: '₹ 1.2 Cr', demand: 'High' },
        Delhi: { current: 12000, change: '+8%', avgPrice: '₹ 95 L', demand: 'High' },
        Bangalore: { current: 8500, change: '+15%', avgPrice: '₹ 75 L', demand: 'Very High' },
        Hyderabad: { current: 6500, change: '+18%', avgPrice: '₹ 60 L', demand: 'High' },
        Pune: { current: 7200, change: '+10%', avgPrice: '₹ 68 L', demand: 'Moderate' },
        Chennai: { current: 6800, change: '+7%', avgPrice: '₹ 62 L', demand: 'Moderate' }
    };

    const historicalData = [
        { year: '2019', price: 5200 },
        { year: '2020', price: 5500 },
        { year: '2021', price: 6200 },
        { year: '2022', price: 7100 },
        { year: '2023', price: 7800 },
        { year: '2024', price: trendData[selectedCity].current }
    ];

    const insights = [
        { title: "Market Growth", desc: "Property prices have shown consistent growth over the past 5 years", icon: "📈" },
        { title: "High Demand Areas", desc: "IT hubs and metro cities continue to see strong demand", icon: "🏙️" },
        { title: "Investment Opportunity", desc: "Tier-2 cities offering better ROI for investors", icon: "💰" },
        { title: "Future Outlook", desc: "Experts predict 8-10% annual growth in major cities", icon: "🔮" }
    ];

    const maxPrice = Math.max(...historicalData.map(d => d.price));

    return (
        <div className="font-sans text-gray-800 bg-white min-h-screen">
            <Navbar />

            <div className="pt-[120px] pb-12 px-[6%] bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-[1200px] mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">Property Rates & Trends</h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Track historical property prices and market trends across major cities
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="px-[6%] pb-8">
                <div className="max-w-[1200px] mx-auto">
                    <div className="flex flex-wrap gap-3 justify-center mb-4">
                        {cities.map((city) => (
                            <button
                                key={city}
                                onClick={() => setSelectedCity(city)}
                                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${selectedCity === city
                                        ? 'bg-[#3E3D23] text-white shadow-md'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:border-[#3E3D23]'
                                    }`}
                            >
                                {city}
                            </button>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {propertyTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${selectedType === type
                                        ? 'bg-[#3E3D23] text-white shadow-md'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:border-[#3E3D23]'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Current Stats */}
            <div className="px-[6%] pb-12">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                        <div className="bg-white p-6 rounded-2xl border border-gray-200">
                            <p className="text-sm text-gray-600 mb-2">Current Rate/sq.ft</p>
                            <p className="text-3xl font-bold text-[#3E3D23]">₹ {trendData[selectedCity].current.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-200">
                            <p className="text-sm text-gray-600 mb-2">YoY Change</p>
                            <p className="text-3xl font-bold text-green-600">{trendData[selectedCity].change}</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-200">
                            <p className="text-sm text-gray-600 mb-2">Avg Property Price</p>
                            <p className="text-3xl font-bold text-gray-900">{trendData[selectedCity].avgPrice}</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-200">
                            <p className="text-sm text-gray-600 mb-2">Market Demand</p>
                            <p className="text-3xl font-bold text-blue-600">{trendData[selectedCity].demand}</p>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-white p-8 rounded-2xl border border-gray-200 mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Historical Price Trends</h2>
                        <div className="h-[300px] flex items-end justify-between gap-4">
                            {historicalData.map((data, idx) => (
                                <div key={idx} className="flex-1 flex flex-col items-center">
                                    <div className="w-full bg-gradient-to-t from-[#3E3D23] to-[#5a5838] rounded-t-lg transition-all hover:opacity-80"
                                        style={{ height: `${(data.price / maxPrice) * 100}%` }}
                                    ></div>
                                    <p className="text-xs font-semibold text-gray-900 mt-4">{data.year}</p>
                                    <p className="text-xs text-gray-600">₹ {data.price.toLocaleString('en-IN')}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Market Insights */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Market Insights</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {insights.map((insight, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all">
                                    <div className="text-4xl mb-4">{insight.icon}</div>
                                    <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
                                    <p className="text-sm text-gray-600">{insight.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default RatesTrends;
