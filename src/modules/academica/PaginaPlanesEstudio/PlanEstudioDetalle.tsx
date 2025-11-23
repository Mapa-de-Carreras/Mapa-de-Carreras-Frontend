import PageBase from "@components/PageBase/PageBase";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import BotonGenerico from "@components/Botones/BotonGenerico";
import { useGetPlanDetalle } from "@apis/planestudio";
import BotonBase from "@components/Botones/BotonBase";
import { useDeletePlan} from "@apis/planestudio";
import useAuth from "@hooks/useAuth";
import TablaAsignaturas from "./TablaAsignaturas";

export default function PlanEstudioDetalle() {
  const location = useLocation();
  const { id } = (location.state as { id: number }) || {};
  const navigate = useNavigate();
  const { deletePlan, loading: deleting, error: deleteError, success } = useDeletePlan();
  const { data: plan} = useGetPlanDetalle(id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user: usuario } = useAuth();
  const ROLES_PERMITIDOS = ["Administrador", "Coordinador"];
  const esAdmin = usuario?.roles?.some((r) => ROLES_PERMITIDOS.includes(r.nombre)) ?? false;

  if (error) {
    return (
      <PageBase>
        <p className="text-center text-red-600">{error}</p>
      </PageBase>
    );
  }

const handleVerAsignatura = (asignaturaId: number) => {
    navigate(`/academica/asignaturas/detalle/${asignaturaId}`, { 
      state: { 
        planId: plan?.id
      }
    });
};
  const handleEditar = () => {
 //    const carreraId= data.carrera.id;
       navigate(`/academica/planes/editar/${id}`);
  }
  const handleEliminar = async () => {
    console.log("Eliminar plan");
    await deletePlan(id);
    navigate("/academica/planes");
  };

return (
    <PageBase>
      
                {esAdmin && (
                  <div className="flex justify-center gap-4 mt-6 mb-4">
                    <BotonBase 
                      variant="editar" 
                      onClick={handleEditar} 
                    />
                    <BotonBase 
                      variant="eliminar" 
                      onClick={handleEliminar} 
                    />
                  </div>
                )}
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

              <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
                {plan.documento
                  ? `${plan.documento.tipo} ${plan.documento.emisor} Nº ${plan.documento.numero}/${plan.documento.anio}`
                  : "Plan sin nombre"
                }
              </CardTitle>

                {plan.carrera && (
                  <p className="text-gray-700 dark:text-gray-300 text-base">
                    Carrera: {plan.carrera.nombre}
                  </p>
                )}

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
               
                     <TablaAsignaturas
                asignaturas={plan.asignaturas}
                onVerAsignatura={handleVerAsignatura}
              />
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