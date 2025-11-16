import { useNavigate, useParams } from "react-router";
import { useGetDocenteDetalle } from "@apis/docentes";
import PageBase from "@components/PageBase/PageBase";
import BotonBase from "@components/Botones/BotonBase";
import { useState } from "react";
import ModalGenerico from "@components/Modal/ModalGenerico";
import PantallaCarga from "@components/PantallaCarga/PantallaCarga";
import { URL_API } from "@apis/constantes";

export default function DocenteDetalle() {
  const { id } = useParams();
  const { data: docente, isLoading, error } = useGetDocenteDetalle(Number(id));
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [errorEliminar, setErrorEliminar] = useState<string | null>(null);

  // Obtener rol del usuario logueado
  const isStaff = localStorage.getItem("is_staff") === "true";
  console.log("Rol ,es staff?: ",isStaff);

  if (isLoading) return <p>Cargando docente...</p>;
  if (error) return <p>Error al cargar el docente.</p>;
  if (!docente) return <p>No se encontró el docente.</p>;

  const handleEditar = () => {
    if (!docente) return;
    const nombreCompleto = `${docente.usuario.first_name} ${docente.usuario.last_name}`;

    navigate(`/docentes/editar/`, {
      state: {
        id: docente.id,
        nombreCompleto,
      },
    });
  };

    const handleCerrarModal = () => {
    setMostrarModal(false);
    navigate("/docentes/gestion");
  };


  const handleEliminar = async () => {
      console.log("Eliminar");

      const idUsuarioLogueado = localStorage.getItem("user_id");
      
        console.log(
        "Comparando IDs → Logueado:",
        idUsuarioLogueado,
        " - Docente:",
        id,
        " - Son iguales?:",
        String(idUsuarioLogueado) === String(id)
      );
      if (String(idUsuarioLogueado) === String(id)) {
        console.log("No podés eliminar tu propio usuario.");
        setErrorEliminar("No podés eliminar tu propio usuario.");
        return;
      }

      try {
        setLoading(true);

        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("Token no encontrado.");

        const resp = await fetch(`${URL_API}docentes/${id}/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!resp.ok) throw new Error("Error al eliminar");

        setMostrarModal(true);
      } catch (err) {
        console.error(err);
        setErrorEliminar("No se pudo eliminar el docente.");
      } finally {
        setLoading(false);
      }
  };

  const carreras =
    docente.designaciones?.actuales?.[0]?.docente?.carreras ?? [];
    if (loading) return <PantallaCarga mensaje="Cargando..." />;
    if (errorEliminar) return <p>Error al eliminar el docente.</p>;

  return (
    <PageBase>
      <div className="p-6 space-y-6 mt-14">
        <h1 className="text-2xl font-bold">
          {docente.usuario.first_name} {docente.usuario.last_name}
        </h1>

        {/* Datos principales */}
        <div className="bg-card p-4 rounded-lg shadow space-y-2 text-foreground">
          <p>
            <strong>Email:</strong> {docente.usuario.email}
          </p>
          <p>
            <strong>Legajo:</strong> {docente.usuario.legajo}
          </p>
          <p>
            <strong>Celular:</strong> {docente.usuario.celular}
          </p>
          <p>
            <strong>Cantidad de materias:</strong> {docente.cantidad_materias}
          </p>
          <p>
            <strong>Modalidad:</strong> {docente.modalidad ?? "No informado"}
          </p>
          <p>
            <strong>Carácter:</strong> {docente.caracter ?? "No informado"}
          </p>
          <p>
            <strong>Dedicación:</strong> {docente.dedicacion ?? "No informado"}
          </p>
        </div>

        {/* Carreras */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Carreras asociadas</h2>

          {carreras.length > 0 ? (
            <ul className="list-disc ml-6 mt-2">
              {carreras.map((c) => (
                <li key={c.id}>{c.nombre}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">
              No está asignado a ninguna carrera.
            </p>
          )}
        </div>

        {/* Designaciones */}
        <div>
          <h2 className="text-xl font-semibold">Designaciones actuales</h2>

          {docente.designaciones.actuales.length > 0 ? (
            <ul className="list-disc ml-6 mt-2">
              {docente.designaciones.actuales.map((d) => (
                <li key={d.id}>
                  {d.tipo_designacion} — {d.comision.asignatura_nombre}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">Sin designaciones actuales.</p>
          )}
        </div>
      </div>

      {/* Botones */}
      <BotonBase variant="editar" onClick={handleEditar} />

      {/* Solo mostrar si es staff */}
      {isStaff && (
        <BotonBase variant="eliminar" onClick={handleEliminar} />
      )}

         {/* Modal de éxito */}
              <ModalGenerico
                abierto={mostrarModal}
                onClose={handleCerrarModal}
                icono={
                  <span className="icon-[mdi--check-bold] text-green-600 text-5xl" />
                }
                titulo="Éxito"
                mensaje="Docente eliminado correctamente."
                textoBoton="Aceptar"
                colorBoton="#47ADA4"
                onConfirmar={handleCerrarModal}
              />
    </PageBase>
  );
}
