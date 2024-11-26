export interface ProfileInfo {
    id: number;
    branch: Branch;
    first_name: string;
    last_name: string;
    middle_name: string;
    birth_date: Date;
    identity_number: string;
    identity_serial: string;
    pnfl_number: string;
    gender: string;
    status: number;
    phone: string;
    extra_phone: string;
    address: string;
    actual_address: string;
    id_card: string;
    registration_number: string;
    photo: null;
    files: File[];
    user: User;
    citizenship: Citizenship;
    studentContracts: any[];
    registration_date: Date;
    guardians: any[];
    studentGroups: StudentGroup[];
    currentGroup: CurrentGroup;
    knowingLanguages: string[];
    hobbies: string[];
    transports: Transport[];
}

export interface Branch {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    status: string;
    prefix: string;
}

export interface Citizenship {
    id: number;
    name: Name;
    type_code: string;
    value: string;
    description: null | string;
    ordering: number;
    active: boolean;
}

export interface Name {
    uz: string;
    en: string;
    ru: string;
}

export interface CurrentGroup {
    groupName: string;
    classType: Name;
}

export interface File {
    id: number;
    name: string;
    path: string;
    type: string;
    key: string;
    presigned_url: string;
}

export interface StudentGroup {
    id: number;
    branchGroup: BranchGroup;
    educationYear: EducationYear;
    classType: Citizenship;
    start_date: Date;
    end_date: Date;
}

export interface BranchGroup {
    id: number;
    branch_id: number;
    name: string;
    capacity: number;
    min_students: number;
    max_students: number;
}

export interface EducationYear {
    id: number;
    name: string;
    start_date: Date;
    end_date: Date;
}

export interface Transport {
    id: number;
    transport: string;
    name: string;
    phone: string;
    extra_phone: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    branch: Branch;
    additional_branches: any[];
    roles: Role[];
}

export interface Role {
    id: number;
    name: string;
    guard_name: string;
    permissions: any[];
}
