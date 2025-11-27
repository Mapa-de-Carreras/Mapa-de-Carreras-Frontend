import { useParams, useNavigate } from "react-router";
import PageBase from "@components/PageBase/PageBase";
import { useDeleteDesignacion, useGetDesignacionesDetalle } from "@apis/designaciones";
import BotonBase from "@components/Botones/BotonBase";
import { Loading } from "@components/Templates/Loading";
import MensajeError from "@components/Mensajes/MensajeError";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import useRol from "@hooks/useRol";
import { useModal } from "@components/Providers/ModalProvider";

export default function DesignacionDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showModal } = useModal();
  const { data: designacion, isLoading, isError } =  useGetDesignacionesDetalle(Number(id));
  const isAdmin = useRol("Administrador");
  const isCoordinador = useRol("Coordinador");
  const deleteDesignacion = useDeleteDesignacion(Number(id));

  const handleClickEditar = () => {
    navigate(`/designaciones/editar/${id}`);
  };

    const handleClickModalEliminar = () => {
    showModal({
      title: "Eliminar designación",
      description: "¿Está seguro que desea eliminar esta designación?",
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
      msg: 'Eliminando Designación...',
    });

    deleteDesignacion.mutate(
      { params: { id: id } },
      {
        onSuccess: () => {
          showModal({
            title: 'Éxito',
            description: 'La designación se ha eliminado correctamente.',
            buttons: [{ variant: 'aceptar', onClick: () => navigate(-1) }],
            isLoading: false,
          });
        },
        onError: (err) => {
          showModal({
            title: 'Error',
            description: err.message || 'No se pudo eliminar la designación.',
            buttons: [{ variant: 'error', onClick: () => {} }],
            isLoading: false,
          });
        },
      }
    );
  };


  if (isLoading)
  return <Loading titulo="Cargando designación" descripcion="Por favor espere..." />;
 if (isError)
    return (
      <MensajeError
        titulo="Error al cargar la designacion"
        descripcion="No se pudo obtener la designacion"
      />
    );
  
  if (!designacion) return null;
 
  return (
    <PageBase volver>
      <div className="p-4 space-y-6">

        {/* TITULO */}
        <h1 className="text-3xl font-bold">
          Detalle de Designación #{designacion.id}
        </h1>

          <div className="flex justify-center gap-3 mt-3">
                      {(isAdmin || isCoordinador) && (
                        <BotonBase variant="editar" onClick={handleClickEditar} />
                      )}
                      {(isAdmin || isCoordinador) && (
                        <BotonBase variant="eliminar" onClick={handleClickModalEliminar} />
                      )}
                    </div>

        {/* INFORMACIÓN GENERAL */}
        <Card>
          <CardHeader>
            <CardTitle>Información General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p><strong>Tipo:</strong> {designacion.tipo_designacion}</p>
            <p><strong>Fecha inicio:</strong> {designacion.fecha_inicio}</p>
            <p><strong>Fecha fin:</strong> {designacion.fecha_fin ?? "—"}</p>
            <p><strong>Activo:</strong> {designacion.activo ? "Sí" : "No"}</p>
            <p><strong>Observación:</strong> {designacion.observacion}</p>
          </CardContent>
        </Card>

        {/* DOCENTE */}
        <Card>
          <CardHeader>
            <CardTitle>Docente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p>
              <strong>Nombre:</strong>{" "}
              {designacion.docente.usuario.first_name}{" "}
              {designacion.docente.usuario.last_name}
            </p>
            <p><strong>Email:</strong> {designacion.docente.usuario.email}</p>
            <p><strong>Legajo:</strong> {designacion.docente.usuario.legajo}</p>
            <p><strong>Celular:</strong> {designacion.docente.usuario.celular}</p>
            <p><strong>Modalidad:</strong> {designacion.docente.modalidad.nombre}</p>
            <p><strong>Carácter:</strong> {designacion.docente.caracter.nombre}</p>
            <p><strong>Dedicación:</strong> {designacion.docente.dedicacion.nombre}</p>
          </CardContent>
        </Card>

        {/* CARGO */}
        <Card>
          <CardHeader>
            <CardTitle>Cargo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p><strong>Nombre:</strong> {designacion.cargo.nombre}</p>
            <p><strong>ID:</strong> {designacion.cargo.id}</p>
          </CardContent>
        </Card>

        {/* COMISIÓN */}
        <Card>
          <CardHeader>
            <CardTitle>Comisión</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {designacion.comision ? (
              <>
                <p><strong>Nombre:</strong> {designacion.comision.nombre}</p>
                <p><strong>Turno:</strong> {designacion.comision.turno}</p>
                <p>
                  <strong>Plan Asignatura:</strong>{" "}
                  {designacion.comision.plan_asignatura_str}
                </p>
              </>
            ) : (
              <p className="text-muted-foreground">Sin comisión asignada</p>
            )}
          </CardContent>
        </Card>

        {/* DOCUMENTO */}
        <Card>
          <CardHeader>
            <CardTitle>Documento</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Número:</strong> {designacion.documento ?? "—"}</p>
          </CardContent>
        </Card>

        {/* BOTÓN VOLVER */}
        <div className="flex justify-end">
          <BotonBase variant="cancelar" onClick={() => navigate(-1)}>
            Volver
          </BotonBase>
        </div>

      </div>
    </PageBase>
  );
}