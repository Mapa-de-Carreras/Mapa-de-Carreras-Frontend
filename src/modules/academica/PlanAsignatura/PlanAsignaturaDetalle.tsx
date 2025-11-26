import PageBase from "@components/PageBase/PageBase";
import { useModal } from "@components/Providers/ModalProvider"; 
import { useNavigate, useParams } from "react-router";
import ComponenteCarga from "@components/ComponenteCarga/Componentecarga";
import BotonBase from "@components/Botones/BotonBase";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import { DetailField } from "@components/CardDetalles/DetailField";
import useRol from "@hooks/useRol";
import { useDeletePlanAsignatura, useGetPlanAsignaturaDetalle } from "@apis/planasignatura";


export default function PlanAsignaturaDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showModal } = useModal();
  
  const { data: plan, isLoading, error } = useGetPlanAsignaturaDetalle(Number(id));
  const isAdmin = useRol("Administrador");
  const isCoordinador = useRol("Coordinador");
  const deletePlan = useDeletePlanAsignatura(Number(id));

  const handleClickEditar = () => {
    navigate(`/academica/planes-asignatura/editar/${id}`);
  };

  const handleClickModalEliminar = () => {
    showModal({
      title: "Eliminar Plan de Asignatura",
      description: "¿Está seguro que desea eliminar este plan de asignatura?",
      buttons: [
        { variant: "eliminar", autoClose: false, onClick: handleConfirmDelete },
        { variant: "cancelar", onClick: () => {} },
      ],
    });
  };

  const handleConfirmDelete = () => {
    if (!id) return;

    showModal({ isLoading: true, msg: "Eliminando plan de asignatura..." });

    deletePlan.mutate(
      { params: { id } },
      {
        onSuccess: () => {
          showModal({
            title: "Éxito",
            description: "El plan de asignatura se ha eliminado correctamente.",
            buttons: [{ variant: "aceptar", onClick: () => navigate(-1) }],
            isLoading: false,
          });
        },
        onError: (err) => {
          showModal({
            title: "Error",
            description: err.message || "No se pudo eliminar el plan de asignatura.",
            buttons: [{ variant: "error", onClick: () => {} }],
            isLoading: false,
          });
        },
      }
    );
  };

  return (
    <PageBase titulo="Detalle de Plan de Asignatura">
      <div className="mb-4">
        <BotonBase variant="regresar" onClick={() => navigate(-1)} />
      </div>

      {isLoading && <ComponenteCarga />}
      {error && <p className="text-center text-red-500">{error.message}</p>}

      {!isLoading && !error && plan && (
        <Card className="shadow-md p-4">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold">{plan.descripcion}</CardTitle>
            <div className="flex justify-center gap-3 mt-3">
              {(isAdmin || isCoordinador) && (
                <BotonBase variant="editar" onClick={handleClickEditar} />
              )}
              {(isAdmin || isCoordinador) && (
                <BotonBase variant="eliminar" onClick={handleClickModalEliminar} />
              )}
            </div>
          </CardHeader>

          <CardContent className="flex flex-col gap-y-3 pt-6">
            <DetailField label="Año">{plan.anio ?? "-"}</DetailField>
            <DetailField label="Horas teoría">{plan.horas_teoria ?? "-"}</DetailField>
            <DetailField label="Horas práctica">{plan.horas_practica ?? "-"}</DetailField>
            <DetailField label="Horas semanales">{plan.horas_semanales ?? "-"}</DetailField>
             <DetailField label="Horas totales">{plan.horas_totales ?? "-"}</DetailField>
          </CardContent>
        </Card>
      )}
    </PageBase>
  );
}
