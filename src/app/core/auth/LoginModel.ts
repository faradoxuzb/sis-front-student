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
        name: string;
        email: string;
        avatar: string;
        branch: string;
    };
}
