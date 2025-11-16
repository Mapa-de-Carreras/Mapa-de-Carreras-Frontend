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
  correlativas: {
    id: number;
    nombre: string;
  }[];
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

 const handleVerAsignatura = (asignaturaId: number) => {
    navigate("/academica/asignaturas/detalle", { 
      state: { 
        asignaturaId,
        planId: plan?.id
      }
    });
  };

return (
    <PageBase>
      {plan && (
        <div className="flex flex-col items-center justify-start min-h-screen 
                        bg-gray-50 dark:bg-gray-900 
                        px-4 sm:px-6 md:px-10 lg:px-20 py-10">
          
          <Card className="w-full max-w-4xl 
                          bg-white dark:bg-gray-800 
                          rounded-2xl shadow-lg 
                          border border-gray-300 dark:border-gray-700 
                          p-6 md:p-8">
            
            <CardHeader className="flex flex-col items-center text-center">
              <div className="flex flex-col items-center justify-center gap-3">
                
                <span
                  className="icon-[mdi--book-education-outline] 
                            text-gray-900 dark:text-gray-100 
                            text-[60px]"
                />

                <CardTitle className="text-2xl sm:text-3xl font-bold 
                                      text-gray-900 dark:text-gray-100">
                  {plan.documento || "Plan sin nombre"}
                </CardTitle>

                <p className="text-gray-600 dark:text-gray-300 text-base">
                  Vigente: {plan.esta_vigente ? "Sí" : "No"} | Inicio:{" "}
                  {new Date(plan.fecha_inicio).toLocaleDateString()}
                </p>
              </div>
            </CardHeader>

            <CardContent className="mt-6 space-y-6">
              <h3 className="text-xl font-semibold 
                            text-gray-900 dark:text-gray-100 
                            text-center">
                Asignaturas y correlativas
              </h3>

              <div className="overflow-x-auto">
                <table className="min-w-full border 
                                  border-gray-300 dark:border-gray-700 
                                  rounded-xl overflow-hidden">
                  
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left 
                                    text-gray-700 dark:text-gray-200 
                                    font-semibold 
                                    border-b border-gray-300 dark:border-gray-600">
                        Asignatura
                      </th>
                      <th className="px-4 py-3 text-left 
                                    text-gray-700 dark:text-gray-200 
                                    font-semibold 
                                    border-b border-gray-300 dark:border-gray-600">
                        Correlativa
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {plan.asignaturas && plan.asignaturas.length > 0 ? (
                      plan.asignaturas.map((a) => (
                        <tr
                          key={a.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer"
                        >
                          {/* Asignatura */}
                          <td
                            className="px-4 py-3 
                                      border-b border-gray-200 dark:border-gray-700 
                                      text-gray-700 dark:text-gray-200 
                                      hover:underline"
                            onClick={() => handleVerAsignatura(a.id)}
                          >
                            {a.nombre}
                          </td>

                          {/* Correlativas */}
                          <td className="px-4 py-3 
                                        border-b border-gray-200 dark:border-gray-700 
                                        text-gray-800 dark:text-gray-200">
                            {a.correlativas.length > 0 ? (
                              <div className="flex flex-col gap-1">
                                {a.correlativas.map((c) => (
                                  <span
                                    key={c.id}
                                    className="hover:underline cursor-pointer 
                                              text-gray-800 dark:text-gray-300"
                                    onClick={() => handleVerAsignatura(c.id)}
                                  >
                                    {c.nombre}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-gray-600 dark:text-gray-400">
                                — Sin correlativas —
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={2}
                          className="text-center 
                                    text-gray-600 dark:text-gray-400 
                                    py-4 
                                    border-b border-gray-200 dark:border-gray-700"
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
                  <span className="w-6 h-6 flex items-center justify-center 
                                  text-white dark:text-white text-xl">
                    <span className="icon-[mdi--arrow-left]" />
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