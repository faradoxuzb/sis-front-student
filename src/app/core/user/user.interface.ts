import { Roles } from './user.types';

export interface allResponseUser {
    success: boolean;
    message: string;
    user: {
        id: number;
        name: string;
        email: string;
        avatar: string;
        status?: string;
        is_password_reset: boolean;
        roles: Roles[];
    };
}
