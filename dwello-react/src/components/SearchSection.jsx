import React, { useState } from 'react';

const SearchSection = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <section className="relative min-h-[100vh] bg-cover bg-center flex flex-col justify-center items-center py-[60px] px-[6%] max-md:min-h-[80vh]"
            style={{ backgroundImage: `url('/assets/search-bg.jpg')` }}
        >
            <div className="flex w-full justify-center gap-[14px] mb-[40px] max-md:flex-col max-md:items-center">
                <div className="relative w-full max-w-[600px]">
                    <input
                        type="text"
                        placeholder="Search property"
                        readOnly
                        onClick={() => setIsSearchOpen(true)}
                        className="w-full px-6 py-4 pl-12 text-base rounded-xl border-none outline-none shadow-lg cursor-pointer bg-white" />
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.5 9a7.5 7.5 0 010 7.5z" />
                    </svg>
                </div>
                <button className="px-8 py-4 bg-[#3E3D23] text-white border-none rounded-xl text-base cursor-pointer font-medium transition-colors hover:bg-[#2c2b19] max-md:w-full max-md:max-w-[600px]">
                    Search
                </button>
            </div>

            <div className="flex gap-5 w-full max-w-[1200px] justify-center flex-wrap">
                {['Location', 'Type', 'Commercial', 'Resenditials', 'Price Range'].map((label, index) => (
                    <select key={index} className="px-5 py-3.5 rounded-lg border-none text-[15px] bg-white text-[#555] outline-none min-w-[180px] shadow-lg cursor-pointer appearance-none bg-no-repeat bg-[right_0.7em_top_50%] max-md:w-full"
                        style={{ backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%22//www.w3.org/2000/svg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22/%3E%3C/svg%3E")`, backgroundSize: '.65em auto' }}
                    >
                        <option>{label}</option>
                        {/* Placeholder options mainly since this is UI migration */}
                        <option>Option 1</option>
                        <option>Option 2</option>
                    </select>
                ))}
            </div>

            {/* Overlay */}
            {isSearchOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[1500]"
                    onClick={() => setIsSearchOpen(false)}
                ></div>
            )}

            {/* Search Mega Menu */}
            <div className={`
                absolute top-[15%] left-1/2 -translate-x-1/2 w-[90%] max-w-[1000px] bg-white text-black rounded-xl shadow-2xl p-[30px] z-[2000]
                transition-all duration-300 ease-in-out
                ${isSearchOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}
                /* Mobile Overlay Fix */
                max-md:fixed max-md:top-0 max-md:left-0 max-md:translate-x-0 max-md:w-full max-md:h-full max-md:max-w-none max-md:rounded-none max-md:overflow-y-auto
            `}>
                <div className="flex justify-between items-center mb-5 border-b border-[#eee] pb-[15px]">
                    <input
                        type="text"
                        placeholder="Search by location, project, keyword..."
                        autoFocus
                        className="w-full border-none text-lg outline-none pr-5"
                    />
                    <span
                        className="text-2xl cursor-pointer text-[#888] hover:text-black"
                        onClick={() => setIsSearchOpen(false)}
                    >✕</span>
                </div>

                <div className="grid grid-cols-4 gap-5 max-md:grid-cols-1 max-md:gap-8">
                    <div className="flex flex-col">
                        <h4 className="text-sm text-[#888] mb-[15px] uppercase tracking-[0.5px]">For Rent</h4>
                        <ul className="list-none">
                            {['1 BHK', '2 BHK', '3 BHK', 'Flats', 'Offices', 'Floors'].map(item => (
                                <li key={item} className="mb-2.5 text-[15px] cursor-pointer text-[#333] hover:text-black hover:font-medium transition-colors">{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col">
                        <h4 className="text-sm text-[#888] mb-[15px] uppercase tracking-[0.5px]">To Buy</h4>
                        <ul className="list-none">
                            {['Flats', 'Villas', 'Homes', 'Farmhouses', 'Plots'].map(item => (
                                <li key={item} className="mb-2.5 text-[15px] cursor-pointer text-[#333] hover:text-black hover:font-medium transition-colors">{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col">
                        <h4 className="text-sm text-[#888] mb-[15px] uppercase tracking-[0.5px]">Sell</h4>
                        <ul className="list-none">
                            {['Flats', 'Homes', 'Farmhouses', 'Plots', 'Lands', 'Office'].map(item => (
                                <li key={item} className="mb-2.5 text-[15px] cursor-pointer text-[#333] hover:text-black hover:font-medium transition-colors">{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col">
                        <h4 className="text-sm text-[#888] mb-[15px] uppercase tracking-[0.5px]">For Builders / Dealers</h4>
                        <ul className="list-none">
                            {['Post Property', 'Dealer Services'].map(item => (
                                <li key={item} className="mb-2.5 text-[15px] cursor-pointer text-[#333] hover:text-black hover:font-medium transition-colors">{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SearchSection;
