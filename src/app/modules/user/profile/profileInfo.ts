export interface ProfileInfo {
    branches: BranchElement[];
    countries: Country[];
    genders: Genders;
    status: { [key: string]: string };
    languages: Languages;
    student: WelcomeStudent;
}

export interface BranchElement {
    id: number;
    name: string;
}

export interface Country {
    id: number;
    name: Name;
}

export interface Name {
    uz: string;
    en: string;
    ru: string;
}

export interface Genders {
    male: string;
    female: string;
}

export interface Languages {
    uz: string;
    ru: string;
    en: string;
    ka: string;
    tg: string;
    tk: string;
}

export interface WelcomeStudent {
    id: number;
    branch: StudentBranch;
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
    registration_number: null;
    photo: null;
    files: null;
    user: User;
    citizenship: Citizenship;
    studentContracts: any[];
    registration_date: null;
    guardians: GuardianElement[];
    studentGroups: StudentGroup[];
    currentGroup: CurrentGroup;
    knowingLanguages: string[];
    hobbies: string[];
    transports: Transport[];
}

export interface StudentBranch {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: null;
    status: string;
    prefix: null;
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

export interface CurrentGroup {
    groupName: string;
    classType: Name;
}

export interface GuardianElement {
    type: string;
    guardian: GuardianFullData;
}

export interface GuardianFullData {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
    birth_date: Date;
    identity_number: string;
    identity_serial: string;
    pnfl_number: string;
    gender: string;
    phone: string;
    extra_phone: null | string;
    user: User;
    citizenship: Citizenship;
    students: StudentElement[];
}

export interface StudentElement {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
    birth_date: Date;
    gender: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    branch: StudentBranch | null;
    additional_branches: any[];
    roles: any[];
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
