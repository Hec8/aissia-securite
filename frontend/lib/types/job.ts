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
