import { MultiLanguageField } from './multi-language-field.model';

export interface Parent {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
    birth_date: string;
    identity_number: string;
    identity_serial: string;
    pnfl_number: string;
    gender: string;
    phone: string;
    extra_phone: string;
    user: User;
    citizenship: Citizenship;
    students: Student[];
    address: string;
    actual_address?: any;
}
export interface Student {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
    birth_date: string;
    gender: string;
    currentGroup: {
        groupName: string;
        classType: MultiLanguageField;
    };
}
export interface Citizenship {
    id: number;
    name: Name;
    type_code: string;
    value: string;
    description: string;
    ordering: number;
    active: boolean;
}
export interface Name {
    uz: string;
    en: string;
    ru: string;
}
export interface User {
    id: number;
    name: string;
    email: string;
    branch?: any;
    additional_branches: any[];
    roles: Role[];
}
export interface Role {
    id: number;
    name: string;
    guard_name: string;
    permissions: any[];
}
