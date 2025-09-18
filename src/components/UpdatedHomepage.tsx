// Updated Homepage component - Example of replacing mock data with TanStack Query
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, MapPin, Calendar, Users, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import Navigation from './Navigation';
import UpdatedLocationSearch from './UpdatedLocationSearch';
import { useSearchServices } from '../hooks/useServices';
import { Service } from '../data/servicesData';

const UpdatedHomepage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');

    // Replace mock services with real API call
    const { data: servicesData, isLoading } = useSearchServices({
        page: 1,
        pageSize: 8 // Get first 8 services for homepage display
    });

    const services = servicesData?.services || [];

    const handleSearch = () => {
        if (searchQuery.trim() || selectedLocation.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(selectedLocation)}`);
        }
    };

    const handleJoinAsProvider = () => {
        navigate('/register?type=provider');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <Navigation />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 pt-16 pb-20">
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                            Book Services with
                            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Trusted Professionals</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed">
                            Discover and book appointments with trusted service providers near you.
                            From barbers to tutors, find the perfect professional for your needs.
                        </p>

                        {/* Search Section */}
                        <div className="max-w-4xl mx-auto mb-12">
                            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-slate-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="What service do you need?"
                                            className="w-full pl-10 pr-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                                            list="services"
                                        />
                                    </div>

                                    <div className="relative">
                                        <UpdatedLocationSearch
                                            value={selectedLocation}
                                            onChange={setSelectedLocation}
                                            placeholder="Where do you need it?"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleSearch}
                                    className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                    Search Services
                                </button>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                            <button
                                onClick={handleJoinAsProvider}
                                className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                Join as Service Provider
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                className="bg-white text-slate-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-50 transition-all duration-200 shadow-lg hover:shadow-xl border border-slate-200"
                            >
                                Find Services
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Services Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Popular Services
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Discover top-rated service providers in your area. From beauty treatments to home repairs, find exactly what you need.
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                        {isLoading ? (
                            // Loading skeleton
                            Array.from({ length: 8 }).map((_, index) => (
                                <div key={index} className="bg-slate-200 animate-pulse rounded-lg md:rounded-xl h-32 md:h-48"></div>
                            ))
                        ) : services.length === 0 ? (
                            // No services found
                            <div className="col-span-full text-center py-12">
                                <p className="text-slate-600">No services available at the moment.</p>
                            </div>
                        ) : (
                            // Actual services
                            services.map((service) => (
                                <div key={service.id} className="bg-white rounded-lg md:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group hover:scale-102">
                                    <div className="w-full h-20 md:h-32 bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center">
                                        <span className="text-white font-medium text-xs md:text-sm">{service.type}</span>
                                    </div>
                                    <div className="p-2 md:p-4">
                                        <div className="flex items-start justify-between mb-1">
                                            <h3 className="font-medium text-slate-900 text-xs md:text-sm leading-tight flex-1 pr-1">
                                                {service.name}
                                            </h3>
                                            <span className="text-blue-600 font-bold text-xs md:text-sm">{service.price}</span>
                                        </div>

                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center space-x-1">
                                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                <span className="text-xs font-medium text-slate-700">{service.rating}</span>
                                            </div>
                                            <span className={`text-xs px-1 py-0.5 rounded ${service.availability === 'Available'
                                                    ? 'text-green-600 bg-green-100'
                                                    : 'text-orange-600 bg-orange-100'
                                                }`}>
                                                {service.availability}
                                            </span>
                                        </div>

                                        <div className="flex items-center text-xs text-slate-500 mb-2">
                                            <MapPin className="h-3 w-3 mr-1" />
                                            <span className="truncate">{service.location}</span>
                                        </div>

                                        <button
                                            onClick={() => navigate(`/book?service=${service.id}`)}
                                            className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-1.5 md:py-2 rounded text-xs md:text-sm font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* View All Services Button */}
                    <div className="text-center mt-12">
                        <button
                            onClick={() => navigate('/services')}
                            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            <span>View All Services</span>
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Why Choose BookSpot?
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Designed for clients and service providers who want a seamless booking experience anywhere in the world.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-4">Easy Discovery</h3>
                            <p className="text-slate-600">Find the perfect service provider with our advanced search and filtering system.</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Calendar className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-4">Instant Booking</h3>
                            <p className="text-slate-600">Book appointments instantly with real-time availability and confirmation.</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-4">Trusted Reviews</h3>
                            <p className="text-slate-600">Make informed decisions with verified reviews from real customers.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Grow Your Business?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join thousands of service providers worldwide who've already made the switch to smarter booking.
                    </p>
                    <button
                        onClick={handleJoinAsProvider}
                        className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        Get Started Today
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center">
                                <Calendar className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold">BookSpot</span>
                        </div>
                        <div className="text-slate-400">
                            © 2024 BookSpot. Connecting service providers and clients worldwide.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default UpdatedHomepage;