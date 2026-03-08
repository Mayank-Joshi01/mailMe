import API from './axiosInstance';

export interface UserLoginResponse {
    token: string;
    message: string;
    success: boolean;
    user: {
        name: string;
        email: string;
    }
}

export interface UserRegisterResponse {
    message: string;
    success: boolean;
    link?: string; // Optional, only for magic link registration
}

export interface MagicLinkResponse {
    message: string;
    success: boolean;
    token: string;
    user: {
        name: string;
        email: string;
    }
}

export interface UserProfileResponse {
    name: string;
    email: string;
}

export const login = async (email: string, password: string): Promise<UserLoginResponse> => {
    try {
        const response = await API.post('/auth/login', { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register = async (name: string, email: string, password: string): Promise<UserRegisterResponse> => {
    try {
        const response = await API.post('/auth/register', { name, email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const verifyMagicLink = async (token: string, email: string): Promise<UserLoginResponse> => {
    try {
        const response = await API.post("auth/verify-signup",{token,email});
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const GetUserProfile = async (): Promise<{ user : UserProfileResponse , sucess : boolean }> => {
    try {
        const response = await API.get('/auth/me', {});
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const googleAuth = async (token: string): Promise<UserLoginResponse> => {
    try {
        const response = await API.post('/auth/google-auth', { token });
        return response.data;
    } catch (error) {
        throw error;
    }
};
