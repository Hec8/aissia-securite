const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Types pour les réponses API
export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
    meta?: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

// Types pour les entités
export interface Service {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    image_url: string | null;
    icon: string | null;
    features: string[] | null;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    image_url: string | null;
    price: number | null;
    category: string | null;
    features: string[] | null;
    is_active: boolean;
    is_featured: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface Formation {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    level: string | null;
    category: string | null;
    duration_weeks: number;
    modules: string[] | null;
    has_final_exam: boolean;
    price: number | null;
    is_active: boolean;
    is_featured: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface Article {
    id: number;
    title: string;
    slug: string;
    content: string;
    image_url: string | null;
    excerpt: string | null;
    category: string | null;
    tags: string[] | null;
    is_published: boolean;
    is_featured: boolean;
    views_count: number;
    published_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface ContactMessage {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    company: string | null;
    subject: string | null;
    message: string;
    is_read: boolean;
    created_at: string;
    updated_at: string;
}

export interface Quote {
    id: number;
    reference: string;
    company_name: string;
    contact_name: string;
    email: string;
    phone: string | null;
    service_type: string;
    description: string;
    budget_min: number | null;
    budget_max: number | null;
    desired_start_date: string | null;
    status: 'pending' | 'contacted' | 'in_progress' | 'quoted' | 'accepted' | 'rejected';
    admin_notes: string | null;
    created_at: string;
    updated_at: string;
}

export interface NewsletterSubscriber {
    id: number;
    email: string;
    name: string | null;
    is_active: boolean;
    subscribed_at: string;
    unsubscribed_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface JobOffer {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    profiles: string | null;
    conditions: string | null;
    location: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface DashboardStats {
    services: number;
    products: number;
    formations: number;
    articles: number;
    messages: number;
    unread_messages: number;
    quotes: number;
    pending_quotes: number;
    newsletter_subscribers: number;
    job_offers?: number;
}

export type SubmitQuotePayload = {
    company_name: string;
    contact_name: string;
    email: string;
    phone?: string;
    service_type: string;
    description: string;
    budget_min?: number;
    budget_max?: number;
    desired_start_date?: string;
    ncc?: string;
    rccm?: string;
};

// Erreur API personnalisée
export class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

// Gestionnaire de réponse
async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json().catch(() => ({ message: 'Erreur réseau' }));
    
    if (!response.ok) {
        throw new ApiError(response.status, data.message || 'Erreur API');
    }
    
    return data;
}

// Fonction utilitaire pour les requêtes avec authentification
function getAuthHeaders(): HeadersInit {
    if (typeof window === 'undefined') return {};
    const token = localStorage.getItem('auth_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}

export const api = {
    // ========== PUBLIC API ==========

    // Services
    getServices: async (): Promise<ApiResponse<Service[]>> => {
        const response = await fetch(`${API_BASE_URL}/services`);
        return handleResponse<Service[]>(response);
    },
    // (supprimé: admin partiel, voir plus bas pour l'objet complet)

    // Products
    getProducts: async (params?: { category?: string; featured?: boolean }): Promise<ApiResponse<Product[]>> => {
        const searchParams = new URLSearchParams();
        if (params?.category) searchParams.append('category', params.category);
        if (params?.featured) searchParams.append('featured', '1');
        
        const url = `${API_BASE_URL}/products${searchParams.toString() ? `?${searchParams}` : ''}`;
        const response = await fetch(url);
        return handleResponse<Product[]>(response);
    },

    // Formations / Trainings
    getFormations: async (params?: { category?: string; level?: string; featured?: boolean }): Promise<ApiResponse<Formation[]>> => {
        const searchParams = new URLSearchParams();
        if (params?.category) searchParams.append('category', params.category);
        if (params?.level) searchParams.append('level', params.level);
        if (params?.featured) searchParams.append('featured', '1');
        
        const url = `${API_BASE_URL}/formations${searchParams.toString() ? `?${searchParams}` : ''}`;
        const response = await fetch(url);
        return handleResponse<Formation[]>(response);
    },

    // Alias pour le frontend
    getTrainings: async (): Promise<ApiResponse<Formation[]>> => {
        const response = await fetch(`${API_BASE_URL}/trainings`);
        return handleResponse<Formation[]>(response);
    },

    // Articles / News
    getArticles: async (params?: { category?: string; featured?: boolean; limit?: number }): Promise<ApiResponse<Article[]>> => {
        const searchParams = new URLSearchParams();
        if (params?.category) searchParams.append('category', params.category);
        if (params?.featured) searchParams.append('featured', '1');
        if (params?.limit) searchParams.append('limit', params.limit.toString());
        
        const url = `${API_BASE_URL}/articles${searchParams.toString() ? `?${searchParams}` : ''}`;
        const response = await fetch(url);
        return handleResponse<Article[]>(response);
    },

    getNews: async (params?: { limit?: number }): Promise<ApiResponse<Article[]>> => {
        const searchParams = new URLSearchParams();
        if (params?.limit) searchParams.append('limit', params.limit.toString());
        
        const url = `${API_BASE_URL}/news${searchParams.toString() ? `?${searchParams}` : ''}`;
        const response = await fetch(url);
        return handleResponse<Article[]>(response);
    },

    getArticleBySlug: async (slug: string): Promise<ApiResponse<Article>> => {
        const response = await fetch(`${API_BASE_URL}/articles/${slug}`);
        return handleResponse<Article>(response);
    },

    getNewsById: async (slug: string): Promise<ApiResponse<Article>> => {
        const response = await fetch(`${API_BASE_URL}/news/${slug}`);
        return handleResponse<Article>(response);
    },

    // Contact
    sendContactForm: async (data: {
        name: string;
        email: string;
        phone?: string;
        company?: string;
        subject?: string;
        message: string;
    }): Promise<ApiResponse<ContactMessage>> => {
        const response = await fetch(`${API_BASE_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return handleResponse<ContactMessage>(response);
    },

    // Send contact form with file (multipart/form-data)
    sendContactFormMultipart: async (formData: FormData): Promise<ApiResponse<ContactMessage>> => {
        const response = await fetch(`${API_BASE_URL}/contact`, {
            method: 'POST',
            // NOTE: Do not set Content-Type; browser will set multipart boundary
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            body: formData,
        });

        return handleResponse<ContactMessage>(response);
    },

    // Jobs / Recruitment
    getJobs: async (): Promise<ApiResponse<JobOffer[]>> => {
        const response = await fetch(`${API_BASE_URL}/jobs`);
        return handleResponse<JobOffer[]>(response);
    },

    // Newsletter
    subscribeNewsletter: async (data: { email: string; name?: string }): Promise<ApiResponse<NewsletterSubscriber>> => {
        const response = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return handleResponse<NewsletterSubscriber>(response);
    },

    unsubscribeNewsletter: async (email: string): Promise<ApiResponse<null>> => {
        const response = await fetch(`${API_BASE_URL}/newsletter/unsubscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        return handleResponse<null>(response);
    },

    // Quote / Devis
    submitQuote: async (data: SubmitQuotePayload): Promise<ApiResponse<{ reference: string }>> => {
        const response = await fetch(`${API_BASE_URL}/quotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return handleResponse<{ reference: string }>(response);
    },

    // ========== ADMIN API ==========

    // Auth
    login: async (email: string, password: string): Promise<ApiResponse<{ token: string; user: { id: number; name: string; email: string } }>> => {
        const response = await fetch(`${API_BASE_URL}/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        return handleResponse(response);
    },

    logout: async (): Promise<ApiResponse<null>> => {
        const response = await fetch(`${API_BASE_URL}/admin/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...getAuthHeaders(),
            },
        });
        return handleResponse<null>(response);
    },

    getMe: async (): Promise<ApiResponse<{ id: number; name: string; email: string }>> => {
        const response = await fetch(`${API_BASE_URL}/admin/me`, {
            headers: {
                'Accept': 'application/json',
                ...getAuthHeaders(),
            },
        });
        return handleResponse(response);
    },

    // Dashboard Stats
    getDashboardStats: async (): Promise<ApiResponse<DashboardStats>> => {
        const response = await fetch(`${API_BASE_URL}/admin/stats`, {
            headers: {
                'Accept': 'application/json',
                ...getAuthHeaders(),
            },
        });
        return handleResponse<DashboardStats>(response);
    },

    // Admin CRUD helpers
    admin: {
        // Services
        getServices: async (): Promise<ApiResponse<Service[]>> => {
            const response = await fetch(`${API_BASE_URL}/services?all=1`, {
                headers: { 'Accept': 'application/json', ...getAuthHeaders() },
            });
            return handleResponse<Service[]>(response);
        },
        createService: async (data: Partial<Service>): Promise<ApiResponse<Service>> => {
            const response = await fetch(`${API_BASE_URL}/admin/services`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', ...getAuthHeaders() },
                body: JSON.stringify(data),
            });
            return handleResponse<Service>(response);
        },
        updateService: async (id: number, data: Partial<Service>): Promise<ApiResponse<Service>> => {
            const response = await fetch(`${API_BASE_URL}/admin/services/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', ...getAuthHeaders() },
                body: JSON.stringify(data),
            });
            return handleResponse<Service>(response);
        },
        deleteService: async (id: number): Promise<ApiResponse<null>> => {
            const response = await fetch(`${API_BASE_URL}/admin/services/${id}`, {
                method: 'DELETE',
                headers: { 'Accept': 'application/json', ...getAuthHeaders() },
            });
            return handleResponse<null>(response);
        },

        // Products
        getProducts: async (): Promise<ApiResponse<Product[]>> => {
            const response = await fetch(`${API_BASE_URL}/products?all=1`, {
                headers: { 'Accept': 'application/json', ...getAuthHeaders() },
            });
            return handleResponse<Product[]>(response);
        },
        createProduct: async (data: Partial<Product>): Promise<ApiResponse<Product>> => {
            const response = await fetch(`${API_BASE_URL}/admin/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', ...getAuthHeaders() },
                body: JSON.stringify(data),
            });
            return handleResponse<Product>(response);
        },
        updateProduct: async (id: number, data: Partial<Product>): Promise<ApiResponse<Product>> => {
            const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', ...getAuthHeaders() },
                body: JSON.stringify(data),
            });
            return handleResponse<Product>(response);
        },
        deleteProduct: async (id: number): Promise<ApiResponse<null>> => {
            const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
                method: 'DELETE',
                headers: { 'Accept': 'application/json', ...getAuthHeaders() },
            });
            return handleResponse<null>(response);
        },

        // Formations
        getFormations: async (): Promise<ApiResponse<Formation[]>> => {
            const response = await fetch(`${API_BASE_URL}/formations?all=1`, {
                headers: { 'Accept': 'application/json', ...getAuthHeaders() },
            });
            return handleResponse<Formation[]>(response);
        },
        createFormation: async (data: Partial<Formation>): Promise<ApiResponse<Formation>> => {
            const response = await fetch(`${API_BASE_URL}/admin/formations`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', ...getAuthHeaders() },
                body: JSON.stringify(data),
            });
            return handleResponse<Formation>(response);
        },
        updateFormation: async (id: number, data: Partial<Formation>): Promise<ApiResponse<Formation>> => {
            const response = await fetch(`${API_BASE_URL}/admin/formations/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', ...getAuthHeaders() },
                body: JSON.stringify(data),
            });
            return handleResponse<Formation>(response);
        },
        deleteFormation: async (id: number): Promise<ApiResponse<null>> => {
            const response = await fetch(`${API_BASE_URL}/admin/formations/${id}`, {
                method: 'DELETE',
                headers: { 'Accept': 'application/json', ...getAuthHeaders() },
            });
            return handleResponse<null>(response);
        },

        // Articles
        getArticles: async (): Promise<ApiResponse<Article[]>> => {
            const response = await fetch(`${API_BASE_URL}/articles?all=1`, {
                headers: { 'Accept': 'application/json', ...getAuthHeaders() },
            });
            return handleResponse<Article[]>(response);
        },
        createArticle: async (data: Partial<Article>): Promise<ApiResponse<Article>> => {
            const response = await fetch(`${API_BASE_URL}/admin/articles`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', ...getAuthHeaders() },
                body: JSON.stringify(data),
            });
            return handleResponse<Article>(response);
        },
        updateArticle: async (id: number, data: Partial<Article>): Promise<ApiResponse<Article>> => {
            const response = await fetch(`${API_BASE_URL}/admin/articles/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', ...getAuthHeaders() },
                body: JSON.stringify(data),
            });
            return handleResponse<Article>(response);
        },
        deleteArticle: async (id: number): Promise<ApiResponse<null>> => {
            const response = await fetch(`${API_BASE_URL}/admin/articles/${id}`, {
                method: 'DELETE',
                headers: { 'Accept': 'application/json', ...getAuthHeaders() },
            });
            return handleResponse<null>(response);
        },

        // Contact Messages
        getMessages: async (): Promise<ApiResponse<ContactMessage[]> & { stats?: { total: number; unread: number } }> => {
            const response = await fetch(`${API_BASE_URL}/admin/contact-messages`, {
                headers: { 'Accept': 'application/json', ...getAuthHeaders() },
            });
            return handleResponse(response);
        },
        // Applications (contact messages with attachments)
        getApplications: async (): Promise<ApiResponse<ContactMessage[]>> => {
            const response = await fetch(`${API_BASE_URL}/admin/applications`, {
                headers: { 'Accept': 'application/json', ...getAuthHeaders() },
            });
            return handleResponse<ContactMessage[]>(response);
        },
        markMessageAsRead: async (id: number): Promise<ApiResponse<ContactMessage>> => {
            const response = await fetch(`${API_BASE_URL}/admin/contact-messages/${id}/read`, {
                method: 'PATCH',
                headers: { 'Accept': 'application/json', ...getAuthHeaders() },
            });
            return handleResponse<ContactMessage>(response);
        },
        deleteMessage: async (id: number): Promise<ApiResponse<null>> => {
            const response = await fetch(`${API_BASE_URL}/admin/contact-messages/${id}`, {
                method: 'DELETE',
                headers: { 'Accept': 'application/json', ...getAuthHeaders() },
            });
            return handleResponse<null>(response);
        },

        // Quotes
        getQuotes: async (status?: string): Promise<ApiResponse<Quote[]> & { stats?: object }> => {
            const url = status ? `${API_BASE_URL}/admin/quotes?status=${status}` : `${API_BASE_URL}/admin/quotes`;
            const response = await fetch(url, {
                headers: { 'Accept': 'application/json', ...getAuthHeaders() },
            });
            return handleResponse(response);
        },
        updateQuote: async (id: number, data: { status?: string; admin_notes?: string }): Promise<ApiResponse<Quote>> => {
            const response = await fetch(`${API_BASE_URL}/admin/quotes/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', ...getAuthHeaders() },
                body: JSON.stringify(data),
            });
            return handleResponse<Quote>(response);
        },
        deleteQuote: async (id: number): Promise<ApiResponse<null>> => {
            const response = await fetch(`${API_BASE_URL}/admin/quotes/${id}`, {
                method: 'DELETE',
                headers: { 'Accept': 'application/json', ...getAuthHeaders() },
            });
            return handleResponse<null>(response);
        },

        // Newsletter
        getSubscribers: async (): Promise<ApiResponse<NewsletterSubscriber[]> & { stats?: object }> => {
            const response = await fetch(`${API_BASE_URL}/admin/newsletter`, {
                headers: { 'Accept': 'application/json', ...getAuthHeaders() },
            });
            return handleResponse(response);
        },
        deleteSubscriber: async (id: number): Promise<ApiResponse<null>> => {
            const response = await fetch(`${API_BASE_URL}/admin/newsletter/${id}`, {
                method: 'DELETE',
                headers: { 'Accept': 'application/json', ...getAuthHeaders() },
            });
            return handleResponse<null>(response);
        },

        // Profil admin
        updateAdminProfile: async (data: { name: string; email: string; password?: string; password_confirmation?: string }): Promise<ApiResponse<{ id: number; name: string; email: string }>> => {
            const response = await fetch(`${API_BASE_URL}/admin/profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', ...getAuthHeaders() },
                body: JSON.stringify(data),
            });
            return handleResponse(response);
        },
        // Job Offers (admin)
        getJobOffers: async (): Promise<ApiResponse<JobOffer[]>> => {
            const response = await fetch(`${API_BASE_URL}/admin/job-offers`, {
                headers: { 'Accept': 'application/json', ...getAuthHeaders() },
            });
            return handleResponse<JobOffer[]>(response);
        },
        getJobOffer: async (id: number): Promise<ApiResponse<JobOffer>> => {
            const response = await fetch(`${API_BASE_URL}/admin/job-offers/${id}`, {
                headers: { 'Accept': 'application/json', ...getAuthHeaders() },
            });
            return handleResponse<JobOffer>(response);
        },
        createJobOffer: async (data: Partial<JobOffer>): Promise<ApiResponse<JobOffer>> => {
            const response = await fetch(`${API_BASE_URL}/admin/job-offers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', ...getAuthHeaders() },
                body: JSON.stringify(data),
            });
            return handleResponse<JobOffer>(response);
        },
        updateJobOffer: async (id: number, data: Partial<JobOffer>): Promise<ApiResponse<JobOffer>> => {
            const response = await fetch(`${API_BASE_URL}/admin/job-offers/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', ...getAuthHeaders() },
                body: JSON.stringify(data),
            });
            return handleResponse<JobOffer>(response);
        },
        deleteJobOffer: async (id: number): Promise<ApiResponse<null>> => {
            const response = await fetch(`${API_BASE_URL}/admin/job-offers/${id}`, {
                method: 'DELETE',
                headers: { 'Accept': 'application/json', ...getAuthHeaders() },
            });
            return handleResponse<null>(response);
        },
    },
};
