export const refreshRequest = async (): Promise<void> => {
    const token = localStorage.getItem("refresh_token");

    const response = await fetch("http://127.0.0.1:8000/api/auth/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: token }),
    });

    if (!response.ok) {
        throw new Error("No se pudo refrescar el token");
    }

    const data = await response.json();
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
};
