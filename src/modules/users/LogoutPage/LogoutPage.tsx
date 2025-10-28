import { useState } from "react";
import PageBase from "../../../shared/components/PageBase/PageBase";
import { useNavigate } from "react-router";
import TarjetaUsuario from "../../../shared/components/TarjetaUsuario";
import BotonGenerico from "../../../shared/components/Botones/BotonGenerico";

export default function LogoutPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      const accessToken = localStorage.getItem("access_token");

      const response = await fetch("http://127.0.0.1:8000/api/auth/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Error al cerrar sesión");
      }

      localStorage.clear();
      navigate("/usuarios/login");
    } catch (error: unknown) {
      console.error("Error al cerrar sesión:", error);
      setError(error instanceof Error ? error.message : "Error inesperado.");
    }
  };

  const handleAgregar = () => {
    console.log("Botón Agregar clickeado");
    
  };

  return (
    <PageBase>
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50 gap-4">

        {/* Botón Agregar */}
        <div className="w-full max-w-sm">
          <BotonGenerico
            texto="Agregar"
            color="#3E9956" 
            icono={
               <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white">
                <span className="icon-[mdi--plus] text-[#3E9956] text-xl" aria-label="Agregar" />
              </span>
            }
            onClick={() => handleAgregar()}
          />
        </div>

        {/* Tarjetas de usuario */}
        <TarjetaUsuario
          id={1}
          nombre="Horacio"
          apellido="Pendenti"
          rol="Coordinador de carrera"
          activo="Activo"
          onClickFlecha={(id) => console.log("Flecha clickeada en usuario", id)}
        />
        <TarjetaUsuario
          id={2}
          nombre="Cintia"
          apellido="Alejandra Aguado"
          rol="Admin"
          activo="Activo"
          onClickFlecha={(id) => console.log("Flecha clickeada en usuario", id)}
        />
        <TarjetaUsuario
          id={3}
          nombre="Ezequiel"
          apellido="Moyano"
          rol="Admin-Coordinador de carrera"
          activo="Activo"
          onClickFlecha={(id) => console.log("Flecha clickeada en usuario", id)}
        />

        {/* Botón Cerrar sesión */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm text-center border border-gray-200 mt-6">
          <h1 className="text-2xl font-semibold text-black mb-6">
            ¿Deseas cerrar sesión?
          </h1>
          <button
            onClick={handleLogout}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Cerrar sesión
          </button>

          {error && (
            <p className="text-red-600 text-sm text-center mt-2">{error}</p>
          )}
        </div>
      </div>
    </PageBase>
  );
}