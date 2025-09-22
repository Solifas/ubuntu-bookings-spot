// Mock data service - Simulates API responses with realistic data
import {
    Service,
    Business,
    Booking,
    BookingWithDetails,
    DashboardStats,
    CityInfo,
    ServiceSearchResponse,
    ServiceWithBusiness,
    BookingStatus,
    UserType
} from '../types/api';
import { dataSourceConfig } from '../config/dataSource';

// Utility function to simulate API delay
const simulateDelay = async (ms: number = dataSourceConfig.mock.delayMs) => {
    if (dataSourceConfig.mock.simulateDelay) {
        await new Promise(resolve => setTimeout(resolve, ms));
    }
};

// Utility function to simulate API errors
const simulateError = () => {
    if (dataSourceConfig.mock.simulateErrors && Math.random() < dataSourceConfig.mock.errorRate) {
        throw new Error('Simulated API error for testing');
    }
};

// Mock data
const mockServices: Service[] = [
    {
        id: '1',
        businessId: 'bus1',
        name: 'Premium Men\'s Haircut',
        description: 'Professional men\'s haircut with styling and beard trim',
        category: 'Hair Salon',
        price: 150,
        durationMinutes: 60,
        imageUrl: '/placeholder.svg',
        tags: ['men', 'haircut', 'beard', 'styling'],
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
    },
    {
        id: '2',
        businessId: 'bus2',
        name: 'Ladies Hair Styling',
        description: 'Complete hair styling service including wash, cut, and blow-dry',
        category: 'Hair Salon',
        price: 280,
        durationMinutes: 90,
        imageUrl: '/placeholder.svg',
        tags: ['women', 'styling', 'wash', 'cut'],
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
    },
    {
        id: '3',
        businessId: 'bus3',
        name: 'Relaxing Facial Treatment',
        description: 'Deep cleansing facial with moisturizing treatment',
        category: 'Beauty Therapy',
        price: 320,
        durationMinutes: 75,
        imageUrl: '/placeholder.svg',
        tags: ['facial', 'skincare', 'relaxing', 'cleansing'],
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
    },
    {
        id: '4',
        businessId: 'bus4',
        name: 'Deep Tissue Massage',
        description: 'Therapeutic deep tissue massage for muscle tension relief',
        category: 'Massage Therapy',
        price: 450,
        durationMinutes: 90,
        imageUrl: '/placeholder.svg',
        tags: ['massage', 'therapeutic', 'muscle', 'relaxation'],
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
    },
    {
        id: '5',
        businessId: 'bus5',
        name: 'Personal Training Session',
        description: 'One-on-one fitness training session with customized workout plan',
        category: 'Fitness',
        price: 400,
        durationMinutes: 60,
        imageUrl: '/placeholder.svg',
        tags: ['fitness', 'training', 'workout', 'health'],
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
    },
    {
        id: '6',
        businessId: 'bus6',
        name: 'Math Tutoring',
        description: 'High school mathematics tutoring for grades 10-12',
        category: 'Education',
        price: 250,
        durationMinutes: 60,
        imageUrl: '/placeholder.svg',
        tags: ['education', 'math', 'tutoring', 'high school'],
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
    },
    {
        id: '7',
        businessId: 'bus7',
        name: 'Emergency Plumbing',
        description: '24/7 emergency plumbing services for residential and commercial',
        category: 'Home Services',
        price: 350,
        durationMinutes: 120,
        imageUrl: '/placeholder.svg',
        tags: ['plumbing', 'emergency', '24/7', 'repair'],
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
    },
    {
        id: '8',
        businessId: 'bus8',
        name: 'Electrical Installation',
        description: 'Professional electrical installation and maintenance services',
        category: 'Home Services',
        price: 300,
        durationMinutes: 90,
        imageUrl: '/placeholder.svg',
        tags: ['electrical', 'installation', 'maintenance', 'professional'],
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
    },
    {
        id: '9',
        businessId: 'bus9',
        name: 'Deep Cleansing Facial',
        description: 'Advanced deep cleansing facial treatment with organic products',
        category: 'Beauty Therapy',
        price: 380,
        durationMinutes: 90,
        imageUrl: '/placeholder.svg',
        tags: ['facial', 'deep', 'cleansing', 'organic', 'skincare'],
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
    },
    {
        id: '10',
        businessId: 'bus10',
        name: 'Deep Sea Diving Lessons',
        description: 'Professional deep sea diving lessons for beginners',
        category: 'Adventure Sports',
        price: 800,
        durationMinutes: 180,
        imageUrl: '/placeholder.svg',
        tags: ['diving', 'deep', 'sea', 'adventure', 'lessons'],
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
    },
    {
        id: '11',
        businessId: 'bus11',
        name: 'Deep House Cleaning',
        description: 'Comprehensive deep house cleaning service for homes',
        category: 'Cleaning Services',
        price: 500,
        durationMinutes: 240,
        imageUrl: '/placeholder.svg',
        tags: ['cleaning', 'deep', 'house', 'comprehensive', 'home'],
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
    }
];

const mockBusinesses: Business[] = [
    {
        id: 'bus1',
        providerId: 'prov1',
        businessName: 'Premium Cuts Barber Shop',
        description: 'Professional barber services for the modern gentleman',
        city: 'Johannesburg',
        address: 'Sandton City Mall, Johannesburg',
        phone: '+27 11 123 4567',
        email: 'contact@premiumcuts.co.za',
        website: 'https://premiumcuts.co.za',
        imageUrl: '/placeholder.svg',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
    },
    {
        id: 'bus2',
        providerId: 'prov2',
        businessName: 'Glamour Hair Salon',
        description: 'Complete hair styling services for women',
        city: 'Johannesburg',
        address: 'Rosebank Mall, Johannesburg',
        phone: '+27 11 234 5678',
        email: 'bookings@glamoursalon.co.za',
        website: 'https://glamoursalon.co.za',
        imageUrl: '/placeholder.svg',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
    },
    {
        id: 'bus3',
        providerId: 'prov3',
        businessName: 'Serenity Beauty Spa',
        description: 'Luxury beauty treatments and skincare services',
        city: 'Cape Town',
        address: 'V&A Waterfront, Cape Town',
        phone: '+27 21 123 4567',
        email: 'bookings@serenityspa.co.za',
        website: 'https://serenityspa.co.za',
        imageUrl: '/placeholder.svg',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
    },
    {
        id: 'bus4',
        providerId: 'prov4',
        businessName: 'Wellness Massage Therapy',
        description: 'Professional therapeutic massage services',
        city: 'Durban',
        address: 'Gateway Mall, Durban',
        phone: '+27 31 123 4567',
        email: 'info@wellnessmassage.co.za',
        website: 'https://wellnessmassage.co.za',
        imageUrl: '/placeholder.svg',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
    },
    {
        id: 'bus5',
        providerId: 'prov5',
        businessName: 'FitZone Personal Training',
        description: 'Professional personal training and fitness coaching',
        city: 'Pretoria',
        address: 'Menlyn Park, Pretoria',
        phone: '+27 12 123 4567',
        email: 'training@fitzone.co.za',
        website: 'https://fitzone.co.za',
        imageUrl: '/placeholder.svg',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
    },
    {
        id: 'bus6',
        providerId: 'prov6',
        businessName: 'Smart Tutoring Academy',
        description: 'Academic tutoring services for all subjects',
        city: 'Stellenbosch',
        address: 'Eikestad Mall, Stellenbosch',
        phone: '+27 21 456 7890',
        email: 'tutors@smartacademy.co.za',
        website: 'https://smartacademy.co.za',
        imageUrl: '/placeholder.svg',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
    },
    {
        id: 'bus7',
        providerId: 'prov7',
        businessName: 'QuickFix Plumbing',
        description: '24/7 emergency plumbing and repair services',
        city: 'Johannesburg',
        address: 'Randburg, Johannesburg',
        phone: '+27 11 789 0123',
        email: 'emergency@quickfix.co.za',
        website: 'https://quickfix.co.za',
        imageUrl: '/placeholder.svg',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
    },
    {
        id: 'bus8',
        providerId: 'prov8',
        businessName: 'PowerPro Electrical',
        description: 'Professional electrical installation and repair services',
        city: 'Cape Town',
        address: 'Century City, Cape Town',
        phone: '+27 21 345 6789',
        email: 'service@powerpro.co.za',
        website: 'https://powerpro.co.za',
        imageUrl: '/placeholder.svg',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
    },
    {
        id: 'bus9',
        providerId: 'prov9',
        businessName: 'Organic Beauty Studio',
        description: 'Natural and organic beauty treatments',
        city: 'Johannesburg',
        address: 'Hyde Park, Johannesburg',
        phone: '+27 11 456 7890',
        email: 'bookings@organicbeauty.co.za',
        website: 'https://organicbeauty.co.za',
        imageUrl: '/placeholder.svg',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
    },
    {
        id: 'bus10',
        providerId: 'prov10',
        businessName: 'Ocean Adventures Diving',
        description: 'Professional diving lessons and underwater adventures',
        city: 'Cape Town',
        address: 'Camps Bay, Cape Town',
        phone: '+27 21 567 8901',
        email: 'dive@oceanadventures.co.za',
        website: 'https://oceanadventures.co.za',
        imageUrl: '/placeholder.svg',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
    },
    {
        id: 'bus11',
        providerId: 'prov11',
        businessName: 'SparkleClean Services',
        description: 'Professional deep cleaning services for homes and offices',
        city: 'Durban',
        address: 'Umhlanga, Durban',
        phone: '+27 31 678 9012',
        email: 'clean@sparkleclean.co.za',
        website: 'https://sparkleclean.co.za',
        imageUrl: '/placeholder.svg',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
    }
    // Add more businesses as needed...
];

const mockCities: CityInfo[] = [
    { city: 'Johannesburg', province: 'Gauteng', serviceCount: 45 },
    { city: 'Cape Town', province: 'Western Cape', serviceCount: 38 },
    { city: 'Durban', province: 'KwaZulu-Natal', serviceCount: 29 },
    { city: 'Pretoria', province: 'Gauteng', serviceCount: 22 },
    { city: 'Port Elizabeth', province: 'Eastern Cape', serviceCount: 15 },
    { city: 'Bloemfontein', province: 'Free State', serviceCount: 12 },
    { city: 'Stellenbosch', province: 'Western Cape', serviceCount: 18 },
    { city: 'Sandton', province: 'Gauteng', serviceCount: 31 }
];

const mockBookings: BookingWithDetails[] = [
    // Today's bookings
    {
        id: '1',
        serviceId: '1',
        clientId: 'client1',
        providerId: 'prov1',
        startTime: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
        endTime: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
        status: BookingStatus.CONFIRMED,
        createdAt: new Date().toISOString(),
        service: mockServices[0],
        client: {
            id: 'client1',
            fullName: 'Sarah Johnson',
            email: 'sarah@example.com',
            contactNumber: '+27 11 555 0123'
        },
        business: {
            id: 'bus1',
            businessName: 'Premium Cuts Barber Shop',
            city: 'Johannesburg'
        }
    },
    {
        id: '2',
        serviceId: '2',
        clientId: 'client2',
        providerId: 'prov1',
        startTime: new Date(new Date().setHours(11, 30, 0, 0)).toISOString(),
        endTime: new Date(new Date().setHours(13, 0, 0, 0)).toISOString(),
        status: BookingStatus.CONFIRMED,
        createdAt: new Date().toISOString(),
        service: mockServices[1],
        client: {
            id: 'client2',
            fullName: 'Mike Brown',
            email: 'mike@example.com',
            contactNumber: '+27 11 555 0456'
        },
        business: {
            id: 'bus1',
            businessName: 'Premium Cuts Barber Shop',
            city: 'Johannesburg'
        }
    },
    {
        id: '3',
        serviceId: '1',
        clientId: 'client3',
        providerId: 'prov1',
        startTime: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
        endTime: new Date(new Date().setHours(15, 0, 0, 0)).toISOString(),
        status: BookingStatus.PENDING,
        createdAt: new Date().toISOString(),
        service: mockServices[0],
        client: {
            id: 'client3',
            fullName: 'Alex Wilson',
            email: 'alex@example.com',
            contactNumber: '+27 11 555 0789'
        },
        business: {
            id: 'bus1',
            businessName: 'Premium Cuts Barber Shop',
            city: 'Johannesburg'
        }
    },
    {
        id: '4',
        serviceId: '3',
        clientId: 'client4',
        providerId: 'prov1',
        startTime: new Date(new Date().setHours(16, 30, 0, 0)).toISOString(),
        endTime: new Date(new Date().setHours(17, 30, 0, 0)).toISOString(),
        status: BookingStatus.CONFIRMED,
        createdAt: new Date().toISOString(),
        service: mockServices[2],
        client: {
            id: 'client4',
            fullName: 'Emma Davis',
            email: 'emma@example.com',
            contactNumber: '+27 11 555 0321'
        },
        business: {
            id: 'bus1',
            businessName: 'Premium Cuts Barber Shop',
            city: 'Johannesburg'
        }
    },
    // Tomorrow's bookings
    {
        id: '5',
        serviceId: '1',
        clientId: 'client5',
        providerId: 'prov1',
        startTime: new Date(new Date(Date.now() + 24 * 60 * 60 * 1000).setHours(10, 0, 0, 0)).toISOString(),
        endTime: new Date(new Date(Date.now() + 24 * 60 * 60 * 1000).setHours(11, 0, 0, 0)).toISOString(),
        status: BookingStatus.CONFIRMED,
        createdAt: new Date().toISOString(),
        service: mockServices[0],
        client: {
            id: 'client5',
            fullName: 'John Smith',
            email: 'john@example.com',
            contactNumber: '+27 11 555 0654'
        },
        business: {
            id: 'bus1',
            businessName: 'Premium Cuts Barber Shop',
            city: 'Johannesburg'
        }
    },
    {
        id: '6',
        serviceId: '2',
        clientId: 'client6',
        providerId: 'prov1',
        startTime: new Date(new Date(Date.now() + 24 * 60 * 60 * 1000).setHours(13, 0, 0, 0)).toISOString(),
        endTime: new Date(new Date(Date.now() + 24 * 60 * 60 * 1000).setHours(14, 30, 0, 0)).toISOString(),
        status: BookingStatus.CONFIRMED,
        createdAt: new Date().toISOString(),
        service: mockServices[1],
        client: {
            id: 'client6',
            fullName: 'Lisa Garcia',
            email: 'lisa@example.com',
            contactNumber: '+27 11 555 0987'
        },
        business: {
            id: 'bus1',
            businessName: 'Premium Cuts Barber Shop',
            city: 'Johannesburg'
        }
    },
    // Pending booking requests
    {
        id: '7',
        serviceId: '4',
        clientId: 'client7',
        providerId: 'prov1',
        startTime: new Date(new Date(Date.now() + 24 * 60 * 60 * 1000).setHours(15, 0, 0, 0)).toISOString(),
        endTime: new Date(new Date(Date.now() + 24 * 60 * 60 * 1000).setHours(16, 0, 0, 0)).toISOString(),
        status: BookingStatus.PENDING,
        createdAt: new Date().toISOString(),
        service: mockServices[3],
        client: {
            id: 'client7',
            fullName: 'David Lee',
            email: 'david@example.com',
            contactNumber: '+27 11 555 1234'
        },
        business: {
            id: 'bus1',
            businessName: 'Premium Cuts Barber Shop',
            city: 'Johannesburg'
        }
    },
    {
        id: '8',
        serviceId: '1',
        clientId: 'client8',
        providerId: 'prov1',
        startTime: new Date(new Date(Date.now() + 48 * 60 * 60 * 1000).setHours(9, 30, 0, 0)).toISOString(),
        endTime: new Date(new Date(Date.now() + 48 * 60 * 60 * 1000).setHours(10, 30, 0, 0)).toISOString(),
        status: BookingStatus.PENDING,
        createdAt: new Date().toISOString(),
        service: mockServices[0],
        client: {
            id: 'client8',
            fullName: 'Sophie Chen',
            email: 'sophie@example.com',
            contactNumber: '+27 11 555 5678'
        },
        business: {
            id: 'bus1',
            businessName: 'Premium Cuts Barber Shop',
            city: 'Johannesburg'
        }
    },
    {
        id: '9',
        serviceId: '2',
        clientId: 'client9',
        providerId: 'prov1',
        startTime: new Date(new Date(Date.now() + 72 * 60 * 60 * 1000).setHours(14, 0, 0, 0)).toISOString(),
        endTime: new Date(new Date(Date.now() + 72 * 60 * 60 * 1000).setHours(15, 30, 0, 0)).toISOString(),
        status: BookingStatus.PENDING,
        createdAt: new Date().toISOString(),
        service: mockServices[1],
        client: {
            id: 'client9',
            fullName: 'Michael Johnson',
            email: 'michael@example.com',
            contactNumber: '+27 11 555 9876'
        },
        business: {
            id: 'bus1',
            businessName: 'Premium Cuts Barber Shop',
            city: 'Johannesburg'
        }
    },
    {
        id: '10',
        serviceId: '3',
        clientId: 'client10',
        providerId: 'prov1',
        startTime: new Date(new Date(Date.now() + 96 * 60 * 60 * 1000).setHours(11, 0, 0, 0)).toISOString(),
        endTime: new Date(new Date(Date.now() + 96 * 60 * 60 * 1000).setHours(12, 0, 0, 0)).toISOString(),
        status: BookingStatus.PENDING,
        createdAt: new Date().toISOString(),
        service: mockServices[2],
        client: {
            id: 'client10',
            fullName: 'Rachel Green',
            email: 'rachel@example.com',
            contactNumber: '+27 11 555 4321'
        },
        business: {
            id: 'bus1',
            businessName: 'Premium Cuts Barber Shop',
            city: 'Johannesburg'
        }
    }
];

// Mock Data Service Class
export class MockDataService {
    // Services
    static async searchServices(params: any): Promise<ServiceSearchResponse> {
        await simulateDelay();
        simulateError();

        let filteredServices = mockServices;

        // Apply filters with enhanced partial matching
        if (params.name) {
            const searchTerm = params.name.toLowerCase();
            filteredServices = filteredServices.filter(service => {
                // Search in name, description, category, and tags
                const nameMatch = service.name.toLowerCase().includes(searchTerm);
                const descriptionMatch = service.description.toLowerCase().includes(searchTerm);
                const categoryMatch = service.category?.toLowerCase().includes(searchTerm);
                const tagsMatch = service.tags?.some(tag => tag.toLowerCase().includes(searchTerm));
                
                return nameMatch || descriptionMatch || categoryMatch || tagsMatch;
            });
        }

        if (params.category) {
            filteredServices = filteredServices.filter(service =>
                service.category?.toLowerCase().includes(params.category.toLowerCase())
            );
        }

        if (params.city) {
            const businessesInCity = mockBusinesses.filter(business =>
                business.city.toLowerCase().includes(params.city.toLowerCase())
            );
            const businessIds = businessesInCity.map(b => b.id);
            filteredServices = filteredServices.filter(service =>
                businessIds.includes(service.businessId)
            );
        }

        if (params.minPrice) {
            filteredServices = filteredServices.filter(service => service.price >= params.minPrice);
        }

        if (params.maxPrice) {
            filteredServices = filteredServices.filter(service => service.price <= params.maxPrice);
        }

        // Pagination
        const page = params.page || 1;
        const pageSize = params.pageSize || 10;
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedServices = filteredServices.slice(startIndex, endIndex);

        // Convert to ServiceWithBusiness format
        const servicesWithBusiness: ServiceWithBusiness[] = paginatedServices.map(service => {
            const business = mockBusinesses.find(b => b.id === service.businessId);
            return {
                ...service,
                business: {
                    id: business?.id || '',
                    businessName: business?.businessName || 'Unknown Business',
                    city: business?.city || 'Unknown City',
                    address: business?.address,
                    phone: business?.phone,
                    email: business?.email,
                    rating: 4.5, // Mock rating
                    reviewCount: Math.floor(Math.random() * 200) + 10
                }
            };
        });

        return {
            services: servicesWithBusiness,
            totalCount: filteredServices.length,
            page,
            pageSize,
            totalPages: Math.ceil(filteredServices.length / pageSize)
        };
    }

    static async getServices(): Promise<Service[]> {
        await simulateDelay();
        simulateError();
        return mockServices;
    }

    static async getService(id: string): Promise<Service | null> {
        await simulateDelay();
        simulateError();
        return mockServices.find(s => s.id === id) || null;
    }

    static async getBusinessServices(businessId: string): Promise<Service[]> {
        await simulateDelay();
        simulateError();
        return mockServices.filter(s => s.businessId === businessId);
    }

    // Bookings
    static async getProviderBookings(
        providerId: string,
        status?: BookingStatus,
        startDate?: string,
        endDate?: string
    ): Promise<BookingWithDetails[]> {
        await simulateDelay();
        simulateError();

        let filteredBookings = mockBookings.filter(b => b.providerId === providerId);

        if (status) {
            filteredBookings = filteredBookings.filter(b => b.status === status);
        }

        if (startDate) {
            filteredBookings = filteredBookings.filter(b =>
                new Date(b.startTime) >= new Date(startDate)
            );
        }

        if (endDate) {
            filteredBookings = filteredBookings.filter(b =>
                new Date(b.startTime) <= new Date(endDate)
            );
        }

        return filteredBookings;
    }

    static async getClientBookings(clientId: string): Promise<BookingWithDetails[]> {
        await simulateDelay();
        simulateError();
        return mockBookings.filter(b => b.clientId === clientId);
    }

    static async getDashboardStats(providerId: string): Promise<DashboardStats> {
        await simulateDelay();
        simulateError();

        const providerBookings = mockBookings.filter(b => b.providerId === providerId);
        const today = new Date();
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

        const todayBookings = providerBookings.filter(b => {
            const bookingDate = new Date(b.startTime);
            return bookingDate.toDateString() === today.toDateString();
        }).length;

        const weekBookings = providerBookings.filter(b => {
            const bookingDate = new Date(b.startTime);
            return bookingDate >= weekAgo;
        }).length;

        const monthlyRevenue = providerBookings
            .filter(b => {
                const bookingDate = new Date(b.startTime);
                return bookingDate >= monthAgo && b.status === BookingStatus.COMPLETED;
            })
            .reduce((total, booking) => total + booking.service.price, 0);

        return {
            todayBookings,
            weekBookings,
            totalClients: Math.floor(Math.random() * 200) + 50, // Mock data
            monthlyRevenue,
            pendingBookings: providerBookings.filter(b => b.status === BookingStatus.PENDING).length,
            confirmedBookings: providerBookings.filter(b => b.status === BookingStatus.CONFIRMED).length
        };
    }

    // Cities
    static async getCities(): Promise<CityInfo[]> {
        await simulateDelay();
        simulateError();
        return mockCities;
    }

    // Business
    static async getBusiness(id: string): Promise<Business | null> {
        await simulateDelay();
        simulateError();
        return mockBusinesses.find(b => b.id === id) || null;
    }

    // Create/Update operations (simplified for mock)
    static async createService(data: any): Promise<Service> {
        await simulateDelay();
        simulateError();

        const newService: Service = {
            id: `mock-${Date.now()}`,
            businessId: data.businessId,
            name: data.name,
            description: data.description,
            category: data.category,
            price: data.price,
            durationMinutes: data.durationMinutes,
            imageUrl: data.imageUrl,
            tags: data.tags || [],
            isActive: data.isActive ?? true,
            createdAt: new Date().toISOString()
        };

        mockServices.push(newService);
        return newService;
    }

    static async updateBookingStatus(bookingId: string, status: BookingStatus): Promise<BookingWithDetails | null> {
        await simulateDelay();
        simulateError();

        const booking = mockBookings.find(b => b.id === bookingId);
        if (booking) {
            booking.status = status;
            return booking;
        }
        return null;
    }
}