import PageBase from "@components/PageBase/PageBase";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import BotonGenerico from "@components/Botones/BotonGenerico";
import PantallaCarga from "@components/PantallaCarga/PantallaCarga";
import { URL_API } from "@apis/constantes";

interface IAsignatura {
  id: number;
  codigo: string;
  nombre: string;
  activo: boolean;
  correlativa?: {
    id: number;
    nombre: string;
  } | null;
}

interface IPlanEstudio {
  id: number;
  fecha_inicio: string;
  esta_vigente: boolean;
  documento: string;
  asignaturas: IAsignatura[];
}

export default function PlanEstudioDetalle() {
  const location = useLocation();
  const { id } = (location.state as { id: number }) || {};
  const navigate = useNavigate();

  const [plan, setPlan] = useState<IPlanEstudio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlanEstudio = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Token no encontrado. Inicie sesión nuevamente.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`${URL_API}planes/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Error al obtener el plan de estudio");
        const data = await res.json();
        console.log("Plan de estudio obtenido:", data);
        setPlan(data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la información del plan de estudio.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlanEstudio();
  }, [id]);

  if (loading) {
    return <PantallaCarga mensaje="Cargando plan de estudio..." />;
  }

  if (error) {
    return (
      <PageBase>
        <p className="text-center text-red-600">{error}</p>
      </PageBase>
    );
  }

  const handleVerAsignatura = (id: number) => {
    navigate("/academica/asignaturas/detalle", { state: { id } });
  };

  return (
    <PageBase>
      {plan && (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 px-4 sm:px-6 md:px-10 lg:px-20 py-10">
          <Card className="w-full max-w-4xl bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
            <CardHeader className="flex flex-col items-center text-center">
              <div className="flex flex-col items-center justify-center gap-3">
                <span
                  className="icon-[mdi--book-education-outline] text-black text-[60px]"
                  aria-label="Plan de estudio"
                />
                <CardTitle className="text-2xl sm:text-3xl font-bold text-black">
                  {plan.documento || "Plan sin nombre"}
                </CardTitle>
                <p className="text-gray-600 text-base">
                  Vigente: {plan.esta_vigente ? "Sí" : "No"} | Inicio:{" "}
                  {new Date(plan.fecha_inicio).toLocaleDateString()}
                </p>
              </div>
            </CardHeader>

            <CardContent className="mt-6 space-y-6">
              <h3 className="text-xl font-semibold text-black text-center">
                Asignaturas y correlativas
              </h3>

              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-xl overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-gray-700 font-semibold border-b border-gray-300">
                        Asignatura
                      </th>
                      <th className="px-4 py-3 text-left text-gray-700 font-semibold border-b border-gray-300">
                        Correlativa
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {plan.asignaturas && plan.asignaturas.length > 0 ? (
                      plan.asignaturas.map((a) => (
                        <tr
                          key={a.id}
                          className="hover:bg-gray-50 transition cursor-pointer"
                        >
                          <td
                            className="px-4 py-3 border-b border-gray-200 text-gray-700 hover:underline"
                            onClick={() => handleVerAsignatura(a.id)}
                          >
                            {a.nombre}
                          </td>
                          <td className="px-4 py-3 border-b border-gray-200 text-gray-800">
                            {a.correlativa
                              ? a.correlativa.nombre
                              : "— Sin correlativa —"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={2}
                          className="text-center text-gray-600 py-4 border-b border-gray-200"
                        >
                          No hay asignaturas registradas.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>

            <div className="flex justify-center mt-6">
              <BotonGenerico
                texto="Volver"
                color="#49454F"
                icono={
                  <span className="w-6 h-6 flex items-center justify-center text-white text-xl">
                    <span
                      className="icon-[mdi--arrow-left]"
                      aria-label="Volver"
                    />
                  </span>
                }
                onClick={() => navigate(-1)}
              />
            </div>
          </Card>
        </div>
      )}
    </PageBase>
  );
}
