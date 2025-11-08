import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PageBase from "@components/PageBase/PageBase";
import TarjetaUsuario from "@components/TarjetaUsuario";
import { URL_API } from "@apis/constantes";
import PantallaCarga from "@components/PantallaCarga/PantallaCarga";
import BotonBase from "@components/Botones/BotonBase";

export default function LogoutPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [rolUsuario, setRolUsuario] = useState<string>("");

  const handleAgregar = () => {
    navigate("/administracion/usuarios/crear");
  };

  useEffect(() => {
    const fetchUsuario = async () => {
      const id = localStorage.getItem("user_id");
      if (!id) return;

      setLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(`${URL_API}usuarios/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Error al obtener el usuario");

        const data = await response.json();

        // Guardamos el rol principal del usuario logueado
        console.log("Data: ",data);
        if (data.roles && data.roles.length > 0) {
          console.log("Rol actual: ",data.roles);
          setRolUsuario(data.roles[0].toLowerCase());
        } else if (data.is_staff) {
          setRolUsuario("administrador");
        } else {
          setRolUsuario("usuario");
        }
      } catch (error) {
        console.error(error);
        setError("Error al cargar el usuario. Intente nuevamente.");
      }finally{
        setLoading(false);
      }
    };

    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(`${URL_API}usuarios/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          // Traducir mensaje del backend
          if (errorData.detail === "You do not have permission to perform this action.") {
            throw new Error("No tiene permisos para realizar esta acción.");
          } else {
            throw new Error(errorData.message || "Error al obtener los usuarios");
          }
        }

        const data = await response.json();
        setUsuarios(data);
        console.log("Usuarios cargados correctamente:", data);
      } catch (error: any) {
        console.error("Error al cargar los usuarios:", error);
        setError(error.message || "Error al cargar los usuarios. Intente nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
    fetchUsuarios();
  }, []);

  return (
    <PageBase>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 gap-4 p-4">
        {loading && <PantallaCarga mensaje="Cargando usuarios..." />}

        {/* Botón Agregar — visible solo si no es coordinador ni docente */}
        {rolUsuario !== "coordinador" && rolUsuario !== "docente" && (
          <div className="w-full max-w-sm">
            <BotonBase variant="agregar" onClick={handleAgregar} />
          </div>
        )}

        {/* Mostrar error si hay */}
        {error && <p className="text-red-600 mt-2 text-center">{error}</p>}

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