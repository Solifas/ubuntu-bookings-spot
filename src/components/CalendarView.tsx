
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      {/* Day's Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>
            Bookings for {format(selectedDate, 'MMMM d, yyyy')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {dayBookings.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No bookings for this date</p>
            </div>
          ) : (
            <div className="space-y-4">
              {dayBookings.map((booking) => (
                <div key={booking.id} className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-600" />
                      <span className="font-semibold">{booking.clientName}</span>
                    </div>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {booking.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {booking.service}
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
