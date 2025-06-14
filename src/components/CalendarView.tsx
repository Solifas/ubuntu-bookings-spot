
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, User } from 'lucide-react';
import { format } from 'date-fns';

interface Booking {
  id: string;
  clientName: string;
  service: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed';
}

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Mock bookings for demonstration
  const bookings: Record<string, Booking[]> = {
    '2025-06-14': [
      { id: '1', clientName: 'Sarah Johnson', service: 'Haircut & Beard Trim', time: '9:00 AM', status: 'confirmed' },
      { id: '2', clientName: 'Mike Brown', service: 'Hair Styling', time: '11:30 AM', status: 'confirmed' },
      { id: '3', clientName: 'Alex Wilson', service: 'Beard Trim', time: '2:00 PM', status: 'pending' },
      { id: '4', clientName: 'Emma Davis', service: 'Hair Cut', time: '4:30 PM', status: 'confirmed' }
    ],
    '2025-06-15': [
      { id: '5', clientName: 'John Smith', service: 'Haircut & Beard Trim', time: '10:00 AM', status: 'confirmed' },
      { id: '6', clientName: 'Lisa Garcia', service: 'Hair Styling', time: '1:00 PM', status: 'confirmed' }
    ]
  };

  const selectedDateKey = format(selectedDate, 'yyyy-MM-dd');
  const dayBookings = bookings[selectedDateKey] || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Calendar Section */}
      <Card className="bg-white rounded-2xl shadow-lg border border-slate-100">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-900">Calendar</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-lg border border-slate-200 bg-white shadow-sm"
            />
          </div>
        </CardContent>
      </Card>

      {/* Selected Day's Bookings */}
      <Card className="bg-white rounded-2xl shadow-lg border border-slate-100">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-900">
            Bookings for {format(selectedDate, 'MMMM d, yyyy')}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {dayBookings.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">No bookings scheduled</h3>
              <p className="text-slate-600">No appointments are scheduled for this date.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {dayBookings.map((booking) => (
                <div key={booking.id} className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-5 border border-slate-100 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{booking.clientName}</h4>
                        <p className="text-sm text-slate-600">{booking.service}</p>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(booking.status)} font-medium`}>
                      {booking.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600 ml-13">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">{booking.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarView;
