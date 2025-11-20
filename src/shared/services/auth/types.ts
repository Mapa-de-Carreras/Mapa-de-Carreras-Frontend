import { Rol } from "@globalTypes/rol";

export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_active: boolean;
    legajo: string;
    fecha_nacimiento: string;
    celular: string;
    roles: Rol[];
    docente_data: null
    coordinador_data: null;
    avatar: string;
}

export interface LoginResponse extends User {
    refresh: string;
    access: string;
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