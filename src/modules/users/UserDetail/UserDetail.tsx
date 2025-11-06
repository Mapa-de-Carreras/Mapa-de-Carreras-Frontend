import PageBase from "../../../shared/components/PageBase/PageBase";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import ModalGenerico from "@components/Modal/ModalGenerico";
import { useEffect, useState } from "react";
import { URL_API } from "@apis/constantes";
import PantallaCarga from "@components/PantallaCarga/PantallaCarga";
import { useLocation, useNavigate } from "react-router";
import BotonBase from "@components/Botones/BotonBase";
import BotonDetalle from "@components/Botones/BotonDetalle";
import BotonGenerico from "@components/Botones/BotonGenerico";

export default function UserDetail() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalVerificacion, setMostrarModalVerificacion] = useState(false);
  const [codigoVerificacion, setCodigoVerificacion] = useState("");
  const [errorGeneral, setErrorGeneral] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usuario, setUsuario] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || {};
  const [mensajeExito, setMensajeExito] = useState("");

  useEffect(() => {
    const fetchUsuario = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(`${URL_API}usuarios/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Error al obtener el usuario");
        const data = await response.json();
        setUsuario(data);
      } catch (error) {
        console.error(error);
        setError("Error al cargar el usuario. Intente nuevamente.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsuario();
  }, [id]);

  const handleEditar = () => {
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


  const handleActivarUsuario = async () => {
    if (!usuario) return;
    setLoading(true);
    setErrorGeneral("");

    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("Token no encontrado.");

        const res = await fetch(`${URL_API}auth/registrar/activar-cuenta/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email: usuario.email, code: codigoVerificacion }),
        });

        if (!res.ok) throw new Error("Código inválido");

        navigate("/administracion/usuarios/");
      } catch (err) {
        console.error("Error al verificar el código:", err);
        setErrorGeneral("El código de verificación no es válido o ha expirado.");
      } finally {
        setLoading(false);
      }
  };

    const handleGenerarCodigo = async () => {
      try {
            setLoading(true);
            const email = usuario.email;
            console.log("El email es: ",email);
            const response = await fetch(`${URL_API}auth/recuperar/solicitar-codigo/`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || "Error en la autenticación");
            }

            console.log("Email con código de recuperación enviado correctamente");
            setMensajeExito("Se ha enviado un código de verificación. Revisa tu correo electrónico."); 
          } catch (error) {
            console.error("Error al enviar el email:", error);
            setError("Error al enviar el email. Intente nuevamente.");
          } finally {
            setLoading(false);
          }
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
                  <span className="icon-[mdi--account] text-black text-[48px]" />
                </div>
                <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-black">
                  {usuario.first_name || "No disponible"}{" "}
                  {usuario.last_name || "No disponible"}
                </CardTitle>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mt-5">
                <BotonGenerico
                  texto="Editar"
                  color="#3E9956"
                  icono={<span className="icon-[ph--note-pencil] text-white text-2xl" />}
                  onClick={handleEditar}
                />
                <BotonGenerico
                  texto="Eliminar"
                  color="#B53B3B"
                  icono={<span className="icon-[mdi--trash-can] text-white text-2xl" />}
                  onClick={handleAbrirModalEliminar}
                />
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

           <div className="flex items-center justify-between mt-2">
              <strong className="text-black">Estado:</strong>
              {usuario.is_active ? (
                <span className="text-green-600 font-semibold">Activo</span>
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <span className="text-red-600 font-semibold">Inactivo</span>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <BotonGenerico
                      texto="Activar usuario"
                      color="#3E9956"
                      onClick={() => setMostrarModalVerificacion(true)}
                    />
                    <BotonGenerico
                      texto="Generar código"
                      color="#1D4ED8"
                      onClick={handleGenerarCodigo}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Mensaje de éxito */}
            {mensajeExito && (
              <p className="text-green-600 font-semibold mt-4 text-center">
                {mensajeExito}
              </p>
            )}
              <div>
                <strong className="text-black">Rol:</strong>{" "}
                {usuario.roles?.length > 0 ? usuario.roles.join(", ") : "No disponible"}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modal eliminar */}
      <ModalGenerico
        abierto={mostrarModal}
        onClose={handleCerrarModal}
        icono={<span className="icon-[mdi--trash-can] text-5xl" style={{ color: "#B53B3B" }} />}
        titulo="Eliminar Usuario"
        mensaje="¿Está seguro que desea eliminar este usuario?"
        textoBoton="Eliminar"
        colorBoton="#B53B3B"
        onConfirmar={handleConfirmarEliminar}
        textoBotonSecundario="Cancelar"
        colorBotonSecundario="#929292"
        onCancelar={handleCerrarModal}
      />

      {/*  Modal verificación / activación */}
            <ModalGenerico
          abierto={mostrarModalVerificacion} 
          onClose={() => setMostrarModalVerificacion(false)} 
          icono={<span className="icon-[mdi--email-check-outline] text-blue-600 text-5xl" />}
          titulo="Verificación de cuenta"
          mensaje="Ingrese el código de verificación que fue enviado al correo del usuario para activar su cuenta. También puede activarla más tarde desde el detalle de usuario." 
          textoBoton="Verificar"
          colorBoton="#3E9956"
          onConfirmar={handleActivarUsuario}
          textoBotonSecundario="Cancelar"
          colorBotonSecundario="#929292"
          onCancelar={() => setMostrarModalVerificacion(false)} 
        >
          <div className="mt-4">
            <input
              type="text"
              placeholder="Ingrese el código de verificación"
              value={codigoVerificacion}
              onChange={(e) => setCodigoVerificacion(e.target.value)}
              className="w-full p-2 border-2 border-black rounded-md text-center text-lg font-semibold text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-black"
            />
            {errorGeneral && (
              <p className="text-red-500 text-sm mt-2 text-center">
                {errorGeneral}
              </p>
            )}
          </div>
        </ModalGenerico>
    </PageBase>
  );
}