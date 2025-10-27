import { useState } from "react";
import PageBase from "../../../shared/components/PageBase/PageBase";
import { useNavigate } from "react-router";

export default function LogoutPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>(""); 

const handleLogout = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    const accessToken = localStorage.getItem("access_token");
    console.log("Refresh Token:", refreshToken);
    console.log("Access Token:", accessToken);

    const response = await fetch("http://127.0.0.1:8000/api/auth/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`, 
      },
      body: JSON.stringify({ refresh_token: refreshToken }), 
    });

    if (!response.ok) {
      // Si viene contenido de error
      const errorData = await response.text();
      throw new Error(errorData || "Error al cerrar sesión");
    }

    console.log("Cierre de sesión exitoso");

    // Limpiar almacenamiento local
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("is_staff");

    navigate("/usuarios");
  } catch (error: unknown) {
    console.error("Error al cerrar sesión:", error);
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError("Error inesperado al cerrar la sesión.");
    }
  }
};

  return (
    <PageBase>
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm text-center border border-gray-200">
          <h1 className="text-2xl font-semibold text-black mb-6">
            ¿Deseas cerrar sesión?
          </h1>
          <button
            onClick={handleLogout}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Cerrar sesión
          </button>
        </div>

            {/* Mensaje de error */}
            {error && (
              <p className="text-red-600 text-sm text-center mt-2">{error}</p>
            )}

      </div>
    </PageBase>
  );
}
