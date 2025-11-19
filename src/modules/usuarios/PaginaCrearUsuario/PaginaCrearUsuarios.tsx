import { useGetRoles } from '@apis/roles'
import MensajeError from '@components/Mensajes/MensajeError'
import PageBase from '@components/PageBase/PageBase'
import { Loading } from '@components/Templates/Loading'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import FormularioUsuario from './componentes/FormularioUsuario'
import { useNavigate } from 'react-router'
import { UsuarioPost } from './componentes/types'
import { ActivarCuentaPayload, usePostUsuario, usePostVerificarUsuario, UsuarioCreatePayload } from '@apis/usuarios'
import { extraerMensajeDeError } from '@lib/errores'
import { useCallback, useState } from 'react'
import DialogoFormulario from '@components/Modal/DialogoFormulario'
import { CampoInput } from '@components/Formularios/CampoInput'

export default function PaginaCrearUsuario() {
	const { data: roles, isLoading: isLoadingRoles, isError: isErrorRoles } = useGetRoles()
	const queriesToInvalidate = ['useGetUsuarios'];
	const [ventanaConfirmar, setVentanaConfirmar] = useState(false);
	const { mutate, isError: isErrorPost, isSuccess: isSuccessPost, error: errorPost } = usePostUsuario({
		onError: (error) => {
			console.error("Que paso: ", error);
		},
		onSuccess: (data) => {
			console.log("Todo bien: ", data);
			setVentanaConfirmar(true);
		},
		queriesToInvalidate,
	});
	const { mutate: mutateConfirmar, isError: isErrorConfirmar, isSuccess: isSuccessConfirmar } = usePostVerificarUsuario({});
	const navigate = useNavigate();
	const [email, setEmail] = useState("");

	const onSubmit = (data: UsuarioPost) => {
		const dataCompleta: UsuarioCreatePayload = {
			...data,
			fecha_nacimiento: data.fecha_nacimiento.split('/').reverse().join('-'),
		};
		setEmail(data.email);
		mutate({ data: dataCompleta });
	};

    const handleCancelar = () => {
        navigate("/administracion/usuarios");
    };

	const valoresInicialesConfirmar: ActivarCuentaPayload = {
		email: "",
		code: "",
	};

	const onSubmitConfirmar = useCallback((data: { code:string }) => {
		mutateConfirmar({ data: { ...data, email } });
	}, [email, mutateConfirmar]);

	return (
		<PageBase>
			{isLoadingRoles ? (
				<Loading titulo="Cargando" descripcion="Obteniendo los datos del servidor..." />
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
						<FormularioUsuario roles={roles || []} onSubmit={onSubmit} handleCancelar={handleCancelar} />
					</CardContent>
				</Card>
			)}
			<DialogoFormulario
				open={ventanaConfirmar}
				setOpen={setVentanaConfirmar}
				titulo='Verificación de cuenta'
				descripcion="Ingrese el código de verifcación que fue enviado al correo para activar su cuenta. También puede activala más tarde desde el apartado 'Detalle de usuario'"
				onSubmit={onSubmitConfirmar}
				onCancel={handleCancelar}
				valoresIniciales={valoresInicialesConfirmar}
			>
				<div className='flex flex-col'>
					<CampoInput
						label='Código de verificación'
						nombre='code'
						placeholder='Ingrese el código de verificación'
						obligatorio
					/>
				</div>
			</DialogoFormulario>
		</PageBase>
	)
}
