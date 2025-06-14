import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Phone, Mail, Star, LogIn } from 'lucide-react';
import AuthModal from '../components/AuthModal';
import LocationSearch from '../components/LocationSearch';

const BookingPage = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [step, setStep] = useState(1);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const services = [
    { id: 'haircut', name: 'Classic Haircut', duration: '30 min', price: 'R120', description: 'Professional cut and styling' },
    { id: 'beard-trim', name: 'Beard Trim & Shape', duration: '20 min', price: 'R80', description: 'Expert beard grooming' },
    { id: 'combo', name: 'Cut & Beard Combo', duration: '45 min', price: 'R180', description: 'Complete grooming package' },
    { id: 'styling', name: 'Hair Styling', duration: '25 min', price: 'R100', description: 'Professional styling service' }
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowAuth(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-green-400 rounded-2xl flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Jabu's Barbershop</h1>
                <div className="flex items-center space-x-4 text-slate-600 mt-1">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>Sandton City, Johannesburg</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">4.9 (127 reviews)</span>
                  </div>
                </div>
              </div>
            </div>
            
            {!isLoggedIn && (
              <button
                onClick={() => setShowAuth(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2 rounded-full font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${step >= 1 ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-blue-500' : 'bg-slate-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${step >= 2 ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
              2
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-blue-500' : 'bg-slate-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${step >= 3 ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
              3
            </div>
            <div className={`w-16 h-1 ${step >= 4 ? 'bg-blue-500' : 'bg-slate-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${step >= 4 ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
              4
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Choose Your Service</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedService === service.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">{service.name}</h3>
                      <span className="text-lg font-bold text-blue-600">{service.price}</span>
                    </div>
                    <p className="text-slate-600 text-sm mb-2">{service.description}</p>
                    <div className="flex items-center space-x-1 text-slate-500 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>{service.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedService && (
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Continue to Location
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Choose Location</h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Where would you like the service?</h3>
                <LocationSearch
                  value={selectedLocation}
                  onChange={setSelectedLocation}
                  placeholder="Enter your preferred location..."
                />
                <p className="text-sm text-slate-600 mt-2">
                  We provide services at your location within Johannesburg and Cape Town areas.
                </p>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-8 py-3 rounded-xl font-medium text-slate-700 border-2 border-slate-200 hover:bg-slate-50 transition-all duration-200"
                >
                  Back
                </button>
                {selectedLocation && (
                  <button
                    onClick={() => setStep(3)}
                    className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Continue to Date & Time
                  </button>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Select Date & Time</h2>
              
              {/* Date Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Choose Date</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {Array.from({ length: 14 }, (_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() + i);
                    const dateStr = date.toISOString().split('T')[0];
                    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                    const dayNum = date.getDate();
                    
                    return (
                      <div
                        key={dateStr}
                        onClick={() => setSelectedDate(dateStr)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 text-center ${
                          selectedDate === dateStr
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="text-sm text-slate-600">{dayName}</div>
                        <div className="text-lg font-semibold text-slate-900">{dayNum}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Choose Time</h3>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-xl border-2 font-medium transition-all duration-200 ${
                          selectedTime === time
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-slate-200 text-slate-700 hover:border-blue-300'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-3 rounded-xl font-medium text-slate-700 border-2 border-slate-200 hover:bg-slate-50 transition-all duration-200"
                >
                  Back
                </button>
                {selectedDate && selectedTime && (
                  <button
                    onClick={() => isLoggedIn ? setStep(4) : setShowAuth(true)}
                    className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {isLoggedIn ? 'Continue to Details' : 'Login to Continue'}
                  </button>
                )}
              </div>
            </div>
          )}

          {step === 4 && isLoggedIn && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Confirm Booking</h2>
              
              {/* Booking Summary */}
              <div className="bg-slate-50 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Booking Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Service:</span>
                    <span className="font-medium text-slate-900">
                      {services.find(s => s.id === selectedService)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Location:</span>
                    <span className="font-medium text-slate-900">{selectedLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Date:</span>
                    <span className="font-medium text-slate-900">
                      {new Date(selectedDate).toLocaleDateString('en-ZA')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Time:</span>
                    <span className="font-medium text-slate-900">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Duration:</span>
                    <span className="font-medium text-slate-900">
                      {services.find(s => s.id === selectedService)?.duration}
                    </span>
                  </div>
                  <div className="border-t border-slate-200 pt-3 flex justify-between">
                    <span className="font-semibold text-slate-900">Total:</span>
                    <span className="font-bold text-lg text-blue-600">
                      {services.find(s => s.id === selectedService)?.price}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="px-8 py-3 rounded-xl font-medium text-slate-700 border-2 border-slate-200 hover:bg-slate-50 transition-all duration-200"
                >
                  Back
                </button>
                <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl">
                  Confirm Booking
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  );
};

export default BookingPage;
