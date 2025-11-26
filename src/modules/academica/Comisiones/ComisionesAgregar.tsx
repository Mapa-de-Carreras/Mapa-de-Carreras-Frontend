import { useNavigate } from "react-router";
import { useState } from "react";
import { Formulario } from "@components/Formularios/Formulario";
import { CampoInput } from "@components/Formularios/CampoInput";
import { CampoSelect } from "@components/Formularios/CampoSelect";
import PageBase from "@components/PageBase/PageBase";
import BotonBase from "@components/Botones/BotonBase";
import { Card, CardContent, CardFooter } from "@components/ui/card";
import PantallaCarga from "@components/PantallaCarga/PantallaCarga";
import BotonGenerico from "@components/Botones/BotonGenerico";
import ModalGenerico from "@components/Modal/ModalGenerico";
import MensajeError from "@components/Mensajes/MensajeError";
import { URL_API } from "@apis/constantes";
import { useGetPlanesAsignatura } from "@apis/planasignatura";

export default function ComisionesAgregar() {
  const navigate = useNavigate();

  const [mostrarModal, setMostrarModal] = useState(false);
  const [errorCrear, setErrorCrear] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: asignaturas, isLoading: loading, error } = useGetPlanesAsignatura()
  const handleCerrarModal = () => {
    setMostrarModal(false);
    navigate("/academica/comisiones/");
  };

  // Valores por defecto
  const valoresIniciales = {
    nombre: "",
    turno: "MATUTINO",
    promocionable: "true",
    activo: "true",
    plan_asignatura: "",
  };

  const handleSubmit = async (data: any) => {
    const token = localStorage.getItem("access_token");
    setIsLoading(true);



   const payload = {
        nombre: data.nombre,
        turno: data.turno,
        promocionable: data.promocionable === "true",
        activo: data.activo === "true",
        plan_asignatura: Number(data.plan_asignatura), // ← ESTE ES EL CORRECTO
    };

    try {
        console.log("BOdy comision a enviar: ",payload);
      const res = await fetch(`${URL_API}comisiones/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const mensaje = await res.json();
        setErrorCrear(JSON.stringify(mensaje));
        setIsLoading(false);
        return;
      }

      setErrorCrear(null);
      setMostrarModal(true);
    } catch (err) {
      console.error(err);
      setErrorCrear("Ocurrió un error al comunicarse con el servidor.");
    }

    setIsLoading(false);
  };

  return (
    <PageBase titulo="Crear Comisión">
      {errorCrear && (
        <MensajeError titulo="Error del servidor" descripcion={errorCrear} />
      )}

      {isLoading && <PantallaCarga mensaje="Procesando..." />}

      <div className="mb-4">
        <BotonBase variant="regresar" onClick={() => navigate(-1)} />
      </div>

     <div className="max-w-lg">
        <Card className="shadow-lg">
          <Formulario onSubmit={handleSubmit} valoresIniciales={valoresIniciales}>
            <CardContent className="space-y-4 pt-6">

              <CampoInput
                label="Nombre"
                nombre="nombre"
                type="text"
              />

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

            <CampoSelect
                label="Plan / Asignatura"
                nombre="plan_asignatura"
                options={
                    asignaturas?.map((p) => ({
                    value: String(p.id),         
                    label: p.descripcion ?? `Plan ${p.id}`,
                    })) || []
                }
                placeholder="Seleccione un plan - asignatura..."
                disabled={loading}
                />

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
        mensaje="Comisión creada correctamente."
        textoBoton="Aceptar"
        colorBoton="#47ADA4"
        onConfirmar={handleCerrarModal}
      />
    </PageBase>
  );
}