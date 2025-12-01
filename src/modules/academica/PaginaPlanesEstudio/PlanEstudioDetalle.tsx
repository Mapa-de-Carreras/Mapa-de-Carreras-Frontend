import PageBase from "@components/PageBase/PageBase";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { useDeletePlanEstudio, useGetPlanDetalle, useDeletePlanAsignatura, usePatchPlanVigencia } from "@apis/planestudio";
import BotonBase from "@components/Botones/BotonBase";
import useAuth from "@hooks/useAuth";
import TablaAsignaturas from "./TablaAsignaturas";
import { useModal } from "@components/Providers/ModalProvider";
import { useGetDocumento } from "@apis/documentos";
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga';
import { useNavigate as useNavigateHook } from 'react-router';

export default function PlanEstudioDetalle() {
  const location = useLocation();
  const { id } = (location.state as { id: number }) || {};
  const navigate = useNavigate();
  const { data: plan } = useGetPlanDetalle(id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user: usuario } = useAuth();
  const ROLES_PERMITIDOS = ["Administrador", "Coordinador"];
  const esAdmin = usuario?.roles?.some((r) => ROLES_PERMITIDOS.includes(r.nombre)) ?? false;
  const { showModal } = useModal();
  const deletePlanEstudio = useDeletePlanEstudio(Number(id));
  const deletePlanAsignatura = useDeletePlanAsignatura();
  const patchPlanVigencia = usePatchPlanVigencia();
  const { data: documento } = useGetDocumento(id);


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

  const handleEditarCorrelativas = (asignaturaId: number) => {
    navigate(`/academica/asignaturas/${asignaturaId}/plan/${id}/correlativas`);
  }

  const handleAgregarAsignatura = () => {
    navigate(`/academica/planes/${id}/agregar-asignatura`)
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
        { variant: "cancelar", onClick: () => { } },
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
            buttons: [{ variant: 'error', onClick: () => { } }],
            isLoading: false,
          });
        },
      }
    );
  };

  const handleCambiarVigencia = () => {
    const nuevaVigencia = !plan?.esta_vigente;
    const accion = nuevaVigencia ? "activar" : "desactivar";

    showModal({
      title: `Confirmar ${accion} vigencia`,
      description: `¿Está seguro que desea ${accion} la vigencia de este plan de estudio?`,
      buttons: [
        {
          variant: nuevaVigencia ? "aceptar" : "eliminar",
          children: nuevaVigencia ? "Activar" : "Desactivar",
          autoClose: false,
          onClick: () => {
            showModal({ isLoading: true, msg: 'Actualizando vigencia...' });
            patchPlanVigencia.mutate({
              params: { id: id },
              data: { esta_vigente: nuevaVigencia }
            }, {
              onSuccess: () => {
                showModal({
                  title: 'Éxito',
                  description: `El plan se ha ${nuevaVigencia ? 'activado' : 'desactivado'} correctamente.`,
                  buttons: [{ variant: 'aceptar', autoClose: true, onClick: () => navigate('/academica/planes') }]
                });
              },
              onError: (err) => {
                showModal({
                  title: 'Error',
                  description: err.message || 'No se pudo actualizar la vigencia.',
                  buttons: [{ variant: 'error', autoClose: true }]
                });
              }
            });
          }
        },
        { variant: "cancelar", onClick: () => { } }
      ]
    });
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
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  <BotonBase
                    variant="editar"
                    onClick={handleEditar}
                  />
                  <BotonBase
                    variant="eliminar"
                    onClick={handleClickModalEliminar}
                  />
                  <BotonBase
                    variant={plan.esta_vigente ? "eliminar" : "aceptar"}
                    icono={`icon-[mdi--${plan.esta_vigente ? 'close-circle' : 'check-circle'}]`}
                    onClick={handleCambiarVigencia}
                  >
                    {plan.esta_vigente ? "Desactivar Vigencia" : "Activar Vigencia"}
                  </BotonBase>
                  <BotonBase
                    variant="exportar"
                    icono="icon-[mdi--plus-box]"
                    onClick={handleAgregarAsignatura}
                  >
                    Agregar Asignatura
                  </BotonBase>
                  {documento?.archivo_url && (
                    <BotonBase
                      variant="exportar"
                      icono="icon-[mdi--eye]"
                      onClick={() => window.open(documento.archivo_url, "_blank")}
                    >
                      Ver Documento
                    </BotonBase>
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
                  onEditarCorrelativas={esAdmin ? handleEditarCorrelativas : undefined}
                />
              </div>
            </CardContent>


          </Card>
        </div>
      )
      }
    </PageBase >
  );
}