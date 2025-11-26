import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import PageBase from "@components/PageBase/PageBase";
import BotonBase from "@components/Botones/BotonBase";
import { Card, CardContent, CardFooter } from "@components/ui/card";
import { Formulario } from "@components/Formularios/Formulario";
import { CampoInput } from "@components/Formularios/CampoInput";
import { CampoSelect } from "@components/Formularios/CampoSelect";
import PantallaCarga from "@components/PantallaCarga/PantallaCarga";
import MensajeError from "@components/Mensajes/MensajeError";
import ModalGenerico from "@components/Modal/ModalGenerico";
import BotonGenerico from "@components/Botones/BotonGenerico";
import { URL_API } from "@apis/constantes";
import { useGetComisiones} from "@apis/comisiones";
import { useGetDocentes } from "@apis/docentes";
import { useGetCargos } from "@apis/cargos";
import useGetDedicaciones from "@apis/dedicacion";
import { useGetDocumentos } from "@apis/documentos";
import { useGetDesignacionesDetalle } from "@apis/designaciones";

export default function DesignacionesEditar() {
  const navigate = useNavigate();
  const id = Number(useParams<{ id: string }>().id);
  const { data: designacion, isLoading } = useGetDesignacionesDetalle(id);
  const { data: docentes } = useGetDocentes();
  const { data: cargos } = useGetCargos();
  const { data: comisiones } = useGetComisiones();
  const { data: dedicaciones } = useGetDedicaciones();
  const { data: documentos } = useGetDocumentos();

  const [mostrarModal, setMostrarModal] = useState(false);
  const [valoresIniciales, setValoresIniciales] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCerrarModal = () => {
    setMostrarModal(false);
    navigate("/designaciones/gestion");
  };

  // ---- cargar valores iniciales ----
    useEffect(() => {
    if (designacion) {
        setValoresIniciales({
        fecha_inicio: designacion.fecha_inicio,
        fecha_fin: designacion.fecha_fin,
        tipo_designacion: designacion.tipo_designacion,
        docente_id: designacion.docente.id,
        comision_id: designacion.comision?.id ?? "none",
        cargo_id: designacion.cargo.id,
        documento_id: designacion.documento ?? "none",
        dedicacion_id: designacion.docente.dedicacion?.id ?? "none",
        observacion: designacion.observacion ?? "",
        });
    }
    }, [designacion]);

  if (isLoading || !valoresIniciales) {
    return <PantallaCarga mensaje="Cargando designación..." />;
  }

  if (!designacion) {
  return (
    <MensajeError
      titulo="Error"
      descripcion="No se encontró la designación."
    />
  );
}

  // ---- enviar PATCH ----
  const handleSubmit = async (data: any) => {
    const token = localStorage.getItem("access_token");

    const payload = {
      fecha_inicio: data.fecha_inicio,
      fecha_fin: data.fecha_fin || null,
      tipo_designacion: data.tipo_designacion,
      docente_id: data.docente_id === 0 ? null : Number(data.docente_id),
      comision_id: data.comision_id ? Number(data.comision_id) : null,
      cargo_id: Number(data.cargo_id),
      documento_id: data.documento_id === "0" ? null : Number(data.documento_id),
      dedicacion_id: data.dedicacion_id ? Number(data.dedicacion_id) : null,
      observacion: data.observacion || null,
    };

    console.log("Payload enviado:", payload);

    try {
      const res = await fetch(`${URL_API}designaciones-docentes/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await res.json();
        const detalle =
          msg?.non_field_errors?.[0] ||
          msg?.detail ||
          JSON.stringify(msg);

        setError(`No se pudo editar la designación. ${detalle}`);
        return;
      }

      setError(null);
      setMostrarModal(true);
    } catch (err) {
      console.error(err);
      setError("Error al comunicarse con el servidor.");
    }
  };

  return (
    <PageBase titulo="Editar Designación">
      {error && (
        <MensajeError titulo="Error del servidor" descripcion={error} />
      )}

      <div className="mb-4">
        <BotonBase variant="regresar" onClick={() => navigate(-1)} />
      </div>

      <div className="mx-auto max-w-lg">
        <Card className="shadow-lg">
          <Formulario onSubmit={handleSubmit} valoresIniciales={valoresIniciales}>
            <CardContent className="space-y-4 pt-6">
              
              <CampoInput label="Fecha Inicio" nombre="fecha_inicio" type="date" />
              <CampoInput label="Fecha Fin" nombre="fecha_fin" type="date" />

              <CampoSelect
                label="Tipo Designación"
                nombre="tipo_designacion"
                options={[
                  { value: "TEORICO", label: "Teórico" },
                  { value: "PRACTICO", label: "Práctico" },
                  { value: "TEORICO + PRACTICO", label: "Teórico + Práctico" },
                ]}
              />

              <CampoSelect
                label="Docente"
                nombre="docente_id"
                options={docentes?.map((d) => ({
                  value: d.id,
                  label: `${d.usuario.first_name} ${d.usuario.last_name}`,
                })) || []}
              />

              <CampoSelect
                label="Cargo"
                nombre="cargo_id"
                options={cargos?.map((c) => ({
                  value: c.id,
                  label: c.nombre,
                })) || []}
              />

              <CampoSelect
                label="Comisión"
                nombre="comision_id"
                options={comisiones?.map((c) => ({
                  value: c.id,
                  label: `${c.nombre} (${c.turno})`,
                })) || []}
              />

              <CampoSelect
                label="Dedicación"
                nombre="dedicacion_id"
                options={dedicaciones?.map((d) => ({
                  value: d.id,
                  label: d.nombre,
                })) || []}
              />

              <CampoSelect
                label="Documento"
                nombre="documento_id"
            options={[
                { value: 0, label: "Sin documento" },
                ...(documentos
                    ?.filter((d) => d.id !== undefined)   // <-- evita undefined
                    .map((d) => ({
                        value: d.id as number,
                        label: `${d.tipo} - ${d.emisor} - ${d.numero}/${d.anio}`,
                    })) || [])
                ]}
              />

              <CampoInput label="Observación" nombre="observacion" type="text" />

            </CardContent>

            <CardFooter className="flex justify-end">
              <BotonGenerico
                texto="Guardar"
                icono={<span className="icon-[mdi--content-save] text-xl" />}
                color="#47ADA4"
                type="submit"
              />
            </CardFooter>
          </Formulario>
        </Card>
      </div>

      <ModalGenerico
        abierto={mostrarModal}
        onClose={handleCerrarModal}
        icono={
          <span className="icon-[mdi--check-bold] text-green-600 text-5xl" />
        }
        titulo="Éxito"
        mensaje="Designación editada correctamente."
        textoBoton="Aceptar"
        colorBoton="#47ADA4"
        onConfirmar={handleCerrarModal}
      />
    </PageBase>
  );
}