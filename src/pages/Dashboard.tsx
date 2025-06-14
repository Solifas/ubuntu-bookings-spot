
import React, { useState } from 'react';
import { Calendar, Users, Clock, TrendingUp, Check, X } from 'lucide-react';
import Navigation from '../components/Navigation';
import BookingCard from '../components/BookingCard';
import ClientList from '../components/ClientList';
import BusinessInsights from '../components/BusinessInsights';
import { toast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock booking requests that need approval
  const [bookingRequests, setBookingRequests] = useState([
    {
      id: '1',
      clientName: 'John Smith',
      clientEmail: 'john@example.com',
      clientPhone: '+1-555-0123',
      service: 'Haircut & Beard Trim',
      date: 'Today, 14 Jun',
      time: '2:30 PM',
      location: 'Downtown Salon',
      status: 'pending' as const,
      price: '$35'
    },
    {
      id: '2',
      clientName: 'Maria Garcia',
      clientEmail: 'maria@example.com',
      clientPhone: '+1-555-0456',
      service: 'Hair Styling',
      date: 'Tomorrow, 15 Jun',
      time: '10:00 AM',
      location: 'Downtown Salon',
      status: 'pending' as const,
      price: '$45'
    },
    {
      id: '3',
      clientName: 'David Wilson',
      clientEmail: 'david@example.com',
      clientPhone: '+1-555-0789',
      service: 'Beard Trim',
      date: 'Tomorrow, 15 Jun',
      time: '3:00 PM',
      location: 'Downtown Salon',
      status: 'pending' as const,
      price: '$20'
    }
  ]);

  const stats = [
    { title: 'Today\'s Bookings', value: '12', icon: Calendar, color: 'bg-blue-500' },
    { title: 'This Week', value: '47', icon: Clock, color: 'bg-green-500' },
    { title: 'Total Clients', value: '234', icon: Users, color: 'bg-purple-500' },
    { title: 'Revenue (Month)', value: '$8,450', icon: TrendingUp, color: 'bg-orange-500' }
  ];

  const upcomingBookings = [
    {
      clientName: 'Sarah Johnson',
      service: 'Haircut & Beard Trim',
      date: 'Today, 14 Jun',
      time: '4:30 PM',
      location: 'Downtown Salon',
      status: 'upcoming' as const
    },
    {
      clientName: 'Mike Brown',
      service: 'Hair Styling',
      date: 'Tomorrow, 15 Jun',
      time: '11:00 AM',
      location: 'Downtown Salon',
      status: 'upcoming' as const
    }
  ];

  const handleBookingAction = (bookingId: string, action: 'accept' | 'decline') => {
    const booking = bookingRequests.find(b => b.id === bookingId);
    if (!booking) return;

    if (action === 'accept') {
      // Move to confirmed bookings
      setBookingRequests(prev => prev.filter(b => b.id !== bookingId));
      toast({
        title: "Booking Accepted",
        description: `${booking.clientName}'s booking for ${booking.service} has been confirmed.`,
      });
    } else {
      // Remove from requests
      setBookingRequests(prev => prev.filter(b => b.id !== bookingId));
      toast({
        title: "Booking Declined",
        description: `${booking.clientName}'s booking request has been declined.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, Jabu! 👋</h1>
          <p className="text-slate-600">Here's what's happening with your business today.</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl w-fit">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'bookings', label: 'Booking Requests' },
              { id: 'clients', label: 'Clients' },
              { id: 'insights', label: 'Insights' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
                {tab.id === 'bookings' && bookingRequests.length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {bookingRequests.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm font-medium">{stat.title}</p>
                      <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Upcoming Bookings */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-900">Confirmed Bookings</h2>
                    <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                      View All
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {upcomingBookings.map((booking, index) => (
                      <BookingCard key={index} {...booking} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white p-4 rounded-xl font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl">
                      + New Booking
                    </button>
                    <button className="w-full bg-slate-100 text-slate-700 p-4 rounded-xl font-medium hover:bg-slate-200 transition-all duration-200">
                      View Calendar
                    </button>
                    <button className="w-full bg-slate-100 text-slate-700 p-4 rounded-xl font-medium hover:bg-slate-200 transition-all duration-200">
                      Manage Services
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'bookings' && (
          <div className="max-w-6xl">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Booking Requests</h2>
              
              {bookingRequests.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600">No pending booking requests</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {bookingRequests.map((booking) => (
                    <div key={booking.id} className="bg-slate-50 rounded-xl p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <Users className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900">{booking.clientName}</h3>
                              <p className="text-slate-600 text-sm">{booking.clientEmail}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-slate-500 font-medium">Service</p>
                              <p className="text-slate-900">{booking.service}</p>
                            </div>
                            <div>
                              <p className="text-slate-500 font-medium">Date & Time</p>
                              <p className="text-slate-900">{booking.date} at {booking.time}</p>
                            </div>
                            <div>
                              <p className="text-slate-500 font-medium">Phone</p>
                              <p className="text-slate-900">{booking.clientPhone}</p>
                            </div>
                            <div>
                              <p className="text-slate-500 font-medium">Price</p>
                              <p className="text-slate-900 font-semibold">{booking.price}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleBookingAction(booking.id, 'decline')}
                            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <X className="h-4 w-4" />
                            Decline
                          </button>
                          <button
                            onClick={() => handleBookingAction(booking.id, 'accept')}
                            className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                          >
                            <Check className="h-4 w-4" />
                            Accept
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'clients' && (
          <div className="max-w-4xl">
            <ClientList />
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="max-w-6xl">
            <BusinessInsights />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
