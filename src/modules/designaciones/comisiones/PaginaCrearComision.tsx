import { useNavigate } from "react-router";
import PageBase from "@components/PageBase/PageBase";
import { Card } from "@components/ui/card";
import MensajeError from "@components/Mensajes/MensajeError";
import { useGetPlanesAsignatura } from "@apis/planasignatura";
import { useVentana } from "@components/Providers/VentanaProvider";
import { usePostComision } from "@apis/comisiones";
import { Comision, ComisionPostPayload } from "@globalTypes/comisiones";
import { extraerMensajeDeError } from "@lib/errores";
import ComponenteCarga from "@components/ComponenteCarga/Componentecarga";
import FormularioCrearComision from "./componentes/FormularioCrearComision";
import { useGetPlanes } from "@apis/planestudio";


export default function PaginaCrearComision() {
	// Ventana y Navegación
	const { abrirVentana, cerrarVentana } = useVentana()
	const navigate = useNavigate()

	// Obtiene los planes de asignatura y planes de estudio
	const { data: planesAsignatura, isLoading: isLoadingPlanesAsignatura, isError: isErrorPlanesAsignatura } = useGetPlanesAsignatura();
    const { data: planes, isLoading: isLoadingPlanes, isError: isErrorPlanes } = useGetPlanes();

	// Función para volver al Listado
	const volver = () => {
		cerrarVentana()
		navigate(-1);
	};

	// Configuación para crear un comision
	const { mutate: crearComision, isPending: isLoadingPost } = usePostComision();

	const onSend = (payload: ComisionPostPayload) => {
		crearComision(
			{data: payload},
			{
				onError: (error: Error) =>
					abrirVentana({
						tipoVentana: 'error',
						onClose: cerrarVentana,
						onConfirm: cerrarVentana,
						titulo: '¡Error!',
						descripcion: extraerMensajeDeError(error),
					}),
				onSuccess: (comision: Comision) =>
					abrirVentana({
						tipoVentana: 'exito',
						onClose: volver,
						onConfirm: volver,
						titulo: '¡Completado!',
						descripcion: `La comision ${comision.nombre} se creó con éxito`,
					}),
			}
		);
	};

	const onCancel = () => {
        navigate(-1);
    };

    const cargando = isLoadingPlanes || isLoadingPlanesAsignatura;
    const error = isErrorPlanes || isErrorPlanesAsignatura;

	return (
		<PageBase titulo="Crear Comisión" volver>
			<Card className="p-4 mt-2 max-w-3xl mx-auto">
				{cargando ? (
					<ComponenteCarga mensaje="Cargando datos..." />
				) : error ? (
					<MensajeError titulo="Error" descripcion="Error al cargar los datos necesarios." />
				) : (
					<FormularioCrearComision
						planes={planes || []}
						planesAsignatura={planesAsignatura || []}
						onCancel={onCancel}
						onSend={onSend}
						isLoading={isLoadingPost}
					/>
				)}
			</Card>
		</PageBase>
	);
}