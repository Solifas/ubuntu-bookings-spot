
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Clock, DollarSign } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
  active: boolean;
}

const ServiceManagement = () => {
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Classic Haircut',
      duration: 30,
      price: 35,
      description: 'Professional men\'s haircut with styling',
      active: true
    },
    {
      id: '2',
      name: 'Beard Trim & Shape',
      duration: 20,
      price: 25,
      description: 'Beard trimming and shaping service',
      active: true
    },
    {
      id: '3',
      name: 'Cut & Beard Combo',
      duration: 45,
      price: 55,
      description: 'Complete haircut and beard service',
      active: true
    },
    {
      id: '4',
      name: 'Hair Styling',
      duration: 25,
      price: 30,
      description: 'Hair styling and finishing',
      active: false
    }
  ]);

  const handleToggleService = (serviceId: string) => {
    setServices(prev => prev.map(service => 
      service.id === serviceId 
        ? { ...service, active: !service.active }
        : service
    ));
    
    const service = services.find(s => s.id === serviceId);
    toast({
      title: service?.active ? "Service Disabled" : "Service Enabled",
      description: `${service?.name} has been ${service?.active ? 'disabled' : 'enabled'}.`,
    });
  };

  const handleDeleteService = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    setServices(prev => prev.filter(service => service.id !== serviceId));
    
    toast({
      title: "Service Deleted",
      description: `${service?.name} has been removed from your services.`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Service Management</h2>
          <p className="text-slate-600">Manage your services, pricing, and availability</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
          <Plus className="h-4 w-4 mr-2" />
          Add New Service
        </Button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id} className={`${!service.active ? 'opacity-60' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <Badge variant={service.active ? "default" : "secondary"}>
                  {service.active ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">{service.description}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-sm text-slate-600">
                  <Clock className="h-3 w-3" />
                  {service.duration} min
                </div>
                <div className="flex items-center gap-1 text-lg font-semibold text-slate-900">
                  <DollarSign className="h-4 w-4" />
                  {service.price}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleToggleService(service.id)}
                >
                  {service.active ? 'Disable' : 'Enable'}
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-3 w-3" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeleteService(service.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">{services.filter(s => s.active).length}</div>
              <div className="text-sm text-slate-600">Active Services</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">
                ${Math.round(services.filter(s => s.active).reduce((acc, s) => acc + s.price, 0) / services.filter(s => s.active).length)}
              </div>
              <div className="text-sm text-slate-600">Average Price</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">
                {Math.round(services.filter(s => s.active).reduce((acc, s) => acc + s.duration, 0) / services.filter(s => s.active).length)} min
              </div>
              <div className="text-sm text-slate-600">Average Duration</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceManagement;
