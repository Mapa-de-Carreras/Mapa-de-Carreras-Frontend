import { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "@components/hooks/useAuth";
import PageBase from "@components/PageBase/PageBase";
import BotonGenerico from "@components/Botones/BotonGenerico";
import TarjetaUsuario from "@components/TarjetaUsuario";
import BotonBase from "@components/Botones/BotonBase";

export default function LogoutPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/authentication/login');
    } catch (error) {
      console.error("Error en el logout:", error);
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
          <BotonBase variant="agregar" onClick={handleAgregar} />
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