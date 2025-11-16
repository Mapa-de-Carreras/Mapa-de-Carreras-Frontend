import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { URL_API } from "@apis/constantes";
import EditarDocenteForm from "./EditarDocenteForm";
import PageBase from "@components/PageBase/PageBase";
import PantallaCarga from "@components/PantallaCarga/PantallaCarga";
import ModalGenerico from "@components/Modal/ModalGenerico";
import { IDocenteForm } from "./DocenteForm";

export default function EditarDocente() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: docenteId, nombreCompleto } = location.state as {
    id: string;
    nombreCompleto: string;
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [datosDocente, setDatosDocente] = useState<IDocenteForm | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Cerrar modal
  const handleCerrarModal = () => {
    setMostrarModal(false);
    navigate("/docentes/gestion");
  };

  // Traer datos del docente al cargar
  useEffect(() => {
    const fetchDocente = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("Token no encontrado.");

        const resp = await fetch(`${URL_API}docentes/${docenteId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!resp.ok) throw new Error("Error al obtener datos del docente");

        const data = await resp.json();
        setDatosDocente({
          usuario_id: data.usuario.id, // se usa para enviar al backend
          modalidad_id: data.modalidad_id,
          caracter_id: data.caracter_id,
          dedicacion_id: data.dedicacion_id,
          cantidad_materias: data.cantidad_materias,
          activo: data.activo,
        });
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los datos del docente.");
      } finally {
        setLoading(false);
      }
    };

    fetchDocente();
  }, [docenteId]);

  // Guardar cambios
  const actualizarDocente = async (data: IDocenteForm) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("Token no encontrado.");

      const resp = await fetch(`${URL_API}docentes/${docenteId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!resp.ok) throw new Error("Error al actualizar");

      setMostrarModal(true);
    } catch (err) {
      console.error(err);
      setError("No se pudo actualizar el docente.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <PantallaCarga mensaje="Cargando..." />;

  return (
    <PageBase>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Editar Docente</h1>

        {error && (
          <p className="text-red-500 mt-4 text-center font-medium">{error}</p>
        )}

        {datosDocente && (
          <EditarDocenteForm
            onSubmit={actualizarDocente}
            defaultValues={datosDocente}
            soloLecturaUsuario={true} // el input de usuario será solo lectura
            nombreCompleto={nombreCompleto} 
          />
        )}

        {/* Modal de éxito */}
        <ModalGenerico
          abierto={mostrarModal}
          onClose={handleCerrarModal}
          icono={
            <span className="icon-[mdi--check-bold] text-green-600 text-5xl" />
          }
          titulo="Éxito"
          mensaje="Docente actualizado correctamente."
          textoBoton="Aceptar"
          colorBoton="#47ADA4"
          onConfirmar={handleCerrarModal}
        />
      </div>
    </PageBase>
  );
}
