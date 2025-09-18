// Service adapter to bridge API data and frontend display data
import { Service as ApiService, ServiceWithBusiness, Business } from '../types/api';
import { Service as FrontendService } from '../data/servicesData';

export const adaptApiServiceToFrontend = (
    apiService: ApiService,
    businessInfo?: { name: string; city: string; address?: string; phone?: string; email?: string; rating?: number; reviewCount?: number }
): FrontendService => {
    return {
        id: apiService.id,
        name: apiService.name,
        type: apiService.category || businessInfo?.name || 'Service Provider',
        description: apiService.description || `${apiService.name} - ${apiService.durationMinutes} minutes`,
        price: `R${apiService.price.toFixed(0)}`,
        rating: businessInfo?.rating || 4.5,
        reviewCount: businessInfo?.reviewCount || 0,
        location: businessInfo?.address || businessInfo?.city || 'Location TBD',
        availability: apiService.isActive ? 'Available' : 'Unavailable',
        image: apiService.imageUrl || '/placeholder.svg',
        phone: businessInfo?.phone || '+27 XX XXX XXXX',
        email: businessInfo?.email || 'contact@provider.co.za',
        tags: apiService.tags || [apiService.name.toLowerCase().replace(/\s+/g, '-')]
    };
};

export const adaptServiceWithBusinessToFrontend = (
    serviceWithBusiness: ServiceWithBusiness
): FrontendService => {
    return adaptApiServiceToFrontend(serviceWithBusiness, {
        name: serviceWithBusiness.business.businessName,
        city: serviceWithBusiness.business.city,
        address: serviceWithBusiness.business.address,
        phone: serviceWithBusiness.business.phone,
        email: serviceWithBusiness.business.email,
        rating: serviceWithBusiness.business.rating,
        reviewCount: serviceWithBusiness.business.reviewCount
    });
};

export const adaptFrontendServiceToApi = (
    frontendService: Partial<FrontendService>,
    businessId: string
): {
    businessId: string;
    name: string;
    description?: string;
    category?: string;
    price: number;
    durationMinutes: number;
    imageUrl?: string;
    tags?: string[];
    isActive: boolean;
} => {
    return {
        businessId,
        name: frontendService.name || '',
        description: frontendService.description,
        category: frontendService.type,
        price: parseFloat(frontendService.price?.replace('R', '') || '0'),
        durationMinutes: 60, // Default duration, should be configurable
        imageUrl: frontendService.image !== '/placeholder.svg' ? frontendService.image : undefined,
        tags: frontendService.tags,
        isActive: frontendService.availability === 'Available'
    };
};