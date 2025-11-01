import { loginRequest } from "@services/auth/login";
import logoutRequest from "@services/auth/logout";
import { refreshRequest } from "@services/auth/refresh";
import { AuthContextType, User } from "@services/auth/types";
import { createContext, ReactNode, useEffect, useState } from "react";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = localStorage.getItem("user_id");
        const is_staff = localStorage.getItem("is_staff");

        if (id) {
            setUser({ id: Number(id), is_staff: is_staff === "true" });
        }

        setLoading(false);
    }, []);


    const login = async (username: string, password: string) => {
        try {
            const userData = await loginRequest(username, password);
            setUser(userData);
        } catch (err) {
            if (err instanceof Error) throw new Error(err.message);
            throw new Error("Error inesperado en el inicio de sesión.");
        }
    };

    const logout = async () => {
        logoutRequest();
        setUser(null);
    };

    const refresh = async () => {
        try {
            await refreshRequest();
        } catch (err) {
            console.error("Error refrescando token:", err);
            logout();
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, refresh }}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
