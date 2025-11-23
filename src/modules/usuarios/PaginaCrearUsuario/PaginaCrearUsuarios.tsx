import { useGetRoles } from '@apis/roles'
import MensajeError from '@components/Mensajes/MensajeError'
import PageBase from '@components/PageBase/PageBase'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import FormularioUsuario from './componentes/FormularioUsuario'
import { useNavigate } from 'react-router'
import { UsuarioPost } from './componentes/types'
import { usePostUsuario, UsuarioCreatePayload } from '@apis/usuarios'
import { extraerMensajeDeError } from '@lib/errores'
import { useCallback, useState } from 'react'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'
import DialogoAviso from '@components/Modal/DialogoAviso'
import { Usuario } from '@globalTypes/usuario'

type Result<T> = {
	isOpen: boolean
	type: 'exito'  | 'error' | 'info'
	error?: Error
	data?: T
};

const defaultResult: Result<Usuario> = {
	isOpen: false,
	type: 'info',
};

export default function PaginaCrearUsuario() {
	const { data: roles, isLoading: isLoadingRoles, isError: isErrorRoles } = useGetRoles()
	const queriesToInvalidate = ['useGetUsuarios'];
	const [estadoVentana, setEstadoVentana] = useState(defaultResult);
	const { mutate, isError: isErrorPost, isPending: isLoadingPost, error: errorPost } = usePostUsuario({
		onError: (error) => setEstadoVentana({isOpen: true, type: 'error', error}),
		onSuccess: (data) => setEstadoVentana({isOpen: true, type: 'exito', data}),
		queriesToInvalidate,
	});
	const navigate = useNavigate();

	const onSubmit = (data: UsuarioPost) => {
		const dataCompleta: UsuarioCreatePayload = {
			...data,
			fecha_nacimiento: data.fecha_nacimiento.split('/').reverse().join('-'),
		};
		mutate({ data: dataCompleta });
	};

    const handleCancelar = () => {
        navigate("/administracion/usuarios");
    };

	const onClose = useCallback(() => {
		if (estadoVentana.type==='error') {
			setEstadoVentana({isOpen: false, type: 'info'});
		} else {
			navigate("/administracion/usuarios");
		}
	}, [estadoVentana, navigate]);

	return (
		<PageBase>
			{isLoadingRoles ? (
				<ComponenteCarga mensaje='Obteniendo los datos del servidor...' />
			) : isErrorRoles ? (
				<MensajeError
					titulo="Error del servidor"
					descripcion="No se pudo obtener los datos para crear el usuario"
				/>
			) : (
				<Card>
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
			<DialogoAviso
				type={estadoVentana.type==='exito' ? 'aceptar' : estadoVentana.type==='info' ? 'default' : estadoVentana.type}
				open={estadoVentana.isOpen}
				onClose={onClose}
				titulo={estadoVentana.type==='exito' ? 
					'¡Felicitaciones!' : estadoVentana.type==='error' ? '¡Oops!' : 'Aviso'
				}
				descripcion={estadoVentana.type==='exito' ?
					`La cuenta ${estadoVentana.data?.username} se creo correctamente` :
					estadoVentana.type==='error' ? `Ocurrió un error en el servidor: ${estadoVentana.error}` : 'Buenos días'
				}
			/>
		</PageBase>
	)
}
