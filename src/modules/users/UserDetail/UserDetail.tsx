import PageBase from "../../../shared/components/PageBase/PageBase";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import ModalGenerico from "@components/Modal/ModalGenerico";
import { useEffect, useState } from "react";
import { URL_API } from "@apis/constantes";
import PantallaCarga from "@components/PantallaCarga/PantallaCarga";
import { useLocation, useNavigate } from "react-router";
import BotonBase from "@components/Botones/BotonBase";
import BotonDetalle from "@components/Botones/BotonDetalle";

export default function UserDetail() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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

    navigate("/administracion/usuarios/editar", { state: { id: usuario.id } });
  };

  const handleAbrirModalEliminar = () => setMostrarModal(true);
  const handleCerrarModal = () => setMostrarModal(false);

  const handleConfirmarEliminar = async () => {
    if (!id) return;

    const loggedUserId = localStorage.getItem("user_id");
    const loggedUserIsStaff = localStorage.getItem("is_staff") === "true";
    if (loggedUserId && loggedUserId === String(id)) {
      setError("No puedes eliminar tu propio usuario.");
      setMostrarModal(false);
      return;
    }

    console.log("Permisos usuario: ", loggedUserIsStaff);
     if (!loggedUserIsStaff) {
      setError("No tienes permisos para eliminar usuarios.");
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

  const formatFecha = (fecha: string | null) => {
    if (!fecha) return "No disponible";
    const d = new Date(fecha);
    return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${d.getFullYear()}`;
  };

  return (
    <PageBase>
      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 px-4 sm:px-6 md:px-10 lg:px-20 py-10">
        {loading && <PantallaCarga mensaje="Cargando datos de usuario..." />}
        {usuario && (
          <Card className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
            <CardHeader className="flex flex-col items-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-full bg-white border border-black">
                  <span
                    className="icon-[mdi--account] text-black text-[48px] sm:text-[60px]"
                    aria-label="Usuario"
                  />
                </div>
                <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-black">
                  {usuario.first_name || "No disponible"}{" "}
                  {usuario.last_name || "No disponible"}
                </CardTitle>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mt-5">
                <BotonBase variant="editar" onClick={handleEditar} />
                <BotonBase variant="eliminar" onClick={handleAbrirModalEliminar} />
              </div>
            </CardHeader>

            {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

            <CardContent className="mt-6 space-y-3 text-base sm:text-lg text-gray-800">
              <div>
                <strong className="text-black">Nombre:</strong> {usuario.first_name || "No disponible"}
              </div>
              <div>
                <strong className="text-black">Apellido:</strong> {usuario.last_name || "No disponible"}
              </div>
              <div>
                <strong className="text-black">Usuario:</strong> {usuario.username || "No disponible"}
              </div>
              <div>
                <strong className="text-black">Email:</strong> {usuario.email || "No disponible"}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <strong className="text-black">Celular:</strong> {usuario.celular || "No disponible"}
                </div>
                <span className="icon-[mdi--phone-sync-outline] text-black text-lg" />
              </div>
              <div>
                <strong className="text-black">Rol:</strong>{" "}
                {usuario.roles?.length > 0 ? usuario.roles.join(", ") : "No disponible"}
              </div>
              <div>
                <strong className="text-black">Fecha de nacimiento:</strong>{" "}
                {formatFecha(usuario.fecha_nacimiento)}
              </div>

              {/* Carrera */}
              <div className="mt-6">
                <strong className="text-black">Carreras:</strong>
                <Card className="mt-3 p-4 bg-white border border-black rounded-xl shadow-sm cursor-pointer hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-black text-lg">Licenciatura en Sistemas</p>
                      <p className="text-sm text-gray-600">Coordinador: Ezequiel Moyano</p>
                    </div>
                    <BotonDetalle onClick={() => handleVerCarrera(1)} />
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