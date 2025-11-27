import { useNavigate } from 'react-router';
import { Formulario } from '@components/Formularios/Formulario';
import { CampoInput } from '@components/Formularios/CampoInput';
import { CampoSelect } from '@components/Formularios/CampoSelect'; 
import PageBase from '@components/PageBase/PageBase';
import BotonBase from '@components/Botones/BotonBase';
import { Card, CardContent, CardFooter } from '@components/ui/card';
import useGetCarreras from '@apis/carreras';
import ModalGenerico from '@components/Modal/ModalGenerico';
import { useState } from 'react';
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga';
import BotonGenerico from '@components/Botones/BotonGenerico';
import { URL_API } from '@apis/constantes';
import useAuth from '@hooks/useAuth';
import MensajeError from '@components/Mensajes/MensajeError';
import { useGetDocumentos } from '@apis/documentos';

export default function PlanEstudioAgregar() {
    const navigate = useNavigate();
    const { data: carreras, isLoading: loading, error } = useGetCarreras()
    const { data: document} = useGetDocumentos();
    const [mostrarModal, setMostrarModal] = useState(false);
    const { user: usuario } = useAuth();
    const ROLES_PERMITIDOS = ["Administrador", "Coordinador"];
    const esAdmin = usuario?.roles?.some((r) => ROLES_PERMITIDOS.includes(r.nombre)) ?? false;
    const [errorCrear, setErrorCrear] = useState<string | null>(null);
  const handleCerrarModal = () => {
    setMostrarModal(false);
    navigate("/academica/planes/");
  };
  
    const valoresIniciales = {
        fecha_inicio: "",
        esta_vigente: true,
        carrera_id: "",
        documento_id: "",
    };

   const handleSubmit = async (data: any) => {
        const token = localStorage.getItem("access_token");

        const payload = {
            ...data,
            documento_id: data.documento_id === "null" ? null : Number(data.documento_id),
            carrera_id: Number(data.carrera_id),
            esta_vigente: data.esta_vigente === "true",
        };

        try {
            const res = await fetch(`${URL_API}planes/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
            });

            if (!res.ok) {
            const mensaje = await res.json();
            setErrorCrear(mensaje || "No se pudo crear el plan de estudio.");
            return;
            }
            // Si todo sale bien, reseteamos error y mostramos modal
            setErrorCrear(null);
            setMostrarModal(true);
        } catch (err) {
            console.error(err);
            setErrorCrear("Ocurrió un error al comunicarse con el servidor.");
        }
        };

    return (
        <PageBase titulo="Crear Plan de Estudio" volver>
              {errorCrear && (
                      <MensajeError 
                          titulo="Error del servidor" 
                          descripcion={errorCrear} 
                      />
                      )}
         {loading && <ComponenteCarga mensaje="Cargando..." />}

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

                            <CampoSelect
                                label="Carrera"
                                nombre="carrera_id"
                                options={carreras?.map((c) => ({
                                    value: c.id.toString(),
                                    label: c.nombre
                                })) || []}
                                placeholder="Seleccione una carrera..." 
                                disabled={loading}
                            />
    
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
                                disabled={loading}
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
                    mensaje="Plan de estudio creado correctamente."
                    textoBoton="Aceptar"
                    colorBoton="#47ADA4"
                    onConfirmar={handleCerrarModal}
                  />
        </PageBase>
    );
}