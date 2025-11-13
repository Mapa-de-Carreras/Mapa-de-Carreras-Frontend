import PageBase from "@components/PageBase/PageBase";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import BotonGenerico from "@components/Botones/BotonGenerico";
import ModalGenerico from "@components/Modal/ModalGenerico";
import PantallaCarga from "@components/PantallaCarga/PantallaCarga";
import { URL_API } from "@apis/constantes";

export interface IInstituto {
  id: number;
  codigo: string;
  nombre: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
}
export interface ICoordinador {
  id: number;
  username: string;
  nombre_completo: string;
  email: string;
  fecha_inicio: string;
}

export interface IPlanEstudio {
  id: number;
  fecha_inicio: string;
  esta_vigente: boolean;
  creado_por?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ICarrera {
  id: number;
  codigo: string;
  nombre: string;
  nivel: string;
  esta_vigente: boolean;
  instituto_id: number;
  instituto: IInstituto;
  created_at: string;
  updated_at: string;
  descripcion?: string;
  coordinador?: string;
  duracion?: string;
  cantidadMaterias?: number;
  coordinador_actual?: ICoordinador;
  planes?: IPlanEstudio[];
}



export default function DegreeDetail() {
  const location = useLocation();
  const { id } = (location.state as { id: number }) || {};
  const navigate = useNavigate();

  const [carrera, setCarrera] = useState<ICarrera | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      setError("No se proporcionó un ID válido para la carrera.");
      setLoading(false);
      return;
    }

    const fetchCarrera = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Token no encontrado. Inicie sesión nuevamente.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`${URL_API}carreras/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Error al obtener la carrera");
        const data = await res.json();
        setCarrera(data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la información de la carrera.");
      } finally {
        setLoading(false);
      }
    };

    console.log("ID de carrera a cargar:", id);
    fetchCarrera();
  }, [id]);

  const handleEditar = () => console.log("Editar carrera", id);

  const handleVerPlanEstudio = (idPlan: number) => {
   console.log("Ver plan de estudio id: ", idPlan);
   navigate("/academica/planes/detalle", { state: { id: idPlan } });
};

  const handleAbrirModalEliminar = () => setMostrarModal(true);
  const handleCerrarModal = () => setMostrarModal(false);

  const handleConfirmarEliminar = async () => {
    try {
      const token = localStorage.getItem("access_token");
      await fetch(`${URL_API}carreras/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/academica/carreras");
    } catch (err) {
      setError("No se pudo eliminar la carrera.");
    }
  };

  if (loading) {
    return <PantallaCarga mensaje="Cargando información de la carrera..." />;
  }

  if (error) {
    return (
      <PageBase>
        <p className="text-center text-red-600">{error}</p>
      </PageBase>
    );
  }

return (
    <PageBase>
      {carrera && (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 px-4 sm:px-6 md:px-10 lg:px-20 py-10">
          <Card className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
            <CardHeader className="flex flex-col items-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-full bg-white border border-black">
                  <span
                    className="icon-[mdi--school-outline] text-black text-[48px] sm:text-[60px]"
                    aria-label="Carrera"
                  />
                </div>
                <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-black">
                  {carrera.nombre || "Carrera sin nombre"}
                </CardTitle>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mt-5">
                <BotonGenerico
                  texto="Editar"
                  color="#3E9956"
                  icono={
                    <span className="w-6 h-6 flex items-center justify-center text-white text-2xl">
                      <span className="icon-[ph--note-pencil]" aria-label="Editar" />
                    </span>
                  }
                  onClick={handleEditar}
                />
                <BotonGenerico
                  texto="Eliminar"
                  color="#B53B3B"
                  icono={
                    <span className="w-6 h-6 flex items-center justify-center text-white text-2xl">
                      <span className="icon-[mdi--trash-can]" aria-label="Eliminar" />
                    </span>
                  }
                  onClick={handleAbrirModalEliminar}
                />
              </div>
            </CardHeader>

            <CardContent className="mt-6 space-y-3 text-base sm:text-lg text-gray-800">
              <div>
                <strong className="text-black">Instituto:</strong>{" "}
                {carrera.instituto?.nombre || "No disponible"}
              </div>
              <div>
                <strong className="text-black">Código:</strong> {carrera.codigo}
              </div>
              <div>
                <strong className="text-black">Nivel:</strong> {carrera.nivel}
              </div>
              <div>
                <strong className="text-black">Vigente:</strong>{" "}
                {carrera.esta_vigente ? "Sí" : "No"}
              </div>

              {/* Nuevo campo: Coordinador actual */}
              <div>
               <strong className="text-black">Coordinador actual:</strong>{" "}
                    {carrera.coordinador_actual
                ? `${carrera.coordinador_actual.nombre_completo}`
                : "Sin asignar"}
              </div>

              {/* Plan de Estudio */}
              <div className="mt-6">
                <Card className="mt-3 p-4 bg-white border border-black rounded-xl shadow-sm cursor-pointer hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-black text-lg">
                        Plan de Estudio
                      </p>
                    </div>
                    <BotonGenerico
                      color="#49454F"
                      icono={
                        <span className="icon-[majesticons--share] text-white text-3xl" />
                      }
                      onClick={() => {
                          const idPlan = carrera.planes?.[0]?.id; //accede al primer plan
                          if (idPlan) {
                            console.log("Navegando al plan:", idPlan);
                            handleVerPlanEstudio(idPlan);
                          } else {
                            console.warn("La carrera no tiene planes de estudio");
                          }
                        }}
                      type="button"
                      className="ml-auto w-10 h-10 rounded-full flex items-center justify-center p-0 border border-black hover:opacity-80 transition"
                    />
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <ModalGenerico
        abierto={mostrarModal}
        onClose={handleCerrarModal}
        icono={
          <span className="icon-[mdi--trash-can] text-5xl" style={{ color: "#B53B3B" }} />
        }
        titulo="Eliminar Carrera"
        mensaje="¿Está seguro que desea eliminar esta carrera?"
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
