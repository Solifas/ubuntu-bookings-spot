
import React, { useState } from 'react';
import { Clock, MapPin, DollarSign, User, Bell, Calendar } from 'lucide-react';
import Navigation from '../components/Navigation';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('business');

  const tabs = [
    { id: 'business', label: 'Business Info', icon: User },
    { id: 'services', label: 'Services', icon: DollarSign },
    { id: 'availability', label: 'Availability', icon: Clock },
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Business Settings</h1>
          <p className="text-slate-600">Manage your business information and preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8">
              
              {activeTab === 'business' && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Business Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Business Name</label>
                      <input
                        type="text"
                        className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        defaultValue="Jabu's Barbershop"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Owner Name</label>
                      <input
                        type="text"
                        className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        defaultValue="Jabu Sithole"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        defaultValue="+27 82 123 4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        defaultValue="jabu@barbershop.co.za"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Business Description</label>
                      <textarea
                        rows={4}
                        className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        defaultValue="Professional barbershop specializing in modern cuts, traditional shaves, and beard grooming. Serving the Sandton community for over 5 years."
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'services' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Services & Pricing</h2>
                    <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-xl font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-200">
                      + Add Service
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { name: 'Classic Haircut', duration: '30', price: '120' },
                      { name: 'Beard Trim & Shape', duration: '20', price: '80' },
                      { name: 'Cut & Beard Combo', duration: '45', price: '180' },
                      { name: 'Hair Styling', duration: '25', price: '100' }
                    ].map((service, index) => (
                      <div key={index} className="bg-slate-50 rounded-2xl p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Service Name</label>
                            <input
                              type="text"
                              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              defaultValue={service.name}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Duration (min)</label>
                            <input
                              type="number"
                              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              defaultValue={service.duration}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Price (R)</label>
                            <input
                              type="number"
                              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              defaultValue={service.price}
                            />
                          </div>
                          <div className="flex items-end">
                            <button className="w-full p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'availability' && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Business Hours</h2>
                  <div className="space-y-4">
                    {weekDays.map((day) => (
                      <div key={day} className="bg-slate-50 rounded-2xl p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <input
                              type="checkbox"
                              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                              defaultChecked={day !== 'Sunday'}
                            />
                            <span className="font-medium text-slate-900 w-24">{day}</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <input
                                type="time"
                                className="p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                defaultValue="08:00"
                              />
                              <span className="text-slate-600">to</span>
                              <input
                                type="time"
                                className="p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                defaultValue="18:00"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'location' && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Business Location</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Street Address</label>
                      <input
                        type="text"
                        className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        defaultValue="Shop 12, Sandton City Mall"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
                      <input
                        type="text"
                        className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        defaultValue="Sandton"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Province</label>
                      <select className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Gauteng</option>
                        <option>Western Cape</option>
                        <option>KwaZulu-Natal</option>
                        <option>Eastern Cape</option>
                        <option>Free State</option>
                        <option>Limpopo</option>
                        <option>Mpumalanga</option>
                        <option>North West</option>
                        <option>Northern Cape</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Postal Code</label>
                      <input
                        type="text"
                        className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        defaultValue="2196"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Google Maps Link</label>
                      <input
                        type="url"
                        className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://maps.google.com/..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Notification Preferences</h2>
                  <div className="space-y-6">
                    <div className="bg-slate-50 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Email Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-900">New Bookings</p>
                            <p className="text-sm text-slate-600">Get notified when clients book appointments</p>
                          </div>
                          <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-900">Booking Reminders</p>
                            <p className="text-sm text-slate-600">Daily summary of upcoming appointments</p>
                          </div>
                          <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-900">Cancellations</p>
                            <p className="text-sm text-slate-600">Get notified when bookings are cancelled</p>
                          </div>
                          <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" defaultChecked />
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">SMS Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-900">Urgent Notifications</p>
                            <p className="text-sm text-slate-600">Last-minute bookings and cancellations</p>
                          </div>
                          <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-900">Daily Reminders</p>
                            <p className="text-sm text-slate-600">Morning summary of today's appointments</p>
                          </div>
                          <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-end space-x-4">
                <button className="px-6 py-3 text-slate-700 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
