export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
    status?: string;
    roles:Roles[];
}

export interface Roles {
    id: number;
    name: string;
    guard_name: string;
    permissions: any[];
}
