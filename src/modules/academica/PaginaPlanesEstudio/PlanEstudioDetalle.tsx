import PageBase from "@components/PageBase/PageBase";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import BotonGenerico from "@components/Botones/BotonGenerico";
import { useDeletePlanEstudio, useGetPlanDetalle } from "@apis/planestudio";
import BotonBase from "@components/Botones/BotonBase";
import useAuth from "@hooks/useAuth";
import TablaAsignaturas from "./TablaAsignaturas";
import { useModal } from "@components/Providers/ModalProvider";
import { useGetDocumento } from "@apis/documentos";

export default function PlanEstudioDetalle() {
  const location = useLocation();
  const { id } = (location.state as { id: number }) || {};
  const navigate = useNavigate();
  const { data: plan} = useGetPlanDetalle(id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user: usuario } = useAuth();
  const ROLES_PERMITIDOS = ["Administrador", "Coordinador"];
  const esAdmin = usuario?.roles?.some((r) => ROLES_PERMITIDOS.includes(r.nombre)) ?? false;
  const { showModal } = useModal();
  const deletePlanEstudio = useDeletePlanEstudio(Number(id));
  const { data: documento} = useGetDocumento(id);

  
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
       navigate(`/academica/planes/editar/${id}`);
  }

  const handleClickModalEliminar = () => {
    showModal({
      title: "Eliminar plan de estudio",
      description: "¿Está seguro que desea eliminar este plan de estudio?",
      buttons: [
        {
          variant: "eliminar",
          autoClose: false,
          onClick: handleConfirmDelete,
        },
        { variant: "cancelar", onClick: () => {} },
      ],
    });
  };

  const handleConfirmDelete = () => {
    if (!id) return;

    showModal({
      isLoading: true,
      msg: 'Eliminando Comisión...',
    });

    deletePlanEstudio.mutate(
      { params: { id: id } },
      {
        onSuccess: () => {
          showModal({
            title: 'Éxito',
            description: 'El plan de estudio se ha eliminado correctamente.',
            buttons: [{ variant: 'aceptar', onClick: () => navigate(-1) }],
            isLoading: false,
          });
        },
        onError: (err) => {
          showModal({
            title: 'Error',
            description: err.message || 'No se pudo eliminar el plan de estudio.',
            buttons: [{ variant: 'error', onClick: () => {} }],
            isLoading: false,
          });
        },
      }
    );
  };

return (
    <PageBase titulo='Detalle' volver>
      
                
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

              {esAdmin && (
                  <div className="flex justify-center gap-4 mt-6 mb-4">
                    <BotonBase 
                      variant="editar" 
                      onClick={handleEditar} 
                    />
                    <BotonBase 
                      variant="eliminar" 
                      onClick={handleClickModalEliminar} 
                    />
                  {documento?.archivo_url && (
                        <BotonGenerico
                          texto="Ver Documento"
                          icono={<span className="icon-[mdi--eye] text-xl" />}
                          color="#3B82F6" 
                          onClick={() => window.open(documento.archivo_url, "_blank")}
                        />
                      )}
                  </div>
                )}
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

            
          </Card>
        </div>
      )}
    </PageBase>
  );
}