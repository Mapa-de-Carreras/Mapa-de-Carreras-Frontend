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
    login: (
        _username: string,
        _password: string,
        _onError: (_error: Error) => void
    ) => Promise<void>;
    logout: () => Promise<void>;
    refresh: (_token: string) => Promise<void>;
}