import { useGetCaracter, usePostCaracter, usePutCaracter } from "@apis/caracteres";
import BotonBase from "@components/Botones/BotonBase";
import ComponenteCarga from "@components/ComponenteCarga/Componentecarga";
import { CampoInput } from "@components/Formularios/CampoInput";
import { Formulario } from "@components/Formularios/Formulario";
import MensajeError from "@components/Mensajes/MensajeError";
import PageBase from "@components/PageBase/PageBase";
import { useVentana } from "@components/Providers/VentanaProvider";
import Titulo from "@components/Tipografia/Titulo";
import { Card } from "@components/ui/card";
import { CaracterPutPayload, CaracterResponse } from "@globalTypes/caracter";
import { extraerMensajeDeError } from "@lib/errores";
import { useLocation, useNavigate, useParams } from "react-router";

export default function PaginaCaracter() {
    // Tipo de Página
    const location = useLocation();
    const { id } = useParams();
    const edicion = location.pathname.includes("editar");

    // Busqueda de los datos del caracter
    const { data: caracter, isLoading: isLoadingCaracter, isError: isErrorCaracter } = useGetCaracter({ id, habilitado: !!id});

    // Ventana y Navegación
    const { abrirVentana, cerrarVentana } = useVentana();
    const navigate = useNavigate();

    // Función para volver al Listado
	const volver = () => {
		cerrarVentana()
		navigate(-1);
	};

    // Configuación para crear un caracter
    const { mutate: crearCaracter, isPending: isLoadingPost } = usePostCaracter();
    const { mutate: modificarCaracter, isPending: isLoadingPut } = usePutCaracter();
    
    const onConfirm = (caracter: CaracterPutPayload) => {
        const ventanaConfig = {
            onError: (error: Error) =>
                abrirVentana({
                    tipoVentana: 'error',
                    onClose: cerrarVentana,
                    onConfirm: cerrarVentana,
                    titulo: '¡Error!',
                    descripcion: extraerMensajeDeError(error),
                }),
            onSuccess: (caracter: CaracterResponse) =>
                abrirVentana({
                    tipoVentana: 'exito',
                    onClose: volver,
                    onConfirm: volver,
                    titulo: '¡Completado!',
                    descripcion: `El caracter ${caracter.nombre} se ${edicion ? "modificó" : "creó"} con éxito`,
                }),
        };

        if (edicion) {
            modificarCaracter({ data: caracter, params: { id: id } }, ventanaConfig);
        } else {
            crearCaracter({data: caracter}, ventanaConfig);
        }
    };

    const onSubmit = (caracter: CaracterPutPayload) => {
        abrirVentana({
            tipoVentana: 'form',
            onClose: cerrarVentana,
            onConfirm: () => onConfirm(caracter),
            cargando: edicion ? isLoadingPut : isLoadingPost,
            titulo:  `${edicion ? "Editar" : "Crear" } Caracter`,
            descripcion: `¿Está seguro de que desea ${edicion ? "modificar" : "crear"} el caracter ${caracter.nombre}?`,
        })
    };

    const onCancel = () => {
        navigate("/docentes/caracteres");
    };

    // Valores Iniciales del Formulario
    const valoresIniciales: CaracterPutPayload = {
        nombre: (edicion && caracter?.nombre) || "",
    };

    return (
        <PageBase>
            <Card className="p-4">
                <Titulo>{edicion ? "Modificar" : "Agregar"} Caracter</Titulo>
                {(edicion && isLoadingCaracter) ? (
                    <ComponenteCarga />
                ) : (edicion && isErrorCaracter) ? (
                    <MensajeError titulo="Error interno" descripcion="Error al obtener los datos del usuario." />
                ) : (
                    <Formulario onSubmit={onSubmit} valoresIniciales={valoresIniciales}>
                        <CampoInput
                            nombre="nombre"
                            label="Título del Caracter"
                            placeholder="Ingrese el título del Caracter"
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