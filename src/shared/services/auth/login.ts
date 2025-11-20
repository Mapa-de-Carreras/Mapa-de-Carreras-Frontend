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

    const { access, refresh, ...usuario } = data;

    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    localStorage.setItem("usuario", JSON.stringify(usuario))

    return usuario as User;
};
