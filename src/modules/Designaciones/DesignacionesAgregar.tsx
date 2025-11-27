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
import { useGetCargos } from "@apis/cargos";
import useGetDedicaciones from "@apis/dedicacion";
import { useEffect } from "react";
import { useModal } from "@components/Providers/ModalProvider";
import { DesignacionSchema, DesignacionForm } from "./constraintsDesignacion";
import { usePostDesignacion } from "@apis/designaciones";
import { useGetComisiones } from "@apis/comisiones";

export default function DesignacionesAgregar() {
  const navigate = useNavigate();
  const { showModal } = useModal();

  const { mutate: agregarDesignacion, isPending, isSuccess, isError, error } = usePostDesignacion();

 
  const { data: docentes, isLoading: isLoadingDocentes, error: errorGetDocente } = useGetDocentes();
  const { data: cargos, isLoading: isLoadingCargos, error: errorGetCargo } = useGetCargos();
  const { data: comisiones, isLoading: isLoadingComision, error: errorGetComision } = useGetComisiones();
  const { data: dedicaciones, isLoading: isLoadingDedicaciones, error: errorGetDedicaciones } = useGetDedicaciones();

  useEffect(() => {
    if (isSuccess) {
      showModal({
        title: "Designación creada",
        description: "La designación se registró correctamente.",
        buttons: [{ variant: "aceptar", onClick: () => navigate(-1) }],
      });
    }
  }, [isSuccess, navigate, showModal]);

  const inicial: DesignacionForm = {
    fecha_inicio: "",
    fecha_fin: null,
    tipo_designacion: '',
    docente_id: 0,
    comision_id: null,
    cargo_id: 0,
    documento_id: null,
    dedicacion_id: null,
    observacion: null,
  };


 
  const cargandoDatos = isLoadingDocentes || isLoadingCargos || isLoadingDedicaciones || isLoadingComision;

 
 
  if (cargandoDatos) {
    return <ComponenteCarga />;
  }

  
  const errorCarga = errorGetDocente || errorGetCargo || errorGetDedicaciones || errorGetComision;
  if (errorCarga) {
     return (
        <PageBase titulo="Error" volver={true}>
            <p className="text-red-500">Error al cargar los datos necesarios: {errorCarga.message}</p>
        </PageBase>
     )
  }

  const handleSubmit = (data: DesignacionForm) => {
    showModal({
      isLoading: true,
      title: "Creando designación...",
    })

    agregarDesignacion({data : data}, {

      onSuccess: () => {
        showModal({
          title: "Designación creada",
          description: "La designación se ha creado correctamente.",
          buttons: [{ variant: "aceptar", onClick: () => navigate(-1) }],
          isLoading: false,
        });
      },
      onError: (err) => {
        showModal({
          title: "Error",
          description: err.message || "No se pudo crear la designación.",
          buttons: [{ variant: "error", onClick: () => {} }],
          isLoading: false,
        });
      },
    });

  };

  return (
    <PageBase titulo="Agregar Designación" volver={true}>
     
      {error && <p className="text-red-500 mb-4">Error al crear la designación: {error.message }</p>}

      <div className="mx-auto max-w-lg">
        <Card className="shadow-lg">
          <Formulario
            onSubmit={handleSubmit}
            valoresIniciales={inicial}
            schema={DesignacionSchema}
          >
            <CardContent className="space-y-4 pt-6">
              <CampoInput label="Fecha Inicio" nombre="fecha_inicio" type="date" />
              <CampoInput label="Fecha Fin" nombre="fecha_fin" type="date" />
              
              <CampoSelect
                label="Tipo Designación"
                nombre="tipo_designacion"
                placeholder="Seleccione el tipo de designación"
                options={[
                  { value: "TEORICO", label: "Teórico" },
                  { value: "PRACTICO", label: "Práctico" },
                  { value: "TEORICO + PRACTICO", label: "Teórico + Práctico" },
                ]}
              />

              <CampoSelect
                label="Docente"
                nombre="docente_id"
                placeholder="Seleccione un docente"
                options={docentes?.map((d) => ({
                  value: d.id,
                  label: `${d.usuario.first_name} ${d.usuario.last_name}`,
                })) || []}
              />

              <CampoSelect
                label="Cargo"
                nombre="cargo_id"
                placeholder="Seleccione un cargo"
                options={cargos?.map((c) => ({
                  value: c.id,
                  label: c.nombre,
                })) || []}
              />

              <CampoSelect
                label="Comisión"
                nombre="comision_id"
                placeholder="Seleccione una comisión"
                options={comisiones?.map((c) => ({
                  value: c.id,
                  label: `${c.nombre} (${c.turno})`,
                })) || []}
              />

              <CampoSelect
                label="Dedicación"
                nombre="dedicacion_id"
                placeholder="Seleccione una dedicación"
                options={dedicaciones?.map((d) => ({
                  value: d.id,
                  label: d.nombre,
                })) || []}
              />

              <CampoInput label="Observación" nombre="observacion" />
              <CampoInput label="Documento ID" nombre="documento_id" type="number" />
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