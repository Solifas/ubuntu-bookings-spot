
import React, { useState } from 'react';
import { Calendar, Users, Clock, TrendingUp, Check, X, Settings, CalendarDays } from 'lucide-react';
import Navigation from '../components/Navigation';
import BookingCard from '../components/BookingCard';
import ClientList from '../components/ClientList';
import BusinessInsights from '../components/BusinessInsights';
import CalendarView from '../components/CalendarView';
import ServiceManagement from '../components/ServiceManagement';
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
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Welcome back, Jabu! 👋</h1>
          <p className="text-sm sm:text-base text-slate-600">Here's what's happening with your business today.</p>
        </div>

        {/* Tabs - Mobile Responsive */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-slate-100 p-1 rounded-xl overflow-x-auto">
            <div className="flex space-x-1 min-w-max">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'bookings', label: 'Requests' },
                { id: 'calendar', label: 'Calendar', icon: CalendarDays },
                { id: 'services', label: 'Services', icon: Settings },
                { id: 'clients', label: 'Clients' },
                { id: 'insights', label: 'Insights' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap text-sm sm:text-base ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.icon && <tab.icon className="h-3 w-3 sm:h-4 sm:w-4" />}
                  <span className="hidden xs:inline sm:inline">{tab.label}</span>
                  <span className="xs:hidden sm:hidden">{tab.label.slice(0, 4)}</span>
                  {tab.id === 'bookings' && bookingRequests.length > 0 && (
                    <span className="ml-1 sm:ml-2 bg-red-500 text-white text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                      {bookingRequests.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Stats Grid - Mobile Responsive */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col sm:flex-row items-center sm:justify-between">
                    <div className="text-center sm:text-left mb-2 sm:mb-0">
                      <p className="text-slate-600 text-xs sm:text-sm font-medium">{stat.title}</p>
                      <p className="text-lg sm:text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`w-8 h-8 sm:w-12 sm:h-12 ${stat.color} rounded-lg sm:rounded-xl flex items-center justify-center`}>
                      <stat.icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content - Mobile Responsive */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Upcoming Bookings */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-100 p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">Confirmed Bookings</h2>
                    <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm sm:text-base">
                      View All
                    </button>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    {upcomingBookings.map((booking, index) => (
                      <BookingCard key={index} {...booking} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-100 p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 sm:mb-4">Quick Actions</h3>
                  <div className="space-y-2 sm:space-y-3">
                    <button className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white p-3 sm:p-4 rounded-lg sm:rounded-xl font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base">
                      + New Booking
                    </button>
                    <button 
                      onClick={() => setActiveTab('calendar')}
                      className="w-full bg-slate-100 text-slate-700 p-3 sm:p-4 rounded-lg sm:rounded-xl font-medium hover:bg-slate-200 transition-all duration-200 text-sm sm:text-base"
                    >
                      View Calendar
                    </button>
                    <button 
                      onClick={() => setActiveTab('services')}
                      className="w-full bg-slate-100 text-slate-700 p-3 sm:p-4 rounded-lg sm:rounded-xl font-medium hover:bg-slate-200 transition-all duration-200 text-sm sm:text-base"
                    >
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
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-100 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6">Booking Requests</h2>
              
              {bookingRequests.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <Calendar className="h-8 w-8 sm:h-12 sm:w-12 text-slate-400 mx-auto mb-3 sm:mb-4" />
                  <p className="text-slate-600 text-sm sm:text-base">No pending booking requests</p>
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-6">
                  {bookingRequests.map((booking) => (
                    <div key={booking.id} className="bg-slate-50 rounded-lg sm:rounded-xl p-4 sm:p-6">
                      <div className="flex flex-col gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 sm:gap-4 mb-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 text-sm sm:text-base">{booking.clientName}</h3>
                              <p className="text-slate-600 text-xs sm:text-sm">{booking.clientEmail}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
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
                        
                        <div className="flex gap-2 sm:gap-3">
                          <button
                            onClick={() => handleBookingAction(booking.id, 'decline')}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                          >
                            <X className="h-3 w-3 sm:h-4 sm:w-4" />
                            Decline
                          </button>
                          <button
                            onClick={() => handleBookingAction(booking.id, 'accept')}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                          >
                            <Check className="h-3 w-3 sm:h-4 sm:w-4" />
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

        {activeTab === 'calendar' && (
          <div className="max-w-6xl">
            <CalendarView />
          </div>
        )}

        {activeTab === 'services' && (
          <div className="max-w-6xl">
            <ServiceManagement />
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
