// API Configuration and HTTP Client
import {
    AuthResponse,
    RegisterRequest,
    Profile,
    UpdateProfileCommand,
    Service,
    CreateServiceCommand,
    UpdateServiceCommand,
    Booking,
    CreateBookingCommand,
    UpdateBookingCommand,
    Business,
    CreateBusinessCommand,
    UpdateBusinessCommand,
    BusinessHour,
    CreateBusinessHourCommand,
    UpdateBusinessHourCommand,
    Review,
    CreateReviewCommand,
    UpdateReviewCommand,
    ServiceSearchParams,
    ServiceSearchResponse,
    ServiceWithBusiness,
    BookingWithDetails,
    BookingStatus,
    DashboardStats,
    CityInfo
} from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

interface ApiResponse<T> {
    data?: T;
    error?: string;
    status: number;
}

class ApiClient {
    private baseURL: string;
    private token: string | null = null;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
        this.token = localStorage.getItem('authToken');
    }

    setToken(token: string) {
        this.token = token;
        localStorage.setItem('authToken', token);
    }

    clearToken() {
        this.token = null;
        localStorage.removeItem('authToken');
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const url = `${this.baseURL}${endpoint}`;

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (this.token) {
            headers.Authorization = `Bearer ${this.token}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers,
            });

            const data = await response.json();

            if (!response.ok) {
                return {
                    error: data.detail || data.title || 'An error occurred',
                    status: response.status,
                };
            }

            return {
                data,
                status: response.status,
            };
        } catch (error) {
            return {
                error: error instanceof Error ? error.message : 'Network error',
                status: 0,
            };
        }
    }

    // Auth endpoints
    async login(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
        return this.request<AuthResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    }

    async register(data: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
        return this.request<AuthResponse>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // Profile endpoints
    async getProfile(): Promise<ApiResponse<Profile>> {
        return this.request<Profile>('/profiles/me');
    }

    async updateProfile(id: string, data: UpdateProfileCommand): Promise<ApiResponse<Profile>> {
        return this.request<Profile>(`/profiles/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    // Services endpoints
    async getServices(): Promise<ApiResponse<Service[]>> {
        return this.request<Service[]>('/services');
    }

    async getService(id: string): Promise<ApiResponse<Service>> {
        return this.request<Service>(`/services/${id}`);
    }

    async createService(data: CreateServiceCommand): Promise<ApiResponse<Service>> {
        return this.request<Service>('/services', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateService(id: string, data: UpdateServiceCommand): Promise<ApiResponse<Service>> {
        return this.request<Service>(`/services/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async deleteService(id: string): Promise<ApiResponse<void>> {
        return this.request<void>(`/services/${id}`, {
            method: 'DELETE',
        });
    }

    async searchServices(params: ServiceSearchParams): Promise<ApiResponse<ServiceSearchResponse>> {
        const searchParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                searchParams.append(key, value.toString());
            }
        });

        const queryString = searchParams.toString();
        const endpoint = queryString ? `/services/search?${queryString}` : '/services/search';

        return this.request<ServiceSearchResponse>(endpoint);
    }

    // Bookings endpoints
    async createBooking(data: CreateBookingCommand): Promise<ApiResponse<Booking>> {
        return this.request<Booking>('/bookings', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async getBooking(id: string): Promise<ApiResponse<Booking>> {
        return this.request<Booking>(`/bookings/${id}`);
    }

    async updateBooking(id: string, data: UpdateBookingCommand): Promise<ApiResponse<Booking>> {
        return this.request<Booking>(`/bookings/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async deleteBooking(id: string): Promise<ApiResponse<void>> {
        return this.request<void>(`/bookings/${id}`, {
            method: 'DELETE',
        });
    }

    // Business endpoints
    async createBusiness(data: CreateBusinessCommand): Promise<ApiResponse<Business>> {
        return this.request<Business>('/businesses', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async getBusiness(id: string): Promise<ApiResponse<Business>> {
        return this.request<Business>(`/businesses/${id}`);
    }

    async updateBusiness(id: string, data: UpdateBusinessCommand): Promise<ApiResponse<Business>> {
        return this.request<Business>(`/businesses/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async getBusinessServices(businessId: string): Promise<ApiResponse<Service[]>> {
        return this.request<Service[]>(`/businesses/${businessId}/services`);
    }

    // Business Hours endpoints
    async createBusinessHour(data: CreateBusinessHourCommand): Promise<ApiResponse<BusinessHour>> {
        return this.request<BusinessHour>('/business-hours', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateBusinessHour(id: string, data: UpdateBusinessHourCommand): Promise<ApiResponse<BusinessHour>> {
        return this.request<BusinessHour>(`/business-hours/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    // Reviews endpoints
    async createReview(data: CreateReviewCommand): Promise<ApiResponse<Review>> {
        return this.request<Review>('/reviews', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateReview(id: string, data: UpdateReviewCommand): Promise<ApiResponse<Review>> {
        return this.request<Review>(`/reviews/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    // Dashboard endpoints
    async getDashboardStats(providerId: string): Promise<ApiResponse<DashboardStats>> {
        return this.request<DashboardStats>(`/dashboard/provider/${providerId}/stats`);
    }

    // Enhanced booking endpoints
    async getProviderBookings(
        providerId: string,
        status?: BookingStatus,
        startDate?: string,
        endDate?: string
    ): Promise<ApiResponse<BookingWithDetails[]>> {
        const params = new URLSearchParams();
        if (status) params.append('status', status);
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);

        const queryString = params.toString();
        const endpoint = queryString
            ? `/bookings/provider/${providerId}?${queryString}`
            : `/bookings/provider/${providerId}`;

        return this.request<BookingWithDetails[]>(endpoint);
    }

    async getClientBookings(clientId: string): Promise<ApiResponse<BookingWithDetails[]>> {
        return this.request<BookingWithDetails[]>(`/bookings/client/${clientId}`);
    }

    // Location endpoints
    async getCities(): Promise<ApiResponse<CityInfo[]>> {
        return this.request<CityInfo[]>('/locations/cities');
    }
}

export const apiClient = new ApiClient(API_BASE_URL);