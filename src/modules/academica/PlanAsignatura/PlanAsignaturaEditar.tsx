import { useNavigate, useParams } from 'react-router';
import { Formulario } from '@components/Formularios/Formulario';
import { CampoInput } from '@components/Formularios/CampoInput';
import { CampoSelect } from '@components/Formularios/CampoSelect'; 
import PageBase from '@components/PageBase/PageBase';
import BotonBase from '@components/Botones/BotonBase';
import { Card, CardContent, CardFooter } from '@components/ui/card';
import ModalGenerico from '@components/Modal/ModalGenerico';
import { useEffect, useState } from 'react';
import PantallaCarga from '@components/PantallaCarga/PantallaCarga';
import BotonGenerico from '@components/Botones/BotonGenerico';
import { URL_API } from '@apis/constantes';
import { useGetAsignaturas } from '@apis/asignaturas';
import MensajeError from '@components/Mensajes/MensajeError';
import { useGetPlanes } from '@apis/planestudio';
import { useGetPlanAsignaturaDetalle } from '@apis/planasignatura';

export default function PlanAsignaturaEditar() {
    const navigate = useNavigate();
    const id = Number(useParams<{ id: string }>().id); 

    const { data: planAsignatura, isLoading } = useGetPlanAsignaturaDetalle(id); 
    const { data: planesEstudio } = useGetPlanes();
    const { data: asignaturas } = useGetAsignaturas();

    const [valoresIniciales, setValoresIniciales] = useState<any | null>(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCerrarModal = () => {
        setMostrarModal(false);
        navigate("/academica/planes-asignatura/");
    };

    useEffect(() => {
        if (planAsignatura) {
            setValoresIniciales({
                plan_de_estudio_id: planAsignatura.plan_de_estudio_id?.toString() || "",
                asignatura_id: planAsignatura.asignatura_id?.toString() || "",
                anio: planAsignatura.anio || 1,
                horas_teoria: planAsignatura.horas_teoria || 0,
                horas_practica: planAsignatura.horas_practica || 0,
                horas_semanales: planAsignatura.horas_semanales || 0,
            });
        }
    }, [planAsignatura]);

    if (!valoresIniciales) return <PantallaCarga mensaje="Cargando datos del plan asignatura..." />;

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
            const res = await fetch(`${URL_API}plan-asignatura/${id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const data = await res.json();
                if (data.non_field_errors) {
                    setError(data.non_field_errors.join(" "));
                } else {
                    setError(JSON.stringify(data));
                }
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
        <PageBase titulo="Editar Plan Asignatura">
            {isLoading && <PantallaCarga mensaje="Cargando..." />}
            {error && <MensajeError titulo="Error del servidor" descripcion={error} />}

            <div className="mb-4">
                <BotonBase variant="regresar" onClick={() => navigate(-1)} />
            </div>

            <div className="mx-auto max-w-lg">
                <Card className="shadow-lg">
                    <Formulario onSubmit={handleSubmit} valoresIniciales={valoresIniciales}>
                        <CardContent className="space-y-4 pt-6">
                            <CampoSelect
                                label="Plan de Estudio"
                                nombre="plan_de_estudio_id"
                                options={planesEstudio?.map(p => ({
                                    value: p.id.toString(),
                                    label: p.carrera_nombre
                                })) || []}
                                placeholder="Seleccione un plan de estudio..."
                            />

                            <CampoSelect
                                label="Asignatura"
                                nombre="asignatura_id"
                                options={asignaturas?.map(a => ({
                                    value: a.id.toString(),
                                    label: a.nombre
                                })) || []}
                                placeholder="Seleccione una asignatura..."
                            />

                            <CampoInput
                                label="Año"
                                nombre="anio"
                                type="number"
                            />

                            <CampoInput
                                label="Horas Teoría"
                                nombre="horas_teoria"
                                type="number"
                            />

                            <CampoInput
                                label="Horas Práctica"
                                nombre="horas_practica"
                                type="number"
                            
                            />

                            <CampoInput
                                label="Horas Semanales"
                                nombre="horas_semanales"
                                type="number"
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
                mensaje="Plan asignatura editado correctamente."
                textoBoton="Aceptar"
                colorBoton="#47ADA4"
                onConfirmar={handleCerrarModal}
            />
        </PageBase>
    );
}
