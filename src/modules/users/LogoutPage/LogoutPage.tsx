import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PageBase from "@components/PageBase/PageBase";
import BotonGenerico from "@components/Botones/BotonGenerico";
import TarjetaUsuario from "@components/TarjetaUsuario";
<<<<<<< HEAD
import { URL_API } from "@apis/constantes";
import PantallaCarga from "@components/PantallaCarga/PantallaCarga";
import BotonBase from "@components/Botones/BotonBase";
=======
import BotonBase from "@components/Botones/BotonBase";
>>>>>>> 67a9e4d (refactor: se agrega un boton base y se reemplaza parcialmente el boton genérico)

export default function LogoutPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [usuarios, setUsuarios] = useState<any[]>([]);

  const handleAgregar = () => {
    navigate("/administracion/usuarios/crear");
  };

  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        console.log("Token de acceso:", token);

        const response = await fetch(`${URL_API}usuarios/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error al obtener los usuarios");
        }

        const data = await response.json();
        setUsuarios(data);
        console.log("Usuarios cargados correctamente:", data);
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
        setError("Error al cargar los usuarios. Intente nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <PageBase>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 gap-4 p-4">
        {loading && <PantallaCarga mensaje="Cargando usuarios..." />}

        {/* Botón Agregar */}
        <div className="w-full max-w-sm">
          <BotonBase variant="agregar" onClick={handleAgregar} />
        </div>

        {/* Mostrar error si hay */}
        {error && <p className="text-red-600 mt-2">{error}</p>}

        {/* Tarjetas de usuario */}
        <div className="flex flex-col gap-4 w-full max-w-md">
          {usuarios.length > 0 ? (
            usuarios.map((u) => (
              <TarjetaUsuario
                key={u.id}
                id={u.id}
                nombre={u.first_name || "No disponible"}
                apellido={u.last_name || "No disponible"}
                rol={
                  u.roles && u.roles.length > 0
                    ? u.roles.join(", ")
                    : u.is_staff
                    ? "Administrador"
                    : "No disponible"
                }
                activo={u.is_active ? "Activo" : "Inactivo"}
                onClickFlecha={() =>
                  navigate(`/administracion/usuarios/detalle/`, { state: { id: u.id } })
                }
              />
            ))
          ) : (
            !loading && (
              <p className="text-gray-600 text-center">
                No hay usuarios disponibles.
              </p>
            )
          )}
        </div>
      </div>
    </PageBase>
  );
}