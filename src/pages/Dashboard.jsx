import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const { wishlist, removeFromWishlist } = useWishlist();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Wishlist');

    const savedSearches = [
        { query: "3 BHK in Mumbai", date: "2 days ago" },
        { query: "Villas under 5 Cr", date: "1 week ago" },
    ];

    const contacts = [
        { name: "Rajesh Kumar", property: "Dream Villa", date: "Yesterday", status: "Pending" },
        { name: "Amit Singh", property: "Sea View Apt", date: "3 days ago", status: "Contacted" },
    ];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="font-sans text-gray-800 bg-gray-50 min-h-screen flex flex-col">
            <Navbar />

            <div className="pt-[120px] px-[6%] flex-grow flex flex-col md:flex-row gap-8 max-w-[1400px] mx-auto w-full pb-20">

                {/* Sidebar */}
                <div className="w-full md:w-[280px] flex-shrink-0">
                    <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-[120px]">
                        {/* User Avatar & Name */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 rounded-full bg-[#3E3D23] text-white flex items-center justify-center text-2xl font-bold">
                                {user?.initials || '?'}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{user?.name || 'Guest'}</h3>
                                <p className="text-gray-500 text-sm">{user?.email || ''}</p>
                            </div>
                        </div>

                        <nav className="space-y-2">
                            {['Wishlist', 'Saved Searches', 'Contacted Properties', 'Settings'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`w-full text-left px-4 py-3 rounded-xl transition-colors font-medium flex items-center justify-between ${activeTab === tab ? 'bg-gray-100 text-[#3E3D23]' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <span>{tab}</span>
                                    {tab === 'Wishlist' && wishlist.length > 0 && (
                                        <span className="bg-[#3E3D23] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                            {wishlist.length}
                                        </span>
                                    )}
                                </button>
                            ))}

                            {/* Logout button in sidebar */}
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-3 rounded-xl transition-colors font-medium text-red-500 hover:bg-red-50 mt-4"
                            >
                                Logout
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <h2 className="text-3xl font-light mb-8">{activeTab}</h2>

                    {/* Wishlist Tab */}
                    {activeTab === 'Wishlist' && (
                        wishlist.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <p className="text-lg font-medium text-gray-500">Your wishlist is empty</p>
                                <p className="text-sm mt-1 mb-6">Save properties you like by clicking the heart icon</p>
                                <Link to="/buy" className="px-6 py-3 bg-[#3E3D23] text-white rounded-xl font-medium hover:bg-[#2c2b19] transition-colors no-underline">
                                    Browse Properties
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {wishlist.map((item) => (
                                    <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-md transition-all">
                                        <div className="h-48 overflow-hidden relative">
                                            <img src={item.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={item.title} />
                                            <button
                                                onClick={() => removeFromWishlist(item.id)}
                                                className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-red-500 shadow-sm hover:scale-110 transition-transform"
                                                title="Remove from wishlist"
                                            >
                                                ♥
                                            </button>
                                        </div>
                                        <div className="p-4">
                                            <h4 className="font-medium text-lg mb-1">{item.title}</h4>
                                            <p className="text-gray-500 text-sm mb-2">{item.location}</p>
                                            <div className="font-bold text-[#3E3D23]">{item.price}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    )}

                    {activeTab === 'Saved Searches' && (
                        <div className="space-y-4">
                            {savedSearches.map((item, i) => (
                                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 flex justify-between items-center shadow-sm">
                                    <div>
                                        <h4 className="font-medium text-lg">{item.query}</h4>
                                        <p className="text-gray-400 text-sm">{item.date}</p>
                                    </div>
                                    <button className="text-[#3E3D23] font-medium hover:underline">Run Search &rarr;</button>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'Contacted Properties' && (
                        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 text-sm uppercase tracking-wider">
                                    <tr>
                                        <th className="p-6 font-medium">Property</th>
                                        <th className="p-6 font-medium">Owner</th>
                                        <th className="p-6 font-medium">Date</th>
                                        <th className="p-6 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {contacts.map((contact, i) => (
                                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-6 font-medium text-gray-800">{contact.property}</td>
                                            <td className="p-6 text-gray-600">{contact.name}</td>
                                            <td className="p-6 text-gray-500 text-sm">{contact.date}</td>
                                            <td className="p-6">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${contact.status === 'Contacted' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                    {contact.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'Settings' && (
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm max-w-lg">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                    <input type="text" defaultValue={user?.name || ''} className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-[#3E3D23]" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input type="email" defaultValue={user?.email || ''} className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-[#3E3D23]" />
                                </div>
                                <button className="w-full py-3 bg-[#3E3D23] text-white rounded-xl font-medium hover:bg-[#2c2b19] transition-colors">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    )}

                </div>

            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
