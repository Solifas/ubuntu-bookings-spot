import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, Users, Clock, MapPin, Star, Smartphone, BarChart3, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import FeatureCard from '../components/FeatureCard';
import PricingCard from '../components/PricingCard';
import UnifiedSearch from '../components/UnifiedSearch';
import SearchResults from '../components/SearchResults';
import ServiceCard from '../components/ServiceCard';
import DemoModal from '../components/DemoModal';
import type { Service as FrontendService } from '../data/servicesData';
import { SearchService } from '../services/searchService';

const Homepage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchResults, setSearchResults] = useState<FrontendService[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [currentSearchInput, setCurrentSearchInput] = useState('');

  const [popularServices, setPopularServices] = useState<FrontendService[]>([]);
  const [isPopularLoading, setIsPopularLoading] = useState(true);
  const displayedServices = useMemo(() => popularServices.slice(0, Math.min(popularServices.length, 10)), [popularServices]);

  useEffect(() => {
    const loadPopularServices = async () => {
      try {
        const response = await SearchService.searchServices(
          SearchService.buildSearchParams(undefined, undefined, undefined, undefined, undefined, 1, 12)
        );

        setPopularServices(response.services);
      } catch (error) {
        console.error('Failed to load homepage services:', error);
        setPopularServices([]);
      } finally {
        setIsPopularLoading(false);
      }
    };

    loadPopularServices();
  }, []);

  const serviceTypes = [
    'Barber', 'Hair Salon', 'Beauty Therapist', 'Massage Therapist',
    'Personal Trainer', 'Tutor', 'Plumber', 'Electrician'
  ];

  const handleSearch = async (query: string, location: string) => {
    console.log('Searching for:', query, 'in location:', location);
    setSearchQuery(query);
    setSelectedLocation(location);
    
    if (query.trim() || location.trim()) {
      try {
        const response = await SearchService.searchServices(
          SearchService.buildSearchParams(query || undefined, location || undefined, undefined, undefined, undefined, 1, 20)
        );
        
        setSearchResults(response.services);
        setShowSearchResults(true);
        
        // Scroll to results section
        setTimeout(() => {
          const resultsSection = document.getElementById('search-results-section');
          if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } catch (error) {
        console.error('Search failed:', error);
        setSearchResults([]);
        setShowSearchResults(true);
      }
    }
  };

  const handleServiceTypeClick = async (serviceType: string) => {
    setSearchQuery(serviceType);

    try {
      const response = await SearchService.searchServices(
        SearchService.buildSearchParams(serviceType, selectedLocation || undefined, undefined, undefined, undefined, 1, 10)
      );

      setSearchResults(response.services);
      setShowSearchResults(true);
      
      // Scroll to results section
      setTimeout(() => {
        const resultsSection = document.getElementById('search-results-section');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (error) {
      console.error('Failed to load services for type:', serviceType, error);
      setSearchResults([]);
      setShowSearchResults(true);
    }
  };

  const handleJoinAsProvider = () => {
    navigate('/register?type=provider');
  };

  const handleWatchDemo = () => {
    setShowDemoModal(true);
  };

  const features = [
    {
      icon: Calendar,
      title: "Easy Online Booking",
      description: "Let clients book appointments 24/7 with your custom booking page that works perfectly on mobile.",
      color: "bg-gradient-to-br from-blue-400 to-blue-600"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Built for businesses on the go. Manage bookings from your phone anywhere, anytime.",
      color: "bg-gradient-to-br from-green-400 to-green-600"
    },
    {
      icon: Users,
      title: "Client Management",
      description: "Keep track of your regular clients, their preferences, and booking history all in one place.",
      color: "bg-gradient-to-br from-purple-400 to-purple-600"
    },
    {
      icon: MapPin,
      title: "Location Integration",
      description: "Show clients exactly where you are with integrated maps. Perfect for mobile services.",
      color: "bg-gradient-to-br from-red-400 to-red-600"
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Set your availability, manage time slots, and handle multiple services with ease.",
      color: "bg-gradient-to-br from-orange-400 to-orange-600"
    },
    {
      icon: BarChart3,
      title: "Business Insights",
      description: "Track your bookings, revenue, and client trends to grow your local service business.",
      color: "bg-gradient-to-br from-teal-400 to-teal-600"
    }
  ];

  const pricingPlans = [
    {
      title: "Starter",
      price: "29",
      period: "month",
      features: [
        "Up to 100 bookings/month",
        "Custom booking page",
        "Email notifications",
        "Basic client management",
        "Mobile app access"
      ],
      ctaText: "Start Free Trial"
    },
    {
      title: "Professional",
      price: "59",
      period: "month",
      features: [
        "Unlimited bookings",
        "Advanced scheduling",
        "Client history & notes",
        "Payment integration",
        "Business analytics",
        "Priority support"
      ],
      isPopular: true,
      ctaText: "Most Popular"
    },
    {
      title: "Enterprise",
      price: "99",
      period: "month",
      features: [
        "Multiple locations",
        "Team management",
        "Advanced reporting",
        "API access",
        "White-label options",
        "Dedicated support"
      ],
      ctaText: "Contact Sales"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-xl md:text-3xl font-bold text-slate-900 mb-3 leading-tight">
              Find & Book Local Services
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Anywhere</span>
            </h1>
            <p className="text-sm md:text-base text-slate-600 mb-4 leading-relaxed">
              Discover and book appointments with trusted service providers near you.
            </p>

            {/* Search Section */}
            <div className="bg-white rounded-2xl shadow-xl p-3 mb-3 max-w-4xl mx-auto">
              <div className="flex gap-2">
                {/* Unified Search */}
                <div className="flex-1">
                  <UnifiedSearch
                    onSearch={handleSearch}
                    placeholder="Search for services or enter 'Service, Location'"
                    className="w-full"
                    onInputChange={setCurrentSearchInput}
                    currentValue={currentSearchInput}
                  />
                </div>

                {/* Search Button */}
                <button
                  onClick={() => {
                    // Parse the current input to extract service and location
                    const query = currentSearchInput.trim();
                    if (!query) return;
                    
                    const parts = query.split(',').map(part => part.trim());
                    let serviceQuery = '';
                    let locationQuery = '';
                    
                    if (parts.length === 2) {
                      serviceQuery = parts[0];
                      locationQuery = parts[1];
                    } else {
                      serviceQuery = query;
                    }
                    
                    handleSearch(serviceQuery, locationQuery);
                  }}
                  className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
                >
                  Search
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Demo Modal */}
      <DemoModal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
      />

      {/* Search Results Section */}
      {showSearchResults && (
        <section id="search-results-section" className="py-3 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                Search Results
                {searchQuery && (
                  <span className="block text-lg text-slate-600 mt-1">
                    for "{searchQuery}" {selectedLocation && `in ${selectedLocation}`}
                  </span>
                )}
              </h2>
              <div className="flex justify-center items-center gap-4 mb-2">
                <p className="text-base text-slate-600">
                  Found {searchResults.length} services
                </p>
                <button
                  onClick={() => setShowSearchResults(false)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Show Popular Services Instead
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3">
              {searchResults.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-slate-600 text-lg mb-4">No services found matching your search.</p>
                  <button
                    onClick={() => setShowSearchResults(false)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Browse Popular Services Instead
                  </button>
                </div>
              ) : (
                searchResults.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))
              )}
            </div>
          </div>
        </section>
      )}

      {/* Popular Services Section */}
      {!showSearchResults && (
        <section className="py-3 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                Popular Services
              </h2>
              <p className="text-sm text-slate-600 max-w-2xl mx-auto">
                Discover top-rated service providers in your area
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3">
              {isPopularLoading ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="bg-slate-200 animate-pulse rounded-lg md:rounded-xl h-32 md:h-48"></div>
                ))
              ) : displayedServices.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-slate-600">No services available at the moment.</p>
                </div>
              ) : (
                displayedServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))
              )}
            </div>
          </div>
        </section>
      )}

      {/* Action Buttons Section */}
      <section className="py-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              onClick={handleJoinAsProvider}
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-full text-base font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Join as Service Provider
            </button>
            <button
              onClick={handleWatchDemo}
              className="text-slate-700 px-6 py-3 rounded-full text-base font-semibold hover:bg-slate-100 transition-all duration-200 border-2 border-slate-200 hover:border-slate-300"
            >
              Watch Demo
            </button>
          </div>
        </div>

      </section>

      {/* Features Section */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Everything You Need to Find & Book Services
            </h2>
            <p className="text-base text-slate-600 max-w-2xl mx-auto">
              Designed for clients and service providers who want a seamless booking experience anywhere in the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-8 md:py-12 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Simple, Transparent Pricing
            </h2>
            <p className="text-base text-slate-600 max-w-2xl mx-auto">
              Choose the perfect plan for your business. All plans include our core features with no hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-12 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-base text-blue-100 mb-6">
            Join thousands of service providers worldwide who've already made the switch to smarter booking.
          </p>
          <button
            onClick={handleJoinAsProvider}
            className="bg-white text-blue-600 px-6 py-3 rounded-full text-base font-semibold hover:bg-slate-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Your Free Trial Today
          </button>
          <p className="text-blue-200 mt-3 text-sm">No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">HirePros</span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center space-x-2 text-slate-400">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm">4.9/5 from 500+ businesses worldwide</span>
              </div>
              <div className="text-slate-400">
                © 2024 HirePros. Connecting service providers and clients worldwide.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;

