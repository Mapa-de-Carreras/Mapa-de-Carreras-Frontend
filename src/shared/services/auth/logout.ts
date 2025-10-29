import { URL_API } from "@apis/constantes";

export default async function logoutRequest(): Promise<void> {
    const refreshToken = localStorage.getItem("refresh_token");
    const accessToken = localStorage.getItem("access_token");

    try {
        await fetch(`${URL_API}auth/logout/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });
    } catch (error) {
        console.error("Error cerrando sesión en API:", error);
    } finally {
        localStorage.clear();
    }

    console.log("Cierre de sesión local completado");
}