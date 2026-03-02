
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getDeveloperData } from '../data/developersData';
import { projectsData } from '../data/projectsData';

const DeveloperDetailsPage = () => {
    const { developerId } = useParams();
    const developer = getDeveloperData(developerId);

    if (!developer) {
        return (
            <div className="font-sans text-gray-800 bg-white min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold mb-4">Developer not found</h2>
                    <Link to="/" className="text-[#3E3D23] hover:underline">Return Home</Link>
                </div>
                <Footer />
            </div>
        );
    }

    // Get projects for this developer
    const developerProjects = developer.projects?.map(projectId => projectsData[projectId]).filter(Boolean) || [];

    return (
        <div className="font-sans text-gray-800 bg-white min-h-screen">
            <Navbar />

            {/* Developer Hero */}
            <div className="pt-[120px] pb-12 px-[6%] bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Logo */}
                        <div className="w-full md:w-1/3 lg:w-1/4">
                            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-center h-[250px]">
                                {developer.logo ? (
                                    <img src={developer.logo} alt={developer.name} className="max-w-full max-h-full object-contain" />
                                ) : (
                                    <div className="text-4xl text-gray-300 font-bold">{developer.name.charAt(0)}</div>
                                )}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <div className="flex flex-wrap gap-3 mb-4">
                                <span className="bg-[#3E3D23] text-white px-3 py-1 rounded-full text-sm font-medium">{developer.type}</span>
                                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">{developer.status}</span>
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">{developer.name}</h1>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {developer.description}
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <p className="text-3xl font-bold text-[#3E3D23] mb-1">{developer.stats.yearsExperience}</p>
                                    <p className="text-sm text-gray-600">Years Experience</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <p className="text-3xl font-bold text-[#3E3D23] mb-1">{developer.stats.projectsDelivered}</p>
                                    <p className="text-sm text-gray-600">Projects Delivered</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <p className="text-3xl font-bold text-[#3E3D23] mb-1">{developer.stats.happyFamilies}</p>
                                    <p className="text-sm text-gray-600">Happy Families</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Highlights */}
            <div className="py-12 px-[6%] bg-white">
                <div className="max-w-[1400px] mx-auto">
                    <h2 className="text-2xl font-semibold mb-8">Why Choose {developer.name}?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {developer.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <span className="w-8 h-8 flex items-center justify-center bg-[#3E3D23] text-white rounded-full text-sm">
                                    ✓
                                </span>
                                <span className="font-medium text-gray-700">{highlight}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Projects */}
            <div className="py-16 px-[6%] bg-gray-50">
                <div className="max-w-[1400px] mx-auto">
                    <h2 className="text-3xl font-semibold mb-12">Projects by {developer.name}</h2>

                    {developerProjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {developerProjects.map((project, idx) => (
                                <Link
                                    key={idx}
                                    to={`/project/${Object.keys(projectsData).find(key => projectsData[key] === project) || 'grand-arch'}`} // Basic lookup, ideally ID should be in object
                                    className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
                                >
                                    <div className="h-[250px] overflow-hidden">
                                        <img
                                            // Fallback image if project doesn't have one (though mock data usually does)
                                            src={project.image || developer.projectImage}
                                            alt={project.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#3E3D23] transition-colors">{project.name}</h3>
                                            <span className="bg-gray-100 text-xs px-2 py-1 rounded text-gray-600">{project.status}</span>
                                        </div>
                                        <p className="text-gray-500 text-sm mb-4">{project.location}</p>
                                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                            <span className="text-[#3E3D23] font-bold">{project.price}</span>
                                            <span className="text-sm text-gray-500">{project.type}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500 text-lg">No active projects listed for this developer at the moment.</p>
                            <button className="mt-4 text-[#3E3D23] font-medium hover:underline">Contact for upcoming launches</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Contact CTA */}
            <div className="py-16 px-[6%] bg-white">
                <div className="max-w-[1000px] mx-auto bg-[#3E3D23] rounded-2xl p-12 text-center text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-semibold mb-4">Interested in {developer.name} Projects?</h2>
                        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                            Get in touch with our property experts to know more about current and upcoming projects, pricing, and availability.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button className="bg-white text-[#3E3D23] px-8 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors">
                                Contact Developer
                            </button>
                            <button className="bg-transparent border border-white text-white px-8 py-3 rounded-xl font-medium hover:bg-white/10 transition-colors">
                                Download Brochure
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default DeveloperDetailsPage;
