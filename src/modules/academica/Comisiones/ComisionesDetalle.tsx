import PageBase from "@components/PageBase/PageBase";
import { useModal } from "@components/Providers/ModalProvider"; 
import { useNavigate, useParams } from "react-router";
import ComponenteCarga from "@components/ComponenteCarga/Componentecarga";
import BotonBase from "@components/Botones/BotonBase";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@components/ui/card";
import Icon from "@components/const/icons";
import { DetailField } from "@components/CardDetalles/DetailField";
import useRol from "@hooks/useRol";
import { useGetComisionesDetalle } from "@apis/comisiones";
import { useDeleteComision } from "@apis/comisiones";
export default function ComisionesDetalle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showModal } = useModal();

  const {
    data: comision,
    isLoading,
    error,
  } = useGetComisionesDetalle(Number(id));

  const isAdmin = useRol("Administrador");
  const isCoordinador = useRol("Coordinador");
  const deleteComision = useDeleteComision(Number(id));

  const handleClickEditar = () => {
    navigate(`/academica/comisiones/editar/${id}`);
  };

  const handleClickModalEliminar = () => {
    showModal({
      title: "Eliminar comisión",
      description: "¿Está seguro que desea eliminar esta comisión?",
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

    deleteComision.mutate(
      { params: { id: id } },
      {
        onSuccess: () => {
          showModal({
            title: 'Éxito',
            description: 'La comisión se ha eliminado correctamente.',
            buttons: [{ variant: 'aceptar', onClick: () => navigate(-1) }],
            isLoading: false,
          });
        },
        onError: (err) => {
          showModal({
            title: 'Error',
            description: err.message || 'No se pudo eliminar la comisión.',
            buttons: [{ variant: 'error', onClick: () => {} }],
            isLoading: false,
          });
        },
      }
    );
  };
  return (
    <PageBase titulo="Detalles de Comisión">
      <div className="mb-4">
        <BotonBase variant="regresar" onClick={() => navigate(-1)} />
      </div>

      {isLoading && <ComponenteCarga />}
      {error && <p>{error.message}</p>}

      {!isLoading && !error && comision && (
        <Card className="shadow-md p-4">
          <CardHeader className="text-center">
            <CardTitle className="flex flex-row justify-center gap-4 items-center">
              <Icon type="default" className="text-5xl" />
              {comision.nombre}
            </CardTitle>
            <div className="flex justify-center gap-3 mt-3">
              {(isAdmin || isCoordinador) && (
                <BotonBase variant="editar" onClick={handleClickEditar} />
              )}

              {(isAdmin || isCoordinador) && (
                <BotonBase
                  variant="eliminar"
                  onClick={handleClickModalEliminar}
                />
              )}
            </div>
          </CardHeader>

          <CardContent className="flex flex-col gap-y-3 pt-6">
            <DetailField label="Turno">{comision.turno}</DetailField>

            <DetailField label="Promocionable">
              {comision.promocionable ? "Sí" : "No"}
            </DetailField>

            <DetailField label="Activo">
              {comision.activo ? "Sí" : "No"}
            </DetailField>

            <DetailField label="Plan / Asignatura">
              {comision.plan_asignatura_str}
            </DetailField>
          </CardContent>
        </Card>
      )}
    </PageBase>
  );
}