
import React, { useState } from 'react';
import { User, Phone, Mail, Calendar, MoreVertical, MessageCircle } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalBookings: number;
  lastVisit: string;
  avatar?: string;
}

const ClientList = () => {
  const [clients] = useState<Client[]>([
    {
      id: '1',
      name: 'Thabo Mthembu',
      email: 'thabo@email.com',
      phone: '+27 82 123 4567',
      totalBookings: 12,
      lastVisit: '2024-06-10'
    },
    {
      id: '2',
      name: 'Nomsa Dlamini',
      email: 'nomsa@email.com',
      phone: '+27 84 987 6543',
      totalBookings: 8,
      lastVisit: '2024-06-08'
    },
    {
      id: '3',
      name: 'Johan van der Merwe',
      email: 'johan@email.com',
      phone: '+27 79 555 1234',
      totalBookings: 15,
      lastVisit: '2024-06-12'
    },
    {
      id: '4',
      name: 'Aisha Patel',
      email: 'aisha@email.com',
      phone: '+27 76 888 9999',
      totalBookings: 6,
      lastVisit: '2024-06-09'
    }
  ]);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">Client Management</h2>
        <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
          View All Clients
        </button>
      </div>

      <div className="space-y-4">
        {clients.map((client) => (
          <div key={client.id} className="p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center text-white font-semibold">
                  {client.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{client.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-slate-600 mt-1">
                    <div className="flex items-center space-x-1">
                      <Mail className="h-3 w-3" />
                      <span>{client.email}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="h-3 w-3" />
                      <span>{client.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <MessageCircle className="h-4 w-4" />
                </button>
                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <Calendar className="h-4 w-4" />
                </button>
                <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
              <div className="text-sm text-slate-600">
                <span className="font-medium">{client.totalBookings}</span> total bookings
              </div>
              <div className="text-sm text-slate-600">
                Last visit: <span className="font-medium">{new Date(client.lastVisit).toLocaleDateString('en-ZA')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl">
          + Add New Client
        </button>
      </div>
    </div>
  );
};

export default ClientList;
