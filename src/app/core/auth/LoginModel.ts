export interface LoginModel {
    success: boolean;
    message: string;
    user: {
        id: number;
        token: {
            token_type: string;
            expires_in: number;
            access_token: string;
            refresh_token: string;
        };
        is_password_reset: boolean;
        name: string;
        email: string;
        avatar: string;
        branch: string;
    };
}
