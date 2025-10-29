import { URL_API } from "@apis/constantes";
import { LoginResponse, User } from "./types";

export const loginRequest = async (
    username: string,
    password: string
): Promise<User> => {
    if (!username.trim() || !password.trim()) {
        throw new Error("Por favor, complete todos los campos.");
    }

    const response = await fetch(`${URL_API}auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la autenticación");
    }

    const data: LoginResponse = await response.json();

    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    localStorage.setItem("user_id", String(data.id));
    localStorage.setItem("is_staff", String(data.is_staff));

    return { id: data.id, is_staff: data.is_staff };
};
