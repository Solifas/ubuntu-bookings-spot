// Data source adapter - Routes requests to either API or Mock data based on configuration
import { isApiMode, getCurrentMode } from '../config/dataSource';
import { apiClient } from './api';
import { MockDataService } from './mockDataService';
import {
    Service,
    ServiceSearchParams,
    ServiceSearchResponse,
    BookingWithDetails,
    BookingStatus,
    DashboardStats,
    CityInfo,
    Business,
    CreateServiceCommand,
    UpdateServiceCommand,
    CreateBookingCommand,
    Booking
} from '../types/api';

// Generic response wrapper to match API client structure
interface DataSourceResponse<T> {
    data?: T;
    error?: string;
    status: number;
}

// Data Source Adapter Class
export class DataSourceAdapter {
    // Services
    static async searchServices(params: ServiceSearchParams): Promise<DataSourceResponse<ServiceSearchResponse>> {
        try {
            if (isApiMode()) {
                console.log('🌐 Using API for searchServices - Current mode:', getCurrentMode());
                return await apiClient.searchServices(params);
            } else {
                console.log('🎭 Using Mock data for searchServices - Current mode:', getCurrentMode());
                const data = await MockDataService.searchServices(params);
                return { data, status: 200 };
            }
        } catch (error) {
            console.error('DataSourceAdapter.searchServices error:', error);
            return {
                error: error instanceof Error ? error.message : 'Unknown error',
                status: 500
            };
        }
    }

    static async getServices(): Promise<DataSourceResponse<Service[]>> {
        try {
            if (isApiMode()) {
                console.log('🌐 Using API for getServices');
                return await apiClient.getServices();
            } else {
                console.log('🎭 Using Mock data for getServices');
                const data = await MockDataService.getServices();
                return { data, status: 200 };
            }
        } catch (error) {
            console.error('DataSourceAdapter.getServices error:', error);
            return {
                error: error instanceof Error ? error.message : 'Unknown error',
                status: 500
            };
        }
    }

    static async getService(id: string): Promise<DataSourceResponse<Service>> {
        try {
            if (isApiMode()) {
                console.log('🌐 Using API for getService');
                return await apiClient.getService(id);
            } else {
                console.log('🎭 Using Mock data for getService');
                const data = await MockDataService.getService(id);
                if (!data) {
                    return { error: 'Service not found', status: 404 };
                }
                return { data, status: 200 };
            }
        } catch (error) {
            console.error('DataSourceAdapter.getService error:', error);
            return {
                error: error instanceof Error ? error.message : 'Unknown error',
                status: 500
            };
        }
    }

    static async getBusinessServices(businessId: string): Promise<DataSourceResponse<Service[]>> {
        try {
            if (isApiMode()) {
                console.log('🌐 Using API for getBusinessServices');
                return await apiClient.getBusinessServices(businessId);
            } else {
                console.log('🎭 Using Mock data for getBusinessServices');
                const data = await MockDataService.getBusinessServices(businessId);
                return { data, status: 200 };
            }
        } catch (error) {
            console.error('DataSourceAdapter.getBusinessServices error:', error);
            return {
                error: error instanceof Error ? error.message : 'Unknown error',
                status: 500
            };
        }
    }

    static async createService(data: CreateServiceCommand): Promise<DataSourceResponse<Service>> {
        try {
            if (isApiMode()) {
                console.log('🌐 Using API for createService');
                return await apiClient.createService(data);
            } else {
                console.log('🎭 Using Mock data for createService');
                const service = await MockDataService.createService(data);
                return { data: service, status: 201 };
            }
        } catch (error) {
            console.error('DataSourceAdapter.createService error:', error);
            return {
                error: error instanceof Error ? error.message : 'Unknown error',
                status: 500
            };
        }
    }

    static async updateService(id: string, data: UpdateServiceCommand): Promise<DataSourceResponse<Service>> {
        try {
            if (isApiMode()) {
                console.log('🌐 Using API for updateService');
                return await apiClient.updateService(id, data);
            } else {
                console.log('🎭 Using Mock data for updateService');
                // For mock, we'll just return the updated data
                const existingService = await MockDataService.getService(id);
                if (!existingService) {
                    return { error: 'Service not found', status: 404 };
                }
                const updatedService = { ...existingService, ...data };
                return { data: updatedService, status: 200 };
            }
        } catch (error) {
            console.error('DataSourceAdapter.updateService error:', error);
            return {
                error: error instanceof Error ? error.message : 'Unknown error',
                status: 500
            };
        }
    }

    static async deleteService(id: string): Promise<DataSourceResponse<void>> {
        try {
            if (isApiMode()) {
                console.log('🌐 Using API for deleteService');
                return await apiClient.deleteService(id);
            } else {
                console.log('🎭 Using Mock data for deleteService');
                // For mock, we'll just simulate success
                return { status: 204 };
            }
        } catch (error) {
            console.error('DataSourceAdapter.deleteService error:', error);
            return {
                error: error instanceof Error ? error.message : 'Unknown error',
                status: 500
            };
        }
    }

    // Bookings
    static async getProviderBookings(
        providerId: string,
        status?: BookingStatus,
        startDate?: string,
        endDate?: string
    ): Promise<DataSourceResponse<BookingWithDetails[]>> {
        try {
            if (isApiMode()) {
                console.log('🌐 Using API for getProviderBookings');
                return await apiClient.getProviderBookings(providerId, status, startDate, endDate);
            } else {
                console.log('🎭 Using Mock data for getProviderBookings');
                const data = await MockDataService.getProviderBookings(providerId, status, startDate, endDate);
                return { data, status: 200 };
            }
        } catch (error) {
            console.error('DataSourceAdapter.getProviderBookings error:', error);
            return {
                error: error instanceof Error ? error.message : 'Unknown error',
                status: 500
            };
        }
    }

    static async getClientBookings(clientId: string): Promise<DataSourceResponse<BookingWithDetails[]>> {
        try {
            if (isApiMode()) {
                console.log('🌐 Using API for getClientBookings');
                return await apiClient.getClientBookings(clientId);
            } else {
                console.log('🎭 Using Mock data for getClientBookings');
                const data = await MockDataService.getClientBookings(clientId);
                return { data, status: 200 };
            }
        } catch (error) {
            console.error('DataSourceAdapter.getClientBookings error:', error);
            return {
                error: error instanceof Error ? error.message : 'Unknown error',
                status: 500
            };
        }
    }

    static async updateBookingStatus(bookingId: string, status: BookingStatus): Promise<DataSourceResponse<Booking>> {
        try {
            if (isApiMode()) {
                console.log('🌐 Using API for updateBookingStatus');
                return await apiClient.updateBooking(bookingId, { id: bookingId, status });
            } else {
                console.log('🎭 Using Mock data for updateBookingStatus');
                const data = await MockDataService.updateBookingStatus(bookingId, status);
                if (!data) {
                    return { error: 'Booking not found', status: 404 };
                }
                // Convert BookingWithDetails to Booking for consistency
                const booking: Booking = {
                    id: data.id,
                    serviceId: data.serviceId,
                    clientId: data.clientId,
                    providerId: data.providerId,
                    startTime: data.startTime,
                    endTime: data.endTime,
                    status: data.status,
                    createdAt: data.createdAt
                };
                return { data: booking, status: 200 };
            }
        } catch (error) {
            console.error('DataSourceAdapter.updateBookingStatus error:', error);
            return {
                error: error instanceof Error ? error.message : 'Unknown error',
                status: 500
            };
        }
    }

    // Dashboard
    static async getDashboardStats(providerId: string): Promise<DataSourceResponse<DashboardStats>> {
        try {
            if (isApiMode()) {
                console.log('🌐 Using API for getDashboardStats');
                return await apiClient.getDashboardStats(providerId);
            } else {
                console.log('🎭 Using Mock data for getDashboardStats');
                const data = await MockDataService.getDashboardStats(providerId);
                return { data, status: 200 };
            }
        } catch (error) {
            console.error('DataSourceAdapter.getDashboardStats error:', error);
            return {
                error: error instanceof Error ? error.message : 'Unknown error',
                status: 500
            };
        }
    }

    // Cities
    static async getCities(): Promise<DataSourceResponse<CityInfo[]>> {
        try {
            if (isApiMode()) {
                console.log('🌐 Using API for getCities');
                return await apiClient.getCities();
            } else {
                console.log('🎭 Using Mock data for getCities');
                const data = await MockDataService.getCities();
                return { data, status: 200 };
            }
        } catch (error) {
            console.error('DataSourceAdapter.getCities error:', error);
            return {
                error: error instanceof Error ? error.message : 'Unknown error',
                status: 500
            };
        }
    }

    // Business
    static async getBusiness(id: string): Promise<DataSourceResponse<Business>> {
        try {
            if (isApiMode()) {
                console.log('🌐 Using API for getBusiness');
                return await apiClient.getBusiness(id);
            } else {
                console.log('🎭 Using Mock data for getBusiness');
                const data = await MockDataService.getBusiness(id);
                if (!data) {
                    return { error: 'Business not found', status: 404 };
                }
                return { data, status: 200 };
            }
        } catch (error) {
            console.error('DataSourceAdapter.getBusiness error:', error);
            return {
                error: error instanceof Error ? error.message : 'Unknown error',
                status: 500
            };
        }
    }

    static async createBusiness(data: any): Promise<DataSourceResponse<Business>> {
        try {
            if (isApiMode()) {
                console.log('🌐 Using API for createBusiness');
                return await apiClient.createBusiness(data);
            } else {
                console.log('🎭 Using Mock data for createBusiness');
                // For mock, create a simple business object
                const newBusiness: Business = {
                    id: `mock-bus-${Date.now()}`,
                    providerId: 'mock-provider',
                    businessName: data.businessName,
                    description: data.description,
                    city: data.city,
                    address: data.address,
                    phone: data.phone,
                    email: data.email,
                    website: data.website,
                    imageUrl: data.imageUrl,
                    isActive: data.isActive ?? true,
                    createdAt: new Date().toISOString()
                };
                return { data: newBusiness, status: 201 };
            }
        } catch (error) {
            console.error('DataSourceAdapter.createBusiness error:', error);
            return {
                error: error instanceof Error ? error.message : 'Unknown error',
                status: 500
            };
        }
    }

    static async updateBusiness(id: string, data: any): Promise<DataSourceResponse<Business>> {
        try {
            if (isApiMode()) {
                console.log('🌐 Using API for updateBusiness');
                return await apiClient.updateBusiness(id, data);
            } else {
                console.log('🎭 Using Mock data for updateBusiness');
                const existing = await MockDataService.getBusiness(id);
                if (!existing) {
                    return { error: 'Business not found', status: 404 };
                }
                const updated = { ...existing, ...data };
                return { data: updated, status: 200 };
            }
        } catch (error) {
            console.error('DataSourceAdapter.updateBusiness error:', error);
            return {
                error: error instanceof Error ? error.message : 'Unknown error',
                status: 500
            };
        }
    }

    static async createBooking(data: CreateBookingCommand): Promise<DataSourceResponse<Booking>> {
        try {
            if (isApiMode()) {
                console.log('🌐 Using API for createBooking');
                return await apiClient.createBooking(data);
            } else {
                console.log('🎭 Using Mock data for createBooking');
                const newBooking: Booking = {
                    id: `mock-booking-${Date.now()}`,
                    serviceId: data.serviceId,
                    clientId: 'mock-client',
                    providerId: 'mock-provider',
                    startTime: data.startTime,
                    endTime: data.endTime,
                    status: BookingStatus.PENDING,
                    createdAt: new Date().toISOString()
                };
                return { data: newBooking, status: 201 };
            }
        } catch (error) {
            console.error('DataSourceAdapter.createBooking error:', error);
            return {
                error: error instanceof Error ? error.message : 'Unknown error',
                status: 500
            };
        }
    }

    static async getBooking(id: string): Promise<DataSourceResponse<Booking>> {
        try {
            if (isApiMode()) {
                console.log('🌐 Using API for getBooking');
                return await apiClient.getBooking(id);
            } else {
                console.log('🎭 Using Mock data for getBooking');
                // For mock, create a simple booking
                const booking: Booking = {
                    id,
                    serviceId: 'mock-service',
                    clientId: 'mock-client',
                    providerId: 'mock-provider',
                    startTime: new Date().toISOString(),
                    endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
                    status: BookingStatus.CONFIRMED,
                    createdAt: new Date().toISOString()
                };
                return { data: booking, status: 200 };
            }
        } catch (error) {
            console.error('DataSourceAdapter.getBooking error:', error);
            return {
                error: error instanceof Error ? error.message : 'Unknown error',
                status: 500
            };
        }
    }
}