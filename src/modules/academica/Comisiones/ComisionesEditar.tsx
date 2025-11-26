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
import { useGetComisionesDetalle } from "@apis/comisiones";


export default function ComisionEditar() {
  const navigate = useNavigate();
  const id = Number(useParams<{ id: string }>().id);
  const { data: comision, isLoading } = useGetComisionesDetalle(id);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [valoresIniciales, setValoresIniciales] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCerrarModal = () => {
    setMostrarModal(false);
    navigate("/academica/comisiones/");
  };

  // Cargar datos iniciales
    useEffect(() => {
    if (comision) {
        setValoresIniciales({
        nombre: comision.nombre || "",
        turno: comision.turno || "MATUTINO",
        promocionable: comision.promocionable ? "true" : "false",
        activo: comision.activo ? "true" : "false",
        plan_asignatura_id: comision.plan_asignatura_id,
        });
    }
    }, [comision]);

  // Si aún no cargaron los valores
  if (!valoresIniciales) {
    return <PantallaCarga mensaje="Cargando datos de la comisión..." />;
  }

  if (!comision) return null;


  const handleSubmit = async (data: any) => {
    const token = localStorage.getItem("access_token");

      const payload = {
        nombre: data.nombre,
        turno: data.turno,
        promocionable: data.promocionable === "true",
        activo: data.activo === "true",
        plan_asignatura: comision.plan_asignatura_id 
      };

    console.log("Payload enviado:", payload);

    try {
      const res = await fetch(`${URL_API}comisiones/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await res.json();
        setError(`No se pudo editar la comisión. ${JSON.stringify(msg)}`);
        return;
      }

      setError(null);
      setMostrarModal(true);
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al comunicarse con el servidor.");
    }
  };

  return (
    <PageBase titulo="Editar Comisión">
      {isLoading && <PantallaCarga mensaje="Cargando..." />}

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
              
              <CampoInput label="Nombre" nombre="nombre" type="text" />

            <CampoSelect 
                label="Turno"
                nombre="turno"
                options={[
                    { value: "MATUTINO", label: "Matutino" },
                    { value: "VESPERTINO", label: "Vespertino" }
                ]}
                />
                    <CampoSelect 
                    label="Promocionable"
                    nombre="promocionable"
                    options={[
                        { value: "true", label: "Sí" },
                        { value: "false", label: "No" }
                    ]}
                    />

                    <CampoSelect 
                    label="Activo"
                    nombre="activo"
                    options={[
                        { value: "true", label: "Sí" },
                        { value: "false", label: "No" }
                    ]}
                    />

              <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                Plan / Asignatura
              </p>
              <p className="mb-4">{comision.plan_asignatura_str}</p>

       
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
        mensaje="Comisión editada correctamente."
        textoBoton="Aceptar"
        colorBoton="#47ADA4"
        onConfirmar={handleCerrarModal}
      />
    </PageBase>
  );
}