import ComponenteCarga from "@components/ComponenteCarga/Componentecarga";
import MensajeError from "@components/Mensajes/MensajeError";
import PageBase from "@components/PageBase/PageBase";
import { RegimenCreateForm, RegimenEditForm, RegimenPutPayload, RegimenResponse } from "@globalTypes/regimenes";
import useGetModalidades from "@apis/modalidades";
import useGetDedicaciones from "@apis/dedicacion";
import { Card } from "@components/ui/card";
import { useVentana } from "@components/Providers/VentanaProvider";
import { useNavigate, useParams } from "react-router";
import { useGetRegimen, usePutRegimen } from "@apis/regimenes";
import { extraerMensajeDeError } from "@lib/errores";
import FormularioEditarRegimen from "./componentes/FormularioEditarRegimen";

export default function PaginaEditarRegimen() {
    const { id } = useParams();

    // Busqueda de los datos de la dedicacion
    const { data: regimen, isLoading: isLoadingRegimen, isError: isErrorRegimen } = useGetRegimen({ id, habilitado: !!id});
    
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

    const { mutate: editarRegimen, isPending: isLoadingPut } = usePutRegimen();

    const onConfirmEditar = (editForm: RegimenEditForm) => {
        if (!id) {
            return;
        }
        if (editForm) {
            const { modalidad, dedicacion, ...rest } = editForm;
  
            const data: RegimenPutPayload = {
                id: Number(id),
                activo: true,
                modalidad_id: modalidad.id,
                dedicacion_id: dedicacion.id,
                modalidad: {
                    nombre: modalidad.nombre
                },
                dedicacion: {
                    nombre: dedicacion.nombre
                },
                ...rest,
            };

            editarRegimen(
                { params: { id }, data },
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
            onConfirm: () => onConfirmEditar(data),
            titulo: 'Editar Régimen',
            cargando: isLoadingPut,
            descripcion: `¿Está seguro de que desea editar el régimen ${data.modalidad?.nombre || ''} ${data.dedicacion?.nombre || ''}?`,
        });
    }

    // Valores Iniciales del Formulario
    const valoresIniciales: RegimenEditForm | null =  regimen ? {
        modalidad: regimen.modalidad,
        dedicacion: regimen.dedicacion,
        horas_min_frente_alumnos: regimen.horas_min_frente_alumnos,
        horas_max_frente_alumnos: regimen.horas_max_frente_alumnos,
        horas_min_anual: regimen.horas_min_anual,
        horas_max_anual: regimen.horas_max_anual,
        max_asignaturas: regimen.max_asignaturas,
    } : null;
    
    return (
        <PageBase titulo='Editar Régimen' volver>
            {isLoadingModalidades || isLoadingDedicaciones || isLoadingRegimen ? (
                <ComponenteCarga mensaje='Obteniendo los datos del servidor...' />
            ) : isErrorModalidades || isErrorDedicaciones || isErrorRegimen ? (
                <MensajeError
                    titulo="Error del servidor"
                    descripcion="No se pudo obtener los datos para editar el régimen"
                />
            ) : (
                <Card className="p-4">
                    {valoresIniciales && (
                        <FormularioEditarRegimen
                            valoresIniciales={valoresIniciales}
                            modalidades={modalidades || []}
                            dedicaciones={dedicaciones || []}
                            onSubmit={onSubmit}
                        />
                    )}
                </Card>
            )}
            
        </PageBase>
    )
}