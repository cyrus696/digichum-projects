import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SellPropertyForm = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: Basic Details
        purpose: 'sell',
        propertyType: '',

        // Step 2: Location
        address: '',
        locality: '',
        city: '',
        state: '',
        pincode: '',

        // Step 3: Property Profile
        bedrooms: '',
        bathrooms: '',
        balconies: '',
        totalFloors: '',
        floorNumber: '',
        carpetArea: '',
        builtUpArea: '',
        availabilityStatus: 'ready',
        possessionDate: '',
        ownership: '',
        expectedPrice: '',
        priceNegotiable: false,

        // Step 4: Photos & Videos
        images: [],
        video: null,

        // Step 5: Amenities
        amenities: []
    });

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        if (currentStep < 5) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        alert('Property posted successfully! (Mock submission)');
        navigate('/dashboard');
    };

    const propertyTypes = [
        { id: 'apartment', label: 'Apartment', icon: '🏢' },
        { id: 'villa', label: 'Villa', icon: '🏡' },
        { id: 'plot', label: 'Plot', icon: '📐' },
        { id: 'farmhouse', label: 'Farmhouse', icon: '🌾' },
        { id: 'builder-floor', label: 'Builder Floor', icon: '🏗️' },
        { id: 'penthouse', label: 'Penthouse', icon: '🏙️' }
    ];

    const amenitiesList = [
        'Swimming Pool', 'Gym', 'Parking', 'Garden', 'Security', 'Power Backup',
        'Lift', 'Club House', "Children's Play Area", 'Intercom', 'Fire Safety',
        'Visitor Parking', 'Water Supply', 'Maintenance Staff'
    ];

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const imageUrls = files.map(file => URL.createObjectURL(file));
        updateFormData('images', [...formData.images, ...imageUrls]);
    };

    const removeImage = (index) => {
        const newImages = formData.images.filter((_, i) => i !== index);
        updateFormData('images', newImages);
    };

    const toggleAmenity = (amenity) => {
        const newAmenities = formData.amenities.includes(amenity)
            ? formData.amenities.filter(a => a !== amenity)
            : [...formData.amenities, amenity];
        updateFormData('amenities', newAmenities);
    };

    return (
        <div className="font-sans text-gray-800 bg-gray-50 min-h-screen">
            <Navbar />

            <div className="pt-[120px] px-[6%] pb-20 max-w-[900px] mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-light text-gray-900 mb-2">Post Your Property</h1>
                    <p className="text-gray-500">Fill in the details to list your property</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-10">
                    <div className="flex justify-between items-center mb-3">
                        {[1, 2, 3, 4, 5].map(step => (
                            <div key={step} className="flex items-center flex-1">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${currentStep >= step ? 'bg-[#3E3D23] text-white' : 'bg-gray-200 text-gray-400'
                                    }`}>
                                    {step}
                                </div>
                                {step < 5 && <div className={`flex-1 h-1 mx-2 ${currentStep > step ? 'bg-[#3E3D23]' : 'bg-gray-200'}`}></div>}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>Basic</span>
                        <span>Location</span>
                        <span>Profile</span>
                        <span>Media</span>
                        <span>Amenities</span>
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

                    {/* Step 1: Basic Details */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-medium text-gray-900 mb-6">Basic Details</h2>

                            {/* Purpose */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">I'm looking to *</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {['sell', 'rent', 'lease', 'pg'].map(purpose => (
                                        <button
                                            key={purpose}
                                            onClick={() => updateFormData('purpose', purpose)}
                                            className={`py-3 px-4 rounded-xl border-2 font-medium capitalize transition-all ${formData.purpose === purpose
                                                    ? 'border-[#3E3D23] bg-[#3E3D23] text-white'
                                                    : 'border-gray-200 hover:border-[#3E3D23] text-gray-600'
                                                }`}
                                        >
                                            {purpose}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Property Type */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">What kind of property do you have? *</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {propertyTypes.map(type => (
                                        <button
                                            key={type.id}
                                            onClick={() => updateFormData('propertyType', type.id)}
                                            className={`p-4 rounded-xl border-2 transition-all text-center ${formData.propertyType === type.id
                                                    ? 'border-[#3E3D23] bg-[#3E3D23]/5'
                                                    : 'border-gray-200 hover:border-[#3E3D23]'
                                                }`}
                                        >
                                            <div className="text-3xl mb-2">{type.icon}</div>
                                            <div className="text-sm font-medium text-gray-700">{type.label}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Location Details */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-medium text-gray-900 mb-6">Location Details</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
                                    <input
                                        type="text"
                                        value={formData.address}
                                        onChange={(e) => updateFormData('address', e.target.value)}
                                        placeholder="Enter property address"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#3E3D23]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Locality *</label>
                                    <input
                                        type="text"
                                        value={formData.locality}
                                        onChange={(e) => updateFormData('locality', e.target.value)}
                                        placeholder="e.g., Bandra West"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#3E3D23]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                                    <input
                                        type="text"
                                        value={formData.city}
                                        onChange={(e) => updateFormData('city', e.target.value)}
                                        placeholder="e.g., Mumbai"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#3E3D23]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                                    <input
                                        type="text"
                                        value={formData.state}
                                        onChange={(e) => updateFormData('state', e.target.value)}
                                        placeholder="e.g., Maharashtra"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#3E3D23]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode *</label>
                                    <input
                                        type="text"
                                        value={formData.pincode}
                                        onChange={(e) => updateFormData('pincode', e.target.value)}
                                        placeholder="e.g., 400050"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#3E3D23]"
                                    />
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="bg-gray-100 rounded-xl p-8 text-center border-2 border-dashed border-gray-300">
                                <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                                </svg>
                                <p className="text-gray-500 text-sm">Map integration coming soon</p>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Property Profile */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-medium text-gray-900 mb-6">Property Profile</h2>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bedrooms *</label>
                                    <input
                                        type="number"
                                        value={formData.bedrooms}
                                        onChange={(e) => updateFormData('bedrooms', e.target.value)}
                                        placeholder="0"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#3E3D23]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bathrooms *</label>
                                    <input
                                        type="number"
                                        value={formData.bathrooms}
                                        onChange={(e) => updateFormData('bathrooms', e.target.value)}
                                        placeholder="0"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#3E3D23]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Balconies</label>
                                    <input
                                        type="number"
                                        value={formData.balconies}
                                        onChange={(e) => updateFormData('balconies', e.target.value)}
                                        placeholder="0"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#3E3D23]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Total Floors *</label>
                                    <input
                                        type="number"
                                        value={formData.totalFloors}
                                        onChange={(e) => updateFormData('totalFloors', e.target.value)}
                                        placeholder="0"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#3E3D23]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Floor Number *</label>
                                    <input
                                        type="number"
                                        value={formData.floorNumber}
                                        onChange={(e) => updateFormData('floorNumber', e.target.value)}
                                        placeholder="0"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#3E3D23]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Carpet Area (sq.ft) *</label>
                                    <input
                                        type="number"
                                        value={formData.carpetArea}
                                        onChange={(e) => updateFormData('carpetArea', e.target.value)}
                                        placeholder="0"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#3E3D23]"
                                    />
                                </div>
                            </div>

                            {/* Availability Status */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Availability Status *</label>
                                <div className="flex gap-4">
                                    {['ready', 'under-construction'].map(status => (
                                        <button
                                            key={status}
                                            onClick={() => updateFormData('availabilityStatus', status)}
                                            className={`flex-1 py-3 px-4 rounded-xl border-2 font-medium capitalize transition-all ${formData.availabilityStatus === status
                                                    ? 'border-[#3E3D23] bg-[#3E3D23] text-white'
                                                    : 'border-gray-200 hover:border-[#3E3D23] text-gray-600'
                                                }`}
                                        >
                                            {status.replace('-', ' ')}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Ownership */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Ownership *</label>
                                <select
                                    value={formData.ownership}
                                    onChange={(e) => updateFormData('ownership', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#3E3D23]"
                                >
                                    <option value="">Select Ownership Type</option>
                                    <option value="freehold">Freehold</option>
                                    <option value="leasehold">Leasehold</option>
                                    <option value="cooperative">Co-operative Society</option>
                                </select>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Price (₹) *</label>
                                <input
                                    type="number"
                                    value={formData.expectedPrice}
                                    onChange={(e) => updateFormData('expectedPrice', e.target.value)}
                                    placeholder="e.g., 5000000"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#3E3D23]"
                                />
                                <label className="flex items-center gap-2 mt-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.priceNegotiable}
                                        onChange={(e) => updateFormData('priceNegotiable', e.target.checked)}
                                        className="w-4 h-4 accent-[#3E3D23]"
                                    />
                                    <span className="text-sm text-gray-600">Price Negotiable</span>
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Photos & Videos */}
                    {currentStep === 4 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-medium text-gray-900 mb-6">Photos & Videos</h2>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Property Images *</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#3E3D23] transition-colors cursor-pointer">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="image-upload"
                                    />
                                    <label htmlFor="image-upload" className="cursor-pointer">
                                        <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                        <p className="text-gray-600 mb-1">Click to upload images</p>
                                        <p className="text-xs text-gray-400">PNG, JPG up to 5MB each</p>
                                    </label>
                                </div>

                                {/* Image Preview */}
                                {formData.images.length > 0 && (
                                    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                                        {formData.images.map((img, idx) => (
                                            <div key={idx} className="relative group">
                                                <img src={img} alt={`Preview ${idx}`} className="w-full h-24 object-cover rounded-lg" />
                                                <button
                                                    onClick={() => removeImage(idx)}
                                                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Video Upload */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Property Video (Optional)</label>
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => updateFormData('video', e.target.files[0])}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#3E3D23]"
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 5: Amenities */}
                    {currentStep === 5 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-medium text-gray-900 mb-6">Amenities</h2>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {amenitiesList.map(amenity => (
                                    <label key={amenity} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={formData.amenities.includes(amenity)}
                                            onChange={() => toggleAmenity(amenity)}
                                            className="w-5 h-5 accent-[#3E3D23] cursor-pointer"
                                        />
                                        <span className="text-sm text-gray-700">{amenity}</span>
                                    </label>
                                ))}
                            </div>

                            {/* Summary */}
                            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                                <h3 className="font-semibold text-gray-900 mb-4">Summary</h3>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <p><strong>Purpose:</strong> {formData.purpose}</p>
                                    <p><strong>Property Type:</strong> {formData.propertyType}</p>
                                    <p><strong>Location:</strong> {formData.locality}, {formData.city}</p>
                                    <p><strong>Bedrooms:</strong> {formData.bedrooms} | <strong>Bathrooms:</strong> {formData.bathrooms}</p>
                                    <p><strong>Price:</strong> ₹ {formData.expectedPrice}</p>
                                    <p><strong>Amenities:</strong> {formData.amenities.length} selected</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                        <button
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className={`px-6 py-3 rounded-xl font-medium transition-colors ${currentStep === 1
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            Previous
                        </button>

                        {currentStep < 5 ? (
                            <button
                                onClick={nextStep}
                                className="px-6 py-3 bg-[#3E3D23] text-white rounded-xl font-medium hover:bg-[#2c2b19] transition-colors"
                            >
                                Next Step
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
                            >
                                Submit Property
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default SellPropertyForm;
