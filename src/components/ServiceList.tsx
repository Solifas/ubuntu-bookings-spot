// Example component showing how to use the new hooks
import React, { useState } from 'react';
import { useSearchServices } from '../hooks/useServices';
import { ServiceSearchParams } from '../types/api';
import { Service } from '../data/servicesData';
import { Loader2, Search, MapPin, Filter } from 'lucide-react';

const ServiceList: React.FC = () => {
    const [searchParams, setSearchParams] = useState<ServiceSearchParams>({
        page: 1,
        pageSize: 10
    });

    // Use the custom hook for searching services
    const {
        data: searchResults,
        isLoading,
        error,
        refetch
    } = useSearchServices(searchParams);

    const handleSearch = (query: string) => {
        setSearchParams(prev => ({
            ...prev,
            name: query,
            page: 1 // Reset to first page
        }));
    };

    const handleLocationFilter = (city: string) => {
        setSearchParams(prev => ({
            ...prev,
            city,
            page: 1
        }));
    };

    const handleCategoryFilter = (category: string) => {
        setSearchParams(prev => ({
            ...prev,
            category,
            page: 1
        }));
    };

    const handlePageChange = (page: number) => {
        setSearchParams(prev => ({
            ...prev,
            page
        }));
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-2 text-slate-600">Searching services...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8">
                <p className="text-red-600 mb-4">Failed to load services</p>
                <button
                    onClick={() => refetch()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    Try Again
                </button>
            </div>
        );
    }

    const services = searchResults?.services || [];
    const totalCount = searchResults?.totalCount || 0;
    const totalPages = searchResults?.totalPages || 0;

    return (
        <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search Input */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search services..."
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>

                    {/* Location Filter */}
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="City or location..."
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            onChange={(e) => handleLocationFilter(e.target.value)}
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <select
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                            onChange={(e) => handleCategoryFilter(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            <option value="Hair Salon">Hair Salon</option>
                            <option value="Massage Therapy">Massage Therapy</option>
                            <option value="Beauty">Beauty</option>
                            <option value="Fitness">Fitness</option>
                            <option value="Education">Education</option>
                            <option value="Home Services">Home Services</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Results Summary */}
            <div className="flex justify-between items-center">
                <p className="text-slate-600">
                    Found {totalCount} services
                </p>
                <p className="text-sm text-slate-500">
                    Page {searchParams.page} of {totalPages}
                </p>
            </div>

            {/* Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center space-x-2">
                    <button
                        onClick={() => handlePageChange(searchParams.page! - 1)}
                        disabled={searchParams.page === 1}
                        className="px-4 py-2 border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                    >
                        Previous
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1;
                        return (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`px-4 py-2 border rounded-lg ${searchParams.page === page
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'border-slate-300 hover:bg-slate-50'
                                    }`}
                            >
                                {page}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => handlePageChange(searchParams.page! + 1)}
                        disabled={searchParams.page === totalPages}
                        className="px-4 py-2 border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

// Service Card Component
const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <img
                src={service.image}
                alt={service.name}
                className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
                <h3 className="font-semibold text-lg text-slate-900 mb-2">{service.name}</h3>
                <p className="text-slate-600 text-sm mb-3">{service.description}</p>

                <div className="flex justify-between items-center mb-3">
                    <span className="text-2xl font-bold text-slate-900">{service.price}</span>
                    <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm text-slate-600 ml-1">
                            {service.rating} ({service.reviewCount})
                        </span>
                    </div>
                </div>

                <div className="flex justify-between items-center text-sm text-slate-500 mb-4">
                    <span>{service.location}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${service.availability === 'Available'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                        {service.availability}
                    </span>
                </div>

                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Book Now
                </button>
            </div>
        </div>
    );
};

export default ServiceList;