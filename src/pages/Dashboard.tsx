
import React from 'react';
import { Calendar, Users, Clock, TrendingUp, MapPin, Phone, Mail } from 'lucide-react';
import Navigation from '../components/Navigation';
import BookingCard from '../components/BookingCard';

const Dashboard = () => {
  const stats = [
    { title: 'Today\'s Bookings', value: '12', icon: Calendar, color: 'bg-blue-500' },
    { title: 'This Week', value: '47', icon: Clock, color: 'bg-green-500' },
    { title: 'Total Clients', value: '234', icon: Users, color: 'bg-purple-500' },
    { title: 'Revenue (Month)', value: 'R8,450', icon: TrendingUp, color: 'bg-orange-500' }
  ];

  const upcomingBookings = [
    {
      clientName: 'Thabo Mthembu',
      service: 'Haircut & Beard Trim',
      date: 'Today, 14 Jun',
      time: '2:30 PM',
      location: 'Sandton City, Johannesburg',
      status: 'upcoming' as const
    },
    {
      clientName: 'Nomsa Dlamini',
      service: 'Math Tutoring Session',
      date: 'Today, 14 Jun',
      time: '4:00 PM',
      location: 'Rosebank, Johannesburg',
      status: 'upcoming' as const
    },
    {
      clientName: 'Johan van der Merwe',
      service: 'Hair Styling',
      date: 'Tomorrow, 15 Jun',
      time: '10:00 AM',
      location: 'Century City, Cape Town',
      status: 'upcoming' as const
    },
    {
      clientName: 'Aisha Patel',
      service: 'English Tutoring',
      date: 'Tomorrow, 15 Jun',
      time: '3:30 PM',
      location: 'Durban North, KZN',
      status: 'upcoming' as const
    }
  ];

  const recentClients = [
    { name: 'Sipho Ndaba', phone: '+27 82 123 4567', email: 'sipho@email.com', lastVisit: '2 days ago' },
    { name: 'Lindiwe Zulu', phone: '+27 84 987 6543', email: 'lindiwe@email.com', lastVisit: '1 week ago' },
    { name: 'Michael Johnson', phone: '+27 79 555 1234', email: 'michael@email.com', lastVisit: '3 days ago' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, Jabu! 👋</h1>
          <p className="text-slate-600">Here's what's happening with your business today.</p>
        </div>

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Bookings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Upcoming Bookings</h2>
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

          {/* Quick Actions & Recent Clients */}
          <div className="space-y-6">
            {/* Quick Actions */}
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

            {/* Recent Clients */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Clients</h3>
              <div className="space-y-4">
                {recentClients.map((client, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center text-white font-semibold">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{client.name}</p>
                      <div className="flex items-center space-x-2 text-xs text-slate-600">
                        <Phone className="h-3 w-3" />
                        <span className="truncate">{client.phone}</span>
                      </div>
                      <p className="text-xs text-slate-500">{client.lastVisit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
