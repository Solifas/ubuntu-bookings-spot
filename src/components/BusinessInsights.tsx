
import { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Clock, Star, Loader2 } from 'lucide-react';
import { DataSourceAdapter } from '../services/dataSourceAdapter';
import { isMockMode } from '../config/dataSource';
import { Badge } from '@/components/ui/badge';

interface PopularService {
  name: string;
  bookings: number;
  revenue: string;
}

const BusinessInsights = () => {
  const [popularServices, setPopularServices] = useState<PopularService[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - only used in mock mode
  const mockPopularServices: PopularService[] = [
    { name: 'Haircut & Beard Trim', bookings: 45, revenue: 'R8,100' },
    { name: 'Classic Haircut', bookings: 32, revenue: 'R3,840' },
    { name: 'Beard Styling', bookings: 28, revenue: 'R2,240' },
    { name: 'Hair Styling', bookings: 18, revenue: 'R1,800' }
  ];

  const insights = [
    {
      title: 'Revenue Growth',
      value: '+23%',
      description: 'vs last month',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Booking Rate',
      value: '87%',
      description: 'capacity utilized',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Avg Session',
      value: '45 min',
      description: 'per appointment',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Client Rating',
      value: '4.9',
      description: '127 reviews',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ];

  const recentMetrics = [
    { label: 'Today\'s Revenue', value: 'R1,240', change: '+12%' },
    { label: 'New Clients', value: '8', change: '+25%' },
    { label: 'Repeat Bookings', value: '15', change: '+8%' },
    { label: 'Cancellations', value: '2', change: '-50%' }
  ];

  // Load popular services based on data source mode
  useEffect(() => {
    const loadPopularServices = async () => {
      setLoading(true);

      try {
        if (isMockMode()) {
          // In mock mode, use hardcoded data
          console.log('🎭 BusinessInsights: Using mock popular services');
          setPopularServices(mockPopularServices);
        } else {
          // In API mode, fetch from backend
          console.log('🌐 BusinessInsights: Fetching popular services from API');

          // For now, we'll use mock data even in API mode since we don't have a specific endpoint
          // In a real implementation, you'd call something like:
          // const response = await DataSourceAdapter.getPopularServices('current-provider-id');
          setPopularServices([]);
        }
      } catch (err) {
        console.error('Failed to load popular services:', err);
        // Fallback to mock data in case of error
        if (isMockMode()) {
          setPopularServices(mockPopularServices);
        } else {
          setPopularServices([]);
        }
      } finally {
        setLoading(false);
      }
    };

    loadPopularServices();
  }, []);

  return (
    <div className="space-y-6">
      {/* Key Insights */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Business Insights</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {insights.map((insight, index) => (
            <div key={index} className="text-center">
              <div className={`w-12 h-12 ${insight.bgColor} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <insight.icon className={`h-6 w-6 ${insight.color}`} />
              </div>
              <div className="text-2xl font-bold text-slate-900">{insight.value}</div>
              <div className="text-sm text-slate-600">{insight.title}</div>
              <div className="text-xs text-slate-500 mt-1">{insight.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Metrics */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Today's Performance</h3>
        <div className="grid grid-cols-2 gap-4">
          {recentMetrics.map((metric, index) => (
            <div key={index} className="p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600">{metric.label}</div>
                  <div className="text-xl font-bold text-slate-900">{metric.value}</div>
                </div>
                <div className={`text-sm font-medium ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {metric.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Services */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Popular Services</h3>
          {isMockMode() && (
            <Badge variant="outline">Mock Mode</Badge>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
            <span className="ml-2 text-slate-600">Loading services...</span>
          </div>
        ) : popularServices.length > 0 ? (
          <div className="space-y-3">
            {popularServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div>
                  <div className="font-medium text-slate-900">{service.name}</div>
                  <div className="text-sm text-slate-600">{service.bookings} bookings</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900">{service.revenue}</div>
                  <div className="text-sm text-slate-600">revenue</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-slate-600">
              {isMockMode()
                ? "No popular services data available in mock mode"
                : "No service data available. Connect to your backend to see popular services."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessInsights;
