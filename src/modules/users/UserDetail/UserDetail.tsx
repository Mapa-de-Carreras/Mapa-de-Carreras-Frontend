import PageBase from "../../../shared/components/PageBase/PageBase";
import BotonGenerico from "../../../shared/components/Botones/BotonGenerico";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import ModalGenerico from "@components/Modal/ModalGenerico";
import { useEffect, useState } from "react";
import { URL_API } from "@apis/constantes";
import PantallaCarga from "@components/PantallaCarga/PantallaCarga";
import { useLocation, useNavigate } from "react-router";

export default function UserDetail() {
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [usuario, setUsuario] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};

  useEffect(() => {
    const fetchUsuario = async () => {
      if (!id) {
        console.error("ID de usuario no proporcionado");
        return;
      }
      
      setLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(`${URL_API}usuarios/${id}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error al obtener el usuario");
        }

        const data = await response.json();
        setUsuario(data);
      } catch (error) {
        console.error("Error al cargar el usuario:", error);
        setError("Error al cargar el usuario. Intente nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [id]);

  const handleEditar = () => {
    const loggedUserId = localStorage.getItem("user_id");

    if (!usuario.is_staff) {
      setError("No tenés los permisos para editar este usuario.");
      setMostrarModal(false);
      return;
    }

    if (loggedUserId && loggedUserId !== String(usuario.id)) {
      setError("Solo podés editar tu propio usuario.");
      setMostrarModal(false);
      return;
    }

    console.log("Usuario permitido para editar:", usuario);
   
  };

  const handleAbrirModalEliminar = () => {
    setMostrarModal(true); 
  };

  const handleConfirmarEliminar = async () => {
    if (!id) {
      console.error("ID de usuario no proporcionado");
      return;
    }

      const loggedUserId = localStorage.getItem("user_id");
  
    // No permitir eliminar a uno mismo
    if (loggedUserId && loggedUserId === String(id)) {
      setError("No puedes eliminar tu propio usuario.");
      setMostrarModal(false);
      return;
    }


    // Verificar si el usuario es staff antes de eliminar
    if (!usuario.is_staff) {
      setError("No se puede eliminar un usuario que no es staff.");
      setMostrarModal(false);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${URL_API}usuarios/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar el usuario");
      }

      console.log("Usuario eliminado correctamente");
      setMostrarModal(false);
      navigate("/administracion/usuarios"); 
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      setError("Error al eliminar el usuario. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerCarrera = (id: number) => console.log("Ver carrera con id:", id);
  const handleCerrarModal = () => setMostrarModal(false);

  const formatFecha = (fecha: string | null) => {
    if (!fecha) return "No disponible";
    const d = new Date(fecha);
    const dia = String(d.getDate()).padStart(2, "0");
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const anio = d.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  return (
    <PageBase>
      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-6">
        {loading && <PantallaCarga mensaje="Cargando datos de usuario..." />}

        {usuario && (
          <Card className="w-full max-w-md bg-white rounded-2xl shadow-md border border-gray-200 p-4">
            <CardHeader className="flex flex-col items-center">
              <div className="flex items-center justify-center gap-4">
                <div
                  className="w-16 h-16 flex items-center justify-center rounded-full bg-white border"
                  style={{ borderColor: "#000000" }}
                >
                  <span
                    className="icon-[mdi--account] text-black w-full h-full text-[48px] flex items-center justify-center"
                    aria-label="Usuario"
                  />
                </div>
                <CardTitle className="text-xl font-semibold text-center text-black">
                  {usuario.first_name || "No disponible"}{" "}
                  {usuario.last_name || "No disponible"}
                </CardTitle>
              </div>

              <div className="flex gap-3 mt-3">
                <BotonGenerico
                  texto="Editar"
                  color="#3E9956"
                  icono={
                    <span className="w-6 h-6 flex items-center justify-center rounded-full text-white text-2xl">
                      <span className="icon-[ph--note-pencil]" aria-label="Editar" />
                    </span>
                  }
                  onClick={handleEditar}
                />
                <BotonGenerico
                  texto="Eliminar"
                  color="#B53B3B"
                  icono={
                    <span className="w-6 h-6 flex items-center justify-center rounded-full text-white text-2xl">
                      <span className="icon-[mdi--trash-can]" aria-label="Eliminar" />
                    </span>
                  }
                  onClick={handleAbrirModalEliminar}
                />
              </div>
            </CardHeader>

            {error && <p className="text-red-600 mt-2">{error}</p>}

            <CardContent className="mt-4 space-y-2 text-sm">
              <div>
                <strong className="text-black">Nombre:</strong>{" "}
                <span className="text-gray-700">{usuario.first_name || "No disponible"}</span>
              </div>
              <div>
                <strong className="text-black">Apellido:</strong>{" "}
                <span className="text-gray-700">{usuario.last_name || "No disponible"}</span>
              </div>
              <div>
                <strong className="text-black">Usuario:</strong>{" "}
                <span className="text-gray-700">{usuario.username || "No disponible"}</span>
              </div>
              <div>
                <strong className="text-black">Email:</strong>{" "}
                <span className="text-gray-700">{usuario.email || "No disponible"}</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <strong className="text-black">Celular:</strong>{" "}
                  <span className="text-gray-700">{usuario.celular || "No disponible"}</span>
                </div>
                <span
                  className="icon-[mdi--phone-sync-outline] text-black text-lg"
                  aria-label="Llamar"
                />
              </div>
              <div>
                <strong className="text-black">Rol:</strong>{" "}
                <span className="text-gray-700">
                  {usuario.roles && usuario.roles.length > 0
                    ? usuario.roles.join(", ")
                    : "No disponible"}
                </span>
              </div>
              <div>
                <strong className="text-black">Fecha de nacimiento:</strong>{" "}
                <span className="text-gray-700">{formatFecha(usuario.fecha_nacimiento)}</span>
              </div>

              {/* Carrera hardcodeada */}
              <div className="mt-4">
                <strong className="text-black">Carreras:</strong>
                <Card className="mt-2 p-3 bg-white border border-black rounded-xl shadow-md cursor-pointer hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-black">
                        Licenciatura en Sistemas
                      </p>
                      <p className="text-sm text-gray-600">
                        Coordinador: Ezequiel Moyano
                      </p>
                    </div>
                    <BotonGenerico
                      color="#49454F"
                      icono={
                        <span className="icon-[majesticons--share] text-white text-4xl" />
                      }
                      onClick={() => handleVerCarrera(1)}
                      type="button"
                      className="ml-auto w-10 h-10 rounded-full flex items-center justify-center p-0 border border-black hover:opacity-80 transition"
                    />
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <ModalGenerico
        abierto={mostrarModal}
        onClose={handleCerrarModal}
        icono={
          <span className="icon-[mdi--trash-can] text-5xl" style={{ color: "#B53B3B" }} />
        }
        titulo="Eliminar Usuario"
        mensaje="¿Está seguro que desea eliminar este usuario?"
        textoBoton="Eliminar"
        colorBoton="#B53B3B"
        onConfirmar={handleConfirmarEliminar}
        textoBotonSecundario="Cancelar"
        colorBotonSecundario="#929292"
        onCancelar={handleCerrarModal}
      />
    </PageBase>
  );
}