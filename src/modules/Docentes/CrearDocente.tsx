import { useNavigate } from "react-router";
import { URL_API } from "@apis/constantes";
import DocenteForm, { IDocenteForm } from "./DocenteForm";
import PageBase from "@components/PageBase/PageBase";
import { useState } from "react";
import PantallaCarga from "@components/PantallaCarga/PantallaCarga";
import ModalGenerico from "@components/Modal/ModalGenerico";

export default function CrearDocente() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Modal de éxito
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleCerrarModal = () => {
    setMostrarModal(false);
    navigate("/docentes/gestion");
  };

  const crearDocente = async (data: IDocenteForm) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Token no encontrado. Inicie sesión nuevamente.");
        setLoading(false);
        return;
      }
      
      console.log("Body a enviar crear docente: ",data);
      const resp = await fetch(`${URL_API}docentes/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!resp.ok) throw new Error("Error al crear");

      // Muestra el modal de éxito
      setMostrarModal(true);
    } catch (error) {
      console.error(error);
      alert("Error al crear el docente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageBase>
      {loading && <PantallaCarga mensaje="Cargando..." />}

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Crear Docente</h1>

        <DocenteForm onSubmit={crearDocente} />
      </div>

      {/* Modal */}
      <ModalGenerico
        abierto={mostrarModal}
        onClose={handleCerrarModal}
        icono={
          <span className="icon-[mdi--check-bold] text-green-600 text-5xl" />
        }
        titulo="Éxito"
        mensaje="Docente creado correctamente."
        textoBoton="Aceptar"
        colorBoton="#47ADA4"
        onConfirmar={handleCerrarModal}
      />
    </PageBase>
  );
}