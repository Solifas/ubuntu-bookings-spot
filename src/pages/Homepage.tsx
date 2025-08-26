import React, { useState } from 'react';
import { Calendar, Users, Clock, MapPin, Star, Smartphone, BarChart3, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import FeatureCard from '../components/FeatureCard';
import PricingCard from '../components/PricingCard';
import LocationSearch from '../components/LocationSearch';
import SearchResults from '../components/SearchResults';
import DemoModal from '../components/DemoModal';
import { searchServices, Service, mockServices } from '../data/servicesData';

const Homepage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchResults, setSearchResults] = useState<Service[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);

  const serviceTypes = [
    'Barber', 'Hair Salon', 'Beauty Therapist', 'Massage Therapist', 
    'Personal Trainer', 'Tutor', 'Plumber', 'Electrician'
  ];

  const handleSearch = () => {
    console.log('Searching for:', searchQuery, 'in location:', selectedLocation);
    const results = searchServices(searchQuery, selectedLocation);
    setSearchResults(results);
    setShowResults(true);
  };

  const handleServiceTypeClick = (serviceType: string) => {
    setSearchQuery(serviceType);
    const results = searchServices(serviceType, selectedLocation);
    setSearchResults(results);
    setShowResults(true);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Find & Book Local Services
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Anywhere</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed">
              Discover and book appointments with trusted service providers near you. 
              From barbers to tutors, find the perfect professional for your needs.
            </p>
            
            {/* Search Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Service Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="What service do you need?"
                    className="w-full pl-10 pr-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    list="services"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <datalist id="services">
                    {serviceTypes.map((service) => (
                      <option key={service} value={service} />
                    ))}
                  </datalist>
                </div>

                {/* Location Search */}
                <div>
                  <LocationSearch
                    value={selectedLocation}
                    onChange={setSelectedLocation}
                    placeholder="Where do you need it?"
                  />
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Search Services
                </button>
              </div>

              {/* Popular Services */}
              <div className="mt-6">
                <p className="text-sm text-slate-600 mb-3">Popular services:</p>
                <div className="flex flex-wrap gap-2">
                  {serviceTypes.slice(0, 6).map((service) => (
                    <button
                      key={service}
                      onClick={() => handleServiceTypeClick(service)}
                      className="px-4 py-2 bg-slate-100 hover:bg-blue-100 text-slate-700 rounded-full text-sm transition-colors duration-200 hover:scale-105"
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button 
                onClick={handleJoinAsProvider}
                className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Join as Service Provider
              </button>
              <button 
                onClick={handleWatchDemo}
                className="text-slate-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-100 transition-all duration-200 border-2 border-slate-200 hover:border-slate-300"
              >
                Watch Demo
              </button>
            </div>

            <div className="flex items-center justify-center space-x-2 text-slate-600">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-medium">4.9/5 from 500+ businesses worldwide</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results Modal */}
      <SearchResults
        services={searchResults}
        isVisible={showResults}
        onClose={() => setShowResults(false)}
      />

      {/* Demo Modal */}
      <DemoModal 
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
      />

      {/* Popular Services Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Popular Services
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Discover top-rated service providers in your area. From beauty treatments to home repairs, find exactly what you need.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {mockServices.slice(0, 8).map((service) => (
              <div key={service.id} className="bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105">
                <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-slate-200 to-slate-300">
                  <div className="w-full h-32 md:h-40 bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center">
                    <span className="text-white font-medium md:font-semibold text-xs md:text-lg">{service.type}</span>
                  </div>
                </div>
                <div className="p-3 md:p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium md:font-semibold text-slate-900 text-sm md:text-lg group-hover:text-blue-600 transition-colors leading-tight">
                      {service.name}
                    </h3>
                    <span className="text-blue-600 font-bold text-sm md:text-lg ml-2">{service.price}</span>
                  </div>
                  
                  <p className="text-slate-600 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">{service.description}</p>
                  
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs md:text-sm font-medium text-slate-700">{service.rating}</span>
                      <span className="text-xs md:text-sm text-slate-500">({service.reviewCount})</span>
                    </div>
                    <span className="text-xs text-green-600 bg-green-100 px-1 md:px-2 py-1 rounded-full">
                      {service.availability}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-slate-500 text-xs md:text-sm mb-3 md:mb-4">
                    <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    <span className="truncate">{service.location}</span>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setSearchQuery(service.type);
                      setSearchResults([service]);
                      setShowResults(true);
                    }}
                    className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-1.5 md:py-2 px-2 md:px-4 rounded-lg md:rounded-xl font-medium text-xs md:text-base hover:from-blue-600 hover:to-green-600 transition-all duration-200 transform hover:scale-105"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Find & Book Services
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
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
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
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
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of service providers worldwide who've already made the switch to smarter booking.
          </p>
          <button 
            onClick={handleJoinAsProvider}
            className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Your Free Trial Today
          </button>
          <p className="text-blue-200 mt-4">No credit card required • 14-day free trial • Cancel anytime</p>
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

export default Homepage;
