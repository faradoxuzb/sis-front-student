export interface allResponseUser {
    success: boolean;
    message: string;
    user: {
        id: number;
        name: string;
        email: string;
        avatar: string;
        status?: string;
    };
}
