import { useNavigate } from "react-router";
import PageBase from "@components/PageBase/PageBase";
import { Formulario } from "@components/Formularios/Formulario";
import { CampoInput } from "@components/Formularios/CampoInput";
import { CampoSelect } from "@components/Formularios/CampoSelect";
import { Button } from "@components/ui/button";
import BotonBase from "@components/Botones/BotonBase";
import { Card, CardContent, CardFooter } from "@components/ui/card";
import ComponenteCarga from "@components/ComponenteCarga/Componentecarga";
import { useGetDocentes } from "@apis/docentes";
import { useGetCargos} from "@apis/cargos";
//import { useGetComisiones } from "@apis/comisiones";
import  useGetDedicaciones  from "@apis/dedicacion";
import { useEffect } from "react";
import { useModal } from "@components/Providers/ModalProvider";
import {  DesignacionSchema, DesignacionForm,} from "./constraintsDesignacion";
import { usePostDesignacion } from "@apis/designaciones";

export default function DesignacionesAgregar() {
  const navigate = useNavigate();
  const { showModal } = useModal();

  const { mutate, isPending, isSuccess, isError, error } =  usePostDesignacion();

  // --- Peticiones al backend ---
  const { data: docentes } = useGetDocentes();
  const { data: cargos } = useGetCargos();
//  const { data: comisiones } = useGetComisiones();
  const { data: dedicaciones } = useGetDedicaciones();

  useEffect(() => {
    if (isSuccess) {
      showModal({
        title: "Designación creada",
        description: "La designación se registró correctamente.",
        buttons: [
          {
            variant: "aceptar",
            onClick: () => navigate(-1),
          },
        ],
      });
    }

    if (isError) {
      showModal({
        title: "Error",
        description: error?.message ?? "No se pudo crear la designación.",
        buttons: [{ variant: "error", onClick: () => {} }],
      });
    }
  }, [isSuccess, isError, error, navigate, showModal]);

    const inicial: DesignacionForm = {
    fecha_inicio: "",
    fecha_fin: null,
    tipo_designacion: "",
    docente_id: 0,
    comision_id: null,
    cargo_id: 0,
    documento_id: null,
    dedicacion_id: null,
    observacion: null,
    };

  const handleSubmit = (data: DesignacionForm) => {
    mutate({ data });
  };

  const isLoading =
   // !docentes || !cargos || !comisiones || !dedicaciones || isPending; //cuando comisiones este listo
      !docentes || !cargos || !dedicaciones || isPending
  return (
    <PageBase titulo="Nueva Designación">
      {isLoading && <ComponenteCarga />}

      <div className="mb-4">
        <BotonBase variant="regresar" onClick={() => navigate(-1)} />
      </div>

      <div className="mx-auto max-w-lg">
        <Card className="shadow-lg">
          <Formulario
            onSubmit={handleSubmit}
            valoresIniciales={inicial}
            schema={DesignacionSchema}
          >
            <CardContent className="space-y-4 pt-6">
              <CampoInput label="Fecha Inicio" nombre="fecha_inicio" />
              <CampoInput label="Fecha Fin" nombre="fecha_fin" />
                <CampoSelect
                    label="Tipo Designación"
                    nombre="tipo_designacion"
                    options={[
                        { value: "TEORICO", label: "Teórico" },
                        { value: "PRACTICO", label: "Práctico" },
                        { value: "TEORICO_PRACTICO", label: "Teórico + Práctico" },
                    ]}
                    />

         <CampoSelect
            label="Docente"
            nombre="docente_id"
            className="h-12"
            options={
                docentes?.map((d) => ({
                value: d.id,
                label: `${d.usuario.first_name} ${d.usuario.last_name}`,
                })) || []
            }
            />

            <CampoSelect
            label="Cargo"
            nombre="cargo_id"
            className="h-12"
            options={
                cargos?.map((c) => ({
                value: c.id,
                label: c.nombre,
                })) || []
            }
            />

{/*
              <CampoSelect
                label="Comisión"
                nombre="comision_id"
                options={
                  comisiones?.map((c) => ({
                    value: c.id,
                    label: `${c.nombre} (${c.turno})`,
                  })) || []
                }
              />
   */ }

              <CampoSelect
                    label="Dedicación"
                    nombre="dedicacion_id"
                    className="h-12"
                    options={
                        dedicaciones?.map((d) => ({
                        value: d.id,
                        label: d.nombre,
                        })) || []
                    }
                    />

              <CampoInput label="Observación" nombre="observacion" />
              <CampoInput label="Documento ID" nombre="documento_id" />
            </CardContent>

            <CardFooter className="flex justify-between">
              <BotonBase variant="cancelar" onClick={() => navigate(-1)} />

              <Button type="submit" disabled={isPending}>
                {isPending ? "Guardando..." : "Crear Designación"}
              </Button>
            </CardFooter>
          </Formulario>
        </Card>
      </div>
    </PageBase>
  );
}