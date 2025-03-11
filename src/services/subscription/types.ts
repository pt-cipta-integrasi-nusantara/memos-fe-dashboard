export interface Subscription {
    id: number;
    user_id: number;
    plan_id: number;
    status: string;
    starts_at: string;
    expires_at: string;
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
    deleted_at: string;
    deleted_by: string;
    plan: any;
    payment: any
}