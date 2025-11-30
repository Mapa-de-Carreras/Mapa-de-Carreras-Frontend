import { useGetDedicacion, usePostDedicacion, usePutDedicacion } from "@apis/dedicacion";
import BotonBase from "@components/Botones/BotonBase";
import ComponenteCarga from "@components/ComponenteCarga/Componentecarga";
import { CampoInput } from "@components/Formularios/CampoInput";
import { Formulario } from "@components/Formularios/Formulario";
import MensajeError from "@components/Mensajes/MensajeError";
import PageBase from "@components/PageBase/PageBase";
import { useVentana } from "@components/Providers/VentanaProvider";
import Titulo from "@components/Tipografia/Titulo";
import { Card } from "@components/ui/card";
import { DedicacionPutPayload, DedicacionResponse } from "@globalTypes/dedicaciones";
import { extraerMensajeDeError } from "@lib/errores";
import { useLocation, useNavigate, useParams } from "react-router";

export default function PaginaDedicacion() {
    // Tipo de Página
    const location = useLocation();
    const { id } = useParams();
    const edicion = location.pathname.includes("editar");

    // Busqueda de los datos de la dedicacion
    const { data: dedicacion, isLoading: isLoadingDedicacion, isError: isErrorDedicacion } = useGetDedicacion({ id, habilitado: !!id});

    // Ventana y Navegación
    const { abrirVentana, cerrarVentana } = useVentana();
    const navigate = useNavigate();

    // Función para volver al Listado
	const volver = () => {
		cerrarVentana()
		navigate(-1);
	};

    // Configuación para crear una dedicacion
    const { mutate: crearDedicacion, isPending: isLoadingPost } = usePostDedicacion();
    const { mutate: modificarDedicacion, isPending: isLoadingPut } = usePutDedicacion();
    
    const onConfirm = (dedicacion: DedicacionPutPayload) => {
        const ventanaConfig = {
            onError: (error: Error) =>
                abrirVentana({
                    tipoVentana: 'error',
                    onClose: cerrarVentana,
                    onConfirm: cerrarVentana,
                    titulo: '¡Error!',
                    descripcion: extraerMensajeDeError(error),
                }),
            onSuccess: (dedicacion: DedicacionResponse) =>
                abrirVentana({
                    tipoVentana: 'exito',
                    onClose: volver,
                    onConfirm: volver,
                    titulo: '¡Completado!',
                    descripcion: `La dedicacion ${dedicacion.nombre} se ${edicion ? "modificó" : "creó"} con éxito`,
                }),
        };

        if (edicion) {
            modificarDedicacion({ data: dedicacion, params: { id: id } }, ventanaConfig);
        } else {
            crearDedicacion({data: dedicacion}, ventanaConfig);
        }
    };

    const onSubmit = (dedicacion: DedicacionPutPayload) => {
        abrirVentana({
            tipoVentana: 'form',
            onClose: cerrarVentana,
            onConfirm: () => onConfirm(dedicacion),
            cargando: edicion ? isLoadingPut : isLoadingPost,
            titulo:  `${edicion ? "Editar" : "Crear" } Dedicacion`,
            descripcion: `¿Está seguro de que desea ${edicion ? "modificar" : "crear"} la dedicacion ${dedicacion.nombre}?`,
        })
    };

    const onCancel = () => {
        navigate("/docentes/dedicaciones");
    };

    // Valores Iniciales del Formulario
    const valoresIniciales: DedicacionPutPayload = {
        nombre: (edicion && dedicacion?.nombre) || "",
    };

    return (
        <PageBase>
            <Card className="p-4">
                <Titulo>{edicion ? "Modificar" : "Agregar"} Dedicacion</Titulo>
                {(edicion && isLoadingDedicacion) ? (
                    <ComponenteCarga />
                ) : (edicion && isErrorDedicacion) ? (
                    <MensajeError titulo="Error interno" descripcion="Error al obtener los datos del usuario." />
                ) : (
                    <Formulario onSubmit={onSubmit} valoresIniciales={valoresIniciales}>
                        <CampoInput
                            nombre="nombre"
                            label="Título de la Dedicacion"
                            placeholder="Ingrese el título de la Dedicacion"
                            obligatorio
                        />
                        <div className="flex gap-2 justify-between">
                            <BotonBase type="button" variant="cancelar" onClick={onCancel}/>
                            <BotonBase type="submit" variant="guardar"/>
                        </div>
                    </Formulario>
                )}
            </Card>
        </PageBase>
    );
}