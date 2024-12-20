export interface Payment {
    current_page: number;
    data: Datum[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: null;
    path: string;
    per_page: number;
    prev_page_url: null;
    to: number;
    total: number;
}

export interface Datum {
    id: number;
    educationYear: EducationYear;
    student: Student;
    contract_number: string;
    signing_date: null;
    rejection_date: null;
}

export interface EducationYear {
    id: number;
    name: string;
}

export interface Student {
    id: number;
    fullName: string;
}

export interface Link {
    url: null | string;
    label: string;
    active: boolean;
}
