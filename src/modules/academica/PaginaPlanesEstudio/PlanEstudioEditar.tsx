import { useNavigate, useParams } from 'react-router';
import { Formulario } from '@components/Formularios/Formulario';
import { CampoInput } from '@components/Formularios/CampoInput';
import { CampoSelect } from '@components/Formularios/CampoSelect'; 
import PageBase from '@components/PageBase/PageBase';
import { Card, CardContent, CardFooter } from '@components/ui/card';
import ModalGenerico from '@components/Modal/ModalGenerico';
import { useEffect, useState } from 'react';
import BotonGenerico from '@components/Botones/BotonGenerico';
import { URL_API } from '@apis/constantes';
import { useGetPlanDetalle } from '@apis/planestudio';
import MensajeError from '@components/Mensajes/MensajeError';
import { useGetDocumentos } from '@apis/documentos';
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga';

export default function PlanEstudioEditar() {
    const navigate = useNavigate();
    const id = Number(useParams<{ id: string }>().id); 
    const { data: plan,isLoading} = useGetPlanDetalle(id);
    const { data: document} = useGetDocumentos();
    const [mostrarModal, setMostrarModal] = useState(false);
    const [valoresIniciales, setValoresIniciales] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
  const handleCerrarModal = () => {
    setMostrarModal(false);
    navigate("/academica/planes/");
  };
  
    useEffect(() => {
  if (plan) {
    setValoresIniciales({
      fecha_inicio: plan.fecha_inicio || "",
      esta_vigente: plan.esta_vigente ? "true" : "false",
      carrera_id: plan.carrera?.id?.toString() || "",
      documento_id: plan.documento?.id?.toString() || "null",
    });
  }
}, [plan]);


    if (!valoresIniciales) {
    return <ComponenteCarga />;
    }

        const handleSubmit = async (data: any) => {
    const token = localStorage.getItem("access_token");
   
    const carreraIdReal = plan?.carrera?.id; 

    const payload = {
        ...data,
        documento_id: data.documento_id === "null" ? null : Number(data.documento_id),
       
        carrera_id: carreraIdReal ? Number(carreraIdReal) : null, 
        esta_vigente: data.esta_vigente === "true",
    };

    try {
        const res = await fetch(`${URL_API}planes/${id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const mensaje = await res.json();
           
            setError(`No se pudo editar: ${JSON.stringify(mensaje.errors || mensaje)}`); 
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
        <PageBase titulo="Editar Plan de Estudio" volver>
         {isLoading && <ComponenteCarga  />}
         {error && (
            <MensajeError 
                titulo="Error del servidor" 
                descripcion={error} 
            />
            )}

            <div className="mx-auto max-w-lg">
                <Card className="shadow-lg">
                    <Formulario
                        onSubmit={handleSubmit}
                        valoresIniciales={valoresIniciales}
                    >
                    <CardContent className="space-y-4 pt-6">
                            
                            <CampoInput
                                label="Fecha de Inicio"
                                nombre="fecha_inicio"
                                type="date"
                            />

                            <CampoSelect
                                label="Está vigente"
                                nombre="esta_vigente"
                                options={[
                                    { value: "true", label: "Sí" },
                                    { value: "false", label: "No" }
                                ]}
                            />

                        <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">Carrera</p>
                        <p className="mb-4">{plan?.carrera?.nombre}</p>
    
                           <CampoSelect
                                    label="Documento"
                                    nombre="documento_id"
                                    options={[
                                        { value: "null", label: "Sin asignar" },
                                        ...(document
                                            ?.filter((d): d is { id: number; tipo?: string; emisor?: string; numero?: string; anio?: number } => d.id != null)
                                            .map(d => {
                                                const partes = [
                                                    d.tipo || "",
                                                    d.emisor || "",
                                                    d.numero ? `Nº ${d.numero}` : "",
                                                    d.anio ?? ""
                                                ].filter(Boolean);

                                                return {
                                                    value: d.id.toString(),
                                                    label: partes.join(" ")
                                                };
                                            }) || [])
                                    ]}
                                    placeholder="Seleccione un documento..."
                                />
                        </CardContent>
                        <CardFooter className="flex justify-between">
                       

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
                    mensaje="Plan de estudio editado correctamente."
                    textoBoton="Aceptar"
                    colorBoton="#47ADA4"
                    onConfirmar={handleCerrarModal}
                  />
        </PageBase>
    );
}