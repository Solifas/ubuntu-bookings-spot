
import React from 'react';
import { Calendar, Users, Clock, MapPin, Star, Smartphone, BarChart3 } from 'lucide-react';
import Navigation from '../components/Navigation';
import FeatureCard from '../components/FeatureCard';
import PricingCard from '../components/PricingCard';

const Homepage = () => {
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
      description: "Built for South African businesses on the go. Manage bookings from your phone anywhere, anytime.",
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
      description: "Show clients exactly where you are with integrated Google Maps. Perfect for mobile services.",
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
      price: "99",
      period: "month",
      features: [
        "Up to 100 bookings/month",
        "Custom booking page",
        "SMS notifications",
        "Basic client management",
        "Mobile app access"
      ],
      ctaText: "Start Free Trial"
    },
    {
      title: "Professional",
      price: "199",
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
      price: "399",
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
              Grow Your Local Business with
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Smart Booking</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed">
              The easiest way for South African service providers to manage appointments, 
              delight clients, and boost revenue. Built for barbers, hairdressers, tutors, and more.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                Start Your Free Trial
              </button>
              <button className="text-slate-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-100 transition-all duration-200 border-2 border-slate-200 hover:border-slate-300">
                Watch Demo
              </button>
            </div>

            <div className="flex items-center justify-center space-x-2 text-slate-600">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-medium">4.9/5 from 200+ South African businesses</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Run Your Business
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Designed specifically for South African service providers who want to spend less time managing and more time serving clients.
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
            Join hundreds of South African service providers who've already made the switch to smarter booking.
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
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
              <span className="text-xl font-bold">BookMzansi</span>
            </div>
            <div className="text-slate-400">
              © 2024 BookMzansi. Made with ❤️ for South African businesses.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
