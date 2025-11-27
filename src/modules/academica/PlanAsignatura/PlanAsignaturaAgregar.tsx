import { useNavigate } from 'react-router';
import { Formulario } from '@components/Formularios/Formulario';
import { CampoInput } from '@components/Formularios/CampoInput';
import { CampoSelect } from '@components/Formularios/CampoSelect';
import PageBase from '@components/PageBase/PageBase';
import BotonBase from '@components/Botones/BotonBase';
import { Card, CardContent, CardFooter } from '@components/ui/card';
import ModalGenerico from '@components/Modal/ModalGenerico';
import PantallaCarga from '@components/PantallaCarga/PantallaCarga';
import BotonGenerico from '@components/Botones/BotonGenerico';
import MensajeError from '@components/Mensajes/MensajeError';
import { useState } from 'react';
import { URL_API } from '@apis/constantes';

import useAuth from '@hooks/useAuth';
import { useGetPlanes } from '@apis/planestudio';
import { useGetAsignaturas } from '@apis/asignaturas';

export default function PlanAsignaturaAgregar() {
  const navigate = useNavigate();
  const { data: planesEstudio, isLoading: loadingPlanes, error: errorPlanes } = useGetPlanes();
  const { data: asignaturas, isLoading: loadingAsignaturas, error: errorAsignaturas } = useGetAsignaturas(true);
  const { user: usuario } = useAuth();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [errorCrear, setErrorCrear] = useState<string | null>(null);

  const ROLES_PERMITIDOS = ["Administrador", "Coordinador"];
  const esAdmin = usuario?.roles?.some((r) => ROLES_PERMITIDOS.includes(r.nombre)) ?? false;

  const handleCerrarModal = () => {
    setMostrarModal(false);
    navigate("/academica/planes-asignatura/");
  };

  const valoresIniciales = {
    plan_de_estudio_id: "",
    asignatura_id: "",
    anio: "",
    horas_teoria: "",
    horas_practica: "",
    horas_semanales: ""
  };

  const handleSubmit = async (data: any) => {
    const token = localStorage.getItem("access_token");

    const payload = {
      plan_de_estudio_id: Number(data.plan_de_estudio_id),
      asignatura_id: Number(data.asignatura_id),
      anio: Number(data.anio),
      horas_teoria: Number(data.horas_teoria),
      horas_practica: Number(data.horas_practica),
      horas_semanales: Number(data.horas_semanales),
    };

    try {
      const res = await fetch(`${URL_API}plan-asignatura/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();

        // Si viene non_field_errors, mostramos el mensaje
        if (data.non_field_errors) {
            setErrorCrear(data.non_field_errors.join(" "));
        } else {
            // Si viene otro error, mostramos como JSON
            setErrorCrear(JSON.stringify(data));
        }

        return;
        }

      setErrorCrear(null);
      setMostrarModal(true);
    } catch (err) {
      console.error(err);
      setErrorCrear("Ocurrió un error al comunicarse con el servidor.");
    }
  };

  if (loadingPlanes || loadingAsignaturas) return <PantallaCarga mensaje="Cargando..." />;

  return (
    <PageBase titulo="Crear Plan de Asignatura" volver>
      {errorCrear && <MensajeError titulo="Error del servidor" descripcion={errorCrear} />}
      {(errorPlanes || errorAsignaturas) && (
        <MensajeError
          titulo="Error al cargar datos"
          descripcion={(errorPlanes?.message || "") + " " + (errorAsignaturas?.message || "")}
        />
      )}


      <div className="mx-auto max-w-lg">
        <Card className="shadow-lg">
          <Formulario onSubmit={handleSubmit} valoresIniciales={valoresIniciales}>
            <CardContent className="space-y-4 pt-6">
          <CampoSelect
            label="Plan de Estudio"
            nombre="plan_de_estudio_id"
            options={
                planesEstudio?.map(p => ({
                value: p.id.toString(),
                label: p.carrera_nombre, 
                })) || []
            }
            placeholder="Seleccione un plan de estudio..."
            />
           

              <CampoSelect
                label="Asignatura"
                nombre="asignatura_id"
                options={asignaturas?.map((a) => ({
                  value: a.id.toString(),
                  label: a.nombre
                })) || []}
                placeholder="Seleccione una asignatura..."
              />

              <CampoInput
                label="Año"
                nombre="anio"
                type="number"
                placeholder="Ej: 2025"
              />

              <CampoInput
                label="Horas teoría"
                nombre="horas_teoria"
                type="number"
                placeholder="Ej: 30"
              />

              <CampoInput
                label="Horas práctica"
                nombre="horas_practica"
                type="number"
                placeholder="Ej: 15"
              />

              <CampoInput
                label="Horas semanales"
                nombre="horas_semanales"
                type="number"
                placeholder="Ej: 5"
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
        icono={<span className="icon-[mdi--check-bold] text-green-600 text-5xl" />}
        titulo="Éxito"
        mensaje="Plan de asignatura creado correctamente."
        textoBoton="Aceptar"
        colorBoton="#47ADA4"
        onConfirmar={handleCerrarModal}
      />
    </PageBase>
  );
}
