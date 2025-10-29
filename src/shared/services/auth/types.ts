export interface User {
    id: number;
    is_staff: boolean;
}

export interface LoginResponse {
    refresh: string;
    access: string;
    id: number;
    is_staff: boolean;
}

export interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refresh: (token: string) => Promise<void>;
}