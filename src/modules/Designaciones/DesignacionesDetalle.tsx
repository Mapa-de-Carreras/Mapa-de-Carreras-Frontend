import { useParams, useNavigate } from "react-router";
import PageBase from "@components/PageBase/PageBase";

import { useGetDesignacionesDetalle } from "@apis/designaciones";
import BotonBase from "@components/Botones/BotonBase";
import { Loading } from "@components/Templates/Loading";
import MensajeError from "@components/Mensajes/MensajeError";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";


export default function DesignacionDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: designacion, isLoading, isError } =  useGetDesignacionesDetalle(Number(id));

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
    <PageBase>
      <div className="p-4 space-y-6">

        {/* TITULO */}
        <h1 className="text-3xl font-bold">
          Detalle de Designación #{designacion.id}
        </h1>

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