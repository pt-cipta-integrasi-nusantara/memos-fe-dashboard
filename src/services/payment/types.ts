export interface Payment {
    id: number;
    subscription_id: number;
    bank_account_id: number;
    pay_amount: number;
    pay_date: string;
    verified_at: string;
    verified_by: string;
    status: string;
    payment_proof: string;
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
    deleted_at: string;
    deleted_by: string
}