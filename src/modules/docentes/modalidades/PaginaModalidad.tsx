import { useGetModalidad, usePostModalidad, usePutModalidad } from "@apis/modalidades";
import BotonBase from "@components/Botones/BotonBase";
import ComponenteCarga from "@components/ComponenteCarga/Componentecarga";
import { CampoInput } from "@components/Formularios/CampoInput";
import { Formulario } from "@components/Formularios/Formulario";
import MensajeError from "@components/Mensajes/MensajeError";
import PageBase from "@components/PageBase/PageBase";
import { useVentana } from "@components/Providers/VentanaProvider";
import Titulo from "@components/Tipografia/Titulo";
import { Card } from "@components/ui/card";
import { ModalidadPutPayload, ModalidadResponse } from "@globalTypes/modalidades";
import { extraerMensajeDeError } from "@lib/errores";
import { useLocation, useNavigate, useParams } from "react-router";

export default function PaginaModalidad() {
    // Tipo de Página
    const location = useLocation();
    const { id } = useParams();
    const edicion = location.pathname.includes("editar");

    // Busqueda de los datos de la modalidad
    const { data: modalidad, isLoading: isLoadingModalidad, isError: isErrorModalidad } = useGetModalidad({ id, habilitado: !!id });

    // Ventana y Navegación
    const { abrirVentana, cerrarVentana } = useVentana();
    const navigate = useNavigate();

    // Función para volver al Listado
    const volver = () => {
        cerrarVentana()
        navigate(-1);
    };

    // Configuación para crear un caracter
    const { mutate: crearModalidad, isPending: isLoadingPost } = usePostModalidad();
    const { mutate: modificarModalidad, isPending: isLoadingPut } = usePutModalidad();

    const onConfirm = (modalidad: ModalidadPutPayload) => {
        const ventanaConfig = {
            onError: (error: Error) =>
                abrirVentana({
                    tipoVentana: 'error',
                    onClose: cerrarVentana,
                    onConfirm: cerrarVentana,
                    titulo: '¡Error!',
                    descripcion: extraerMensajeDeError(error),
                }),
            onSuccess: (modalidad: ModalidadResponse) =>
                abrirVentana({
                    tipoVentana: 'exito',
                    onClose: volver,
                    onConfirm: volver,
                    titulo: '¡Completado!',
                    descripcion: `La modalidad ${modalidad.nombre} se ${edicion ? "modificó" : "creó"} con éxito`,
                }),
        };

        if (edicion) {
            modificarModalidad({ data: modalidad, params: { id: id } }, ventanaConfig);
        } else {
            crearModalidad({data: modalidad}, ventanaConfig);
        }
    };

    const onSubmit = (modalidad: ModalidadPutPayload) => {
        abrirVentana({
            tipoVentana: 'form',
            onClose: cerrarVentana,
            onConfirm: () => onConfirm(modalidad),
            cargando: edicion ? isLoadingPut : isLoadingPost,
            titulo:  `${edicion ? "Editar" : "Crear" } Modalidad`,
            descripcion: `¿Está seguro de que desea ${edicion ? "modificar" : "crear"} la modalidad ${modalidad.nombre}?`,
        })
    };

    const onCancel = () => {
        navigate("/docentes/modalidades");
    };

    // Valores Iniciales del Formulario
    const valoresIniciales: ModalidadPutPayload = {
        nombre: (edicion && modalidad?.nombre) || "",
    };

    return (
        <PageBase>
            <Card className="p-4">
                <Titulo>{edicion ? "Modificar" : "Agregar"} Modalidad</Titulo>
                {(edicion && isLoadingModalidad) ? (
                    <ComponenteCarga />
                ) : (edicion && isErrorModalidad) ? (
                    <MensajeError titulo="Error interno" descripcion="Error al obtener los datos del usuario." />
                ) : (
                    <Formulario onSubmit={onSubmit} valoresIniciales={valoresIniciales}>
                        <CampoInput
                            nombre="nombre"
                            label="Título de la Modalidad"
                            placeholder="Ingrese el título de la Modalidad"
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