import { useGetRoles } from '@apis/roles'
import MensajeError from '@components/Mensajes/MensajeError'
import PageBase from '@components/PageBase/PageBase'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import FormularioUsuario from './componentes/FormularioUsuario'
import { useNavigate } from 'react-router'
import { usePostUsuario } from '@apis/usuarios'
import { extraerMensajeDeError } from '@lib/errores'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'
import { UsuarioCreateForm, UsuarioPostPayload, UsuarioResponse } from '@globalTypes/usuario'
import { useVentana } from '@components/Providers/VentanaProvider'

export default function PaginaCrearUsuario() {
	// Ventana y Navegación
	const { abrirVentana, cerrarVentana } = useVentana();
	const navigate = useNavigate();

	// Función para volver al Listado
	const volver = () => {
		cerrarVentana()
		navigate(-1);
	};
	
	// Obtiene los roles
	const { data: roles, isLoading: isLoadingRoles, isError: isErrorRoles } = useGetRoles();
	
	// Configuación para crear un usuario
	const { mutate: crearUsuario, isError: isErrorPost, isPending: isLoadingPost, error: errorPost } = usePostUsuario();

	const onConfirmAgregar = (createForm: UsuarioCreateForm) => {
		if (createForm) {
			const {roles, ...rest} = createForm;
			const dataCompleta: UsuarioPostPayload = {
				...rest,
				roles_ids: roles.map(rol => rol.id),
				fecha_nacimiento:
					createForm.fecha_nacimiento
					? createForm.fecha_nacimiento.split('/').reverse().join('-')
					: null,
			};
			crearUsuario(
				{ data: dataCompleta },
				{
					onError: (error: Error) =>
						abrirVentana({
							tipoVentana: 'error',
							onClose: cerrarVentana,
							onConfirm: cerrarVentana,
							titulo: '¡Error!',
							descripcion: extraerMensajeDeError(error),
						}),
					onSuccess: (usuario: UsuarioResponse) =>
						abrirVentana({
							tipoVentana: 'exito',
							onClose: volver,
							onConfirm: volver,
							titulo: '¡Completado!',
							descripcion: `El usuario ${usuario.first_name || ''} ${usuario.last_name || ''} se creó con éxito`,
						}),
				}
			)
		}
	};

	const onSubmit = (data: UsuarioCreateForm) => {
		abrirVentana({
            tipoVentana: 'form',
            onClose: cerrarVentana,
            onConfirm: () => onConfirmAgregar(data),
            titulo: 'Editar',
            cargando: isLoadingPost,
            descripcion: `¿Está seguro de que desea crear el usuario ${data.first_name || ''} ${data.last_name || ''}?`,
        });
	}

    const handleCancelar = () => {
        navigate(-1);
    };

	return (
		<PageBase volver>
			{isLoadingRoles ? (
				<ComponenteCarga mensaje='Obteniendo los datos del servidor...' />
			) : isErrorRoles ? (
				<MensajeError
					titulo="Error del servidor"
					descripcion="No se pudo obtener los datos para crear el usuario"
				/>
			) : (
				<Card className='mt-2'>
					<CardHeader className="text-center">
						<CardTitle>Agregar Usuario</CardTitle>
					</CardHeader>
					<CardContent>
						{isErrorPost && (
							<MensajeError titulo='Error del servidor' descripcion={extraerMensajeDeError(errorPost)} />
						)}
						<FormularioUsuario roles={roles || []} onSubmit={onSubmit} handleCancelar={handleCancelar} isLoading={isLoadingPost} />
					</CardContent>
				</Card>
			)}
		</PageBase>
	)
}
