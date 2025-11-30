import ComponenteCarga from "@components/ComponenteCarga/Componentecarga";
import MensajeError from "@components/Mensajes/MensajeError";
import PageBase from "@components/PageBase/PageBase";
import FormularioCrearRegimen from "./componentes/FormularioCrearRegimen";
import { RegimenCreateForm, RegimenPostPayload, RegimenResponse } from "@globalTypes/regimenes";
import useGetModalidades from "@apis/modalidades";
import useGetDedicaciones from "@apis/dedicacion";
import { Card } from "@components/ui/card";
import { useVentana } from "@components/Providers/VentanaProvider";
import { useNavigate } from "react-router";
import { usePostRegimen } from "@apis/regimenes";
import { extraerMensajeDeError } from "@lib/errores";

export default function PaginaCrearRegimen() {
    // Ventana y Navegación
	const { abrirVentana, cerrarVentana } = useVentana();
	const navigate = useNavigate();

    // Función para volver al Listado
	const volver = () => {
		cerrarVentana()
		navigate(-1);
	};

    // Obtiene las Modalidades
    const { data: modalidades, isLoading: isLoadingModalidades, isError: isErrorModalidades } = useGetModalidades();

    // Obtiene las Dedicaciones
    const { data: dedicaciones, isLoading: isLoadingDedicaciones, isError: isErrorDedicaciones } = useGetDedicaciones();

    const { mutate: crearRegimen, isPending: isLoadingPost } = usePostRegimen();

    const onConfirmAgregar = (createForm: RegimenCreateForm) => {
        if (createForm) {
            const { modalidad, dedicacion, ...rest } = createForm;
            
            if (!modalidad || !dedicacion) {
                return;
            }
            
            const data: RegimenPostPayload = {
                activo: true,
                modalidad_id: modalidad.id,
                dedicacion_id: dedicacion.id,
                modalidad: modalidad,
                dedicacion: dedicacion,
                ...rest,
            };

            crearRegimen(
                { data },
                {
                    onError: (error: Error) =>
                        abrirVentana({
                            tipoVentana: 'error',
                            onClose: cerrarVentana,
                            onConfirm: cerrarVentana,
                            titulo: '¡Error!',
                            descripcion: extraerMensajeDeError(error),
                        }),
                    onSuccess: (regimen: RegimenResponse) =>
                        abrirVentana({
                            tipoVentana: 'exito',
                            onClose: volver,
                            onConfirm: volver,
                            titulo: '¡Completado!',
                            descripcion: `El régimen ${regimen.modalidad.nombre} ${regimen.dedicacion.nombre} se creó con éxito`,
                        }),
                }
            )
        }
    };

    const onSubmit = (data: RegimenCreateForm) => {
        abrirVentana({
            tipoVentana: 'form',
            onClose: cerrarVentana,
            onConfirm: () => onConfirmAgregar(data),
            titulo: 'Crear Régimen',
            cargando: isLoadingPost,
            descripcion: `¿Está seguro de que desea crear el régimen ${data.modalidad?.nombre || ''} ${data.dedicacion?.nombre || ''}?`,
        });
    }
    
    return (
        <PageBase titulo='Crear Régimen' volver>
            {isLoadingModalidades || isLoadingDedicaciones ? (
                <ComponenteCarga mensaje='Obteniendo los datos del servidor...' />
            ) : isErrorModalidades || isErrorDedicaciones ? (
                <MensajeError
                    titulo="Error del servidor"
                    descripcion="No se pudo obtener los datos para crear el régimen"
                />
            ) : (
                <Card className="p-4">
                    <FormularioCrearRegimen
                        modalidades={modalidades || []}
                        dedicaciones={dedicaciones || []}
                        onSubmit={onSubmit}
                    />
                </Card>
            )}
            
        </PageBase>
    )
}