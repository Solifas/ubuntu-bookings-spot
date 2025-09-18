// Enhanced search service for services and businesses
import { DataSourceAdapter } from './dataSourceAdapter';
import { ServiceSearchParams, ServiceSearchResponse, ServiceWithBusiness } from '../types/api';
import { Service as FrontendService } from '../data/servicesData';
import { adaptServiceWithBusinessToFrontend } from './serviceAdapter';

export class SearchService {
    // Search services with enhanced filtering
    static async searchServices(params: ServiceSearchParams): Promise<{
        services: FrontendService[];
        totalCount: number;
        page: number;
        pageSize: number;
        totalPages: number;
    }> {
        try {
            const response = await DataSourceAdapter.searchServices(params);

            if (response.error) {
                throw new Error(response.error);
            }

            if (!response.data) {
                return {
                    services: [],
                    totalCount: 0,
                    page: 1,
                    pageSize: 10,
                    totalPages: 0
                };
            }

            // Convert API services to frontend format
            const frontendServices = response.data.services.map(adaptServiceWithBusinessToFrontend);

            return {
                services: frontendServices,
                totalCount: response.data.totalCount,
                page: response.data.page,
                pageSize: response.data.pageSize,
                totalPages: response.data.totalPages
            };
        } catch (error) {
            console.error('Search services failed:', error);
            throw error;
        }
    }

    // Get services by business
    static async getServicesByBusiness(businessId: string): Promise<FrontendService[]> {
        try {
            const response = await DataSourceAdapter.getBusinessServices(businessId);

            if (response.error) {
                throw new Error(response.error);
            }

            if (!response.data) {
                return [];
            }

            // For now, we'll need to get business info separately
            // In a real implementation, you might want to create a new endpoint
            // that returns services with business info embedded
            const businessResponse = await DataSourceAdapter.getBusiness(businessId);
            const businessInfo = businessResponse.data;

            return response.data.map(service =>
                adaptApiServiceToFrontend(service, businessInfo ? {
                    name: businessInfo.businessName,
                    city: businessInfo.city,
                    address: businessInfo.address,
                    phone: businessInfo.phone,
                    email: businessInfo.email
                } : undefined)
            );
        } catch (error) {
            console.error('Get services by business failed:', error);
            throw error;
        }
    }

    // Helper method to build search parameters
    static buildSearchParams(
        query?: string,
        location?: string,
        category?: string,
        priceRange?: { min?: number; max?: number },
        durationRange?: { min?: number; max?: number },
        page: number = 1,
        pageSize: number = 10
    ): ServiceSearchParams {
        return {
            name: query,
            city: location,
            category,
            minPrice: priceRange?.min,
            maxPrice: priceRange?.max,
            minDuration: durationRange?.min,
            maxDuration: durationRange?.max,
            page,
            pageSize
        };
    }
}

// Import the adapter function
import { adaptApiServiceToFrontend } from './serviceAdapter';