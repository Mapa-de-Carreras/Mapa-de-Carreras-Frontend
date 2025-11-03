import { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "@components/hooks/useAuth";
import PageBase from "@components/PageBase/PageBase";
import BotonGenerico from "@components/Botones/BotonGenerico";
import TarjetaUsuario from "@components/TarjetaUsuario";

export default function LogoutPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const handleAgregar = () => {
    console.log("Botón Agregar clickeado");
    navigate("/administracion/usuarios/crear");
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
          onClickFlecha={(id) => navigate(`/administracion/usuarios/detalle`)}
        />
        <TarjetaUsuario
          id={2}
          nombre="Cintia"
          apellido="Alejandra Aguado"
          rol="Admin"
          activo="Activo"
          onClickFlecha={(id) => navigate(`/administracion/usuarios/detalle`)}
        />
        <TarjetaUsuario
          id={3}
          nombre="Ezequiel"
          apellido="Moyano"
          rol="Admin-Coordinador de carrera"
          activo="Activo"
          onClickFlecha={(id) => navigate(`/administracion/usuarios/detalle`)}
        />

      </div>
    </PageBase>
  );
}