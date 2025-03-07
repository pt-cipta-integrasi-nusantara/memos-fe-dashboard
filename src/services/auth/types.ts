export interface User {
    created_at: string;
    created_by: string
    updated_at: string;
    updated_by: string; 
    deleted_at: string; 
    deleted_by: string; 
    id: number; 
    facilities_id: number; 
    no_rm: string; 
    memos_id: number; 
    full_name: string; 
    email: string;
    password: string;
    account_type: string; 
    is_email_verified: boolean;
    is_approved: boolean;
    verified_status: string;
    signature: string; 
    bpjs:{
        created_at: string; 
            created_by: string;
            updated_at: string; 
            updated_by: string; 
            deleted_at: string; 
            deleted_by: string; 
            entity_id: number; 
            memos_id: number; 
            bpjs_code: string; 
            bpjs_name: string; 
            no_license: string; 
    }
    user:{
        created_at: string; 
            created_by:string;
            updated_at: string; 
            updated_by: string; 
            deleted_at: string; 
            deleted_by: string; 
            user_id: number;
            memos_id: number; 
            profile_picture: string; 
            ihs_number: string; 
            no_rm: string; 
            full_name: string;
            gender: string; 
            birth_place: string; 
            birth_date: string; 
            identity_type: string; 
            identity_number: string; 
            identity_photo: string; 
            phone_number: string; 
            marital_status: string; 
            user_type_id: number; 
            profession_id: number; 
            smf_id: number; 
            str_no: number; 
            str_expires_date: string; 
            str_photo: string; 
            clinix_reg_verified_at: string; 
            clinix_reg_verified_by: string; 
            addresses: any; 
            insurance: string; 
            facility:{
            created_at: string;
                    created_by: string; 
                    updated_at: string; 
                    updated_by: string; 
                    deleted_at: string; 
                    deleted_by: string; 
                    id: number; 
                    organization_id: number;
                    name: string; 
                    type: string; 
                    location: string; 
                    address: string; 
                    logo: string; 
                    app_logo: string; 
                    bpjs_code: string; 
                    bpjs_name: string; 
                    organization_name: string; 
                    photo: string; 
                    address_id: number; 
                    ref_address:{
                created_at: string; 
                            created_by: string; 
                            updated_at: string; 
                            updated_by: string; 
                            deleted_at: string; 
                            deleted_by: string; 
                            entity_id: number; 
                            user_id: number; 
                            type_address: string; 
                            country: string; 
                            province: string; 
                            city: string; 
                            sub_district: string; 
                            village: string; 
                            street_address: string; 
                            neighborhood_association: string; 
                            citizen_association: string; 
                            postal_code: string; 
                            phone_number: string; 
                            detail_note: number; 
                            house_no: number; 
                            rt_no: number; 
                            rw_no: number; 
                            latitude: string; 
                            longitude: string; 
            }
        }
    }
}