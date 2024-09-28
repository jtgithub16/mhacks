export type PersonalProfile = {
    personal_id: string;
    first_name: string;
    last_name: string;
    email: string;
    number?: string;
    photo?: string;
    resume?: string;
    birth_date?: Date;
    gender?: string;
    citizenship?: string;
    college_grad_date?: Date;
    linkedin?: string;
    portfolio?: string;
    instagram?: string;
    synqed?: string[];
}

export type OrganizationProfile = {
    organization_id: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    number?: string;
    logo?: string;
    org_name: string;
    website: string;
    linkedin?: string;
    description?: string;
    synqed?: string[];
}