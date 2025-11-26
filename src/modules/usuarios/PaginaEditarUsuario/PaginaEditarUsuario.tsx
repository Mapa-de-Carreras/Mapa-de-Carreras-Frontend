//import { useGetRoles } from "@apis/roles";
import { useGetUsuario, usePutUsuario } from "@apis/usuarios";
import ComponenteCarga from "@components/ComponenteCarga/Componentecarga";
import MensajeError from "@components/Mensajes/MensajeError";
import PageBase from "@components/PageBase/PageBase";
import { useVentana } from "@components/Providers/VentanaProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { UsuarioEditForm, UsuarioPutPayload } from "@globalTypes/usuario";
import { extraerMensajeDeError } from "@lib/errores";
import { useNavigate, useParams } from "react-router";
import FormularioEditarUsuario from "./componentes/FormularioEditarUsuario";
import { formatDate } from "@lib/fechas";

export default function PaginaEditarUsuario() {
    // Ventana y Navegación
	const { abrirVentana, cerrarVentana } = useVentana();
	const navigate = useNavigate();

    // Obtiene los datos del Usuario
	const { id } = useParams();
	const { data: usuario, isError: isErrorUsuario, isLoading: isLoadingUsuario, } = useGetUsuario({ id: id || '', habilitado: !!id, });
    
    const valoresIniciales: UsuarioEditForm | null = usuario ?  {
        legajo: usuario.legajo,
        first_name: usuario.first_name,
        last_name: usuario.last_name,
        email: usuario.email,
        username: usuario.username,
        celular: usuario.celular || "",
        fecha_nacimiento: usuario.fecha_nacimiento ? formatDate(new Date(usuario.fecha_nacimiento)) : "",
    } : null;

    // Función para volver al Listado
	const volver = () => {
		cerrarVentana()
		navigate(-1);
	};

    // Obtiene los roles
    // const { data: roles, isLoading: isLoadingRoles, isError: isErrorRoles } = useGetRoles();

    // Configuación para editar un usuario
    const { mutate: modificarUsuario, isPending: isLoadingPut, isError: isErrorPut, error: errorPut } = usePutUsuario();

    const onConfirmActivar = (editForm: UsuarioPutPayload) => {
        if (editForm) {
            const usuarioPutPayload: UsuarioPutPayload = editForm;
            usuarioPutPayload.fecha_nacimiento = editForm.fecha_nacimiento?.split('/').reverse().join('-') || "";
            modificarUsuario(
                { params: { id: Number(id) }, data: editForm },
                {
                    onError: (error: Error) =>
                        abrirVentana({
                            tipoVentana: 'error',
                            onClose: cerrarVentana,
                            onConfirm: cerrarVentana,
                            titulo: '¡Error!',
                            descripcion: extraerMensajeDeError(error),
                        }),
                    onSuccess: () =>
                        abrirVentana({
                            tipoVentana: 'exito',
                            onClose: volver,
                            onConfirm: volver,
                            titulo: '¡Completado!',
                            descripcion: `El usuario ${usuario?.first_name || ''} ${usuario?.last_name || ''} se modificó con éxito`,
                        }),
                }
            )
        }
    };

    const onSubmit = (data: UsuarioEditForm) => {
        abrirVentana({
            tipoVentana: 'form',
            onClose: cerrarVentana,
            onConfirm: () => onConfirmActivar(data),
            titulo: 'Editar',
            cargando: isLoadingPut,
            descripcion: `¿Está seguro de que desea editar el usuario ${usuario?.first_name || ''} ${usuario?.last_name || ''}?`,
        });
    };

    const handleCancelar = () => {
        navigate(-1);
    };

    return (
        <PageBase
            volver
        >
            {(isLoadingUsuario) ? (
				<ComponenteCarga mensaje='Obteniendo los datos del servidor...' />
			) : (isErrorUsuario) ? (
				<MensajeError
					titulo="Error del servidor"
					descripcion="No se pudo obtener los datos para editar el usuario"
				/>
			) : (
				<Card className="mt-2">
					<CardHeader className="text-center">
						<CardTitle>Editar Usuario</CardTitle>
					</CardHeader>
					<CardContent>
						{isErrorPut && (
							<MensajeError titulo='Error al editar' descripcion={extraerMensajeDeError(errorPut)} />
						)}
                        <br />
						<FormularioEditarUsuario
                            //roles={roles || []} ?? No se puede mandar los roles en usuario todavía
                            onSubmit={onSubmit}
                            handleCancelar={handleCancelar}
                            isLoading={isLoadingPut}
                            valoresIniciales={valoresIniciales}
                        />
					</CardContent>
				</Card>
			)}
        </PageBase>
    );
}
