import { useDeleteUsuario, useGetUsuario, usePatchUsuario } from '@apis/usuarios'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'
import PageBase from '@components/PageBase/PageBase'
import { Card, CardContent, CardTitle } from '@components/ui/card'
import { Separator } from '@components/ui/separator'
import { useNavigate, useParams } from 'react-router'
import DetalleUsuario from './componentes/DetalleUsuario'
import { useVentana } from '@components/Providers/VentanaProvider'
import BotonBase from '@components/Botones/BotonBase'
import MensajeError from '@components/Mensajes/MensajeError'
import { formatDate } from '@lib/fechas'
import useGetCarreras from '@apis/carreras'
import { usePatchCoordinador } from '@apis/coordinadores'
import { Formulario } from '@components/Formularios/Formulario'
import { CampoSelect } from '@components/Formularios/CampoSelect'
import { CoordinadorPatchPayload } from '@globalTypes/coordinador'

export default function PaginaDetalleUsuario() {
	// Ventana y Navegación
	const { abrirVentana, cerrarVentana } = useVentana();
	const navigate = useNavigate();

	// Obtiene las carreras
	const { data: carreras, isError: isErrorCarreras, isLoading: isLoadingCarreras } = useGetCarreras();

	// Obtiene los datos del Usuario
	const { id } = useParams();
	const { data: usuario, isError, isLoading, } = useGetUsuario({ id: id || '', habilitado: !!id, });

	// Función para volver al Listado
	const volver = () => {
		cerrarVentana()
		navigate('/administracion/usuarios')
	};

	// Configuación para eliminar un usuario
	const { mutate: eliminarUsuario, isPending: isLoadingDelete } = useDeleteUsuario();

	const onConfirmDelete = () => {
		eliminarUsuario(
			{ params: { id: id } },
			{
				onError: () =>
					abrirVentana({
						tipoVentana: 'error',
						onClose: cerrarVentana,
						onConfirm: cerrarVentana,
						titulo: '¡Error!',
						descripcion: `No se pudo eliminar el usuario ${usuario?.first_name || ''} ${usuario?.last_name || ''}`,
					}),
				onSuccess: () =>
					abrirVentana({
						tipoVentana: 'exito',
						onClose: volver,
						onConfirm: volver,
						titulo: '¡Completado!',
						descripcion: `El usuario ${usuario?.first_name || ''} ${usuario?.last_name || ''} se eliminó con éxito`,
					}),
			}
		)
	};

	const handleEliminar = () => {
		abrirVentana({
			tipoVentana: 'eliminar',
			cargando: isLoadingDelete,
			onClose: cerrarVentana,
			onConfirm: onConfirmDelete,
			titulo: 'Eliminar Usuario',
			descripcion: `¿Está seguro que desea eliminar el usuario ${usuario?.first_name || ''} ${usuario?.last_name || ''}?`,
		})
	};

	// Configuación para activar un usuario
	const { mutate: activarUsuario, isPending: isLoadingPatch } = usePatchUsuario({
		queriesToInvalidate: ['useGetUsuario']
	});

	const onConfirmActivar = () => {
		activarUsuario(
			{ params: { id: id }, data: { is_active: !usuario?.is_active } },
			{
				onError: () =>
					abrirVentana({
						tipoVentana: 'error',
						onClose: cerrarVentana,
						onConfirm: cerrarVentana,
						titulo: '¡Error!',
						descripcion: `No se pudo modificar el usuario ${usuario?.first_name || ''} ${usuario?.last_name || ''}`,
					}),
				onSuccess: () =>
					abrirVentana({
						tipoVentana: 'exito',
						onClose: cerrarVentana,
						onConfirm: cerrarVentana,
						titulo: '¡Completado!',
						descripcion: `El usuario ${usuario?.first_name || ''} ${usuario?.last_name || ''} se modificó con éxito`,
					}),
			}
		)
	};

	const handleActivar = () => {
		abrirVentana({
			tipoVentana: 'form',
			cargando: isLoadingPatch,
			onClose: cerrarVentana,
			onConfirm: onConfirmActivar,
			icono: 'icon-[mingcute--power-fill]',
			titulo: `${usuario?.is_active ? "Desactivar" : "Activar"} Usuario`,
			descripcion: `¿Está seguro que desea ${usuario?.is_active ? "desactivar" : "activar"} el usuario ${usuario?.first_name || ''} ${usuario?.last_name || ''}?`,
		})
	};

	const handleEditar = () => {
		navigate(`/administracion/usuarios/editar/${usuario?.id}`);
	};

	// Configuación para agregar una carrera
	const { mutate: agregarCarrera, isPending: isLoadingAgregarCarrera } = usePatchCoordinador();

	const valoresIniciales = {
		carreras_coordinadas_ids: [],
	}

	const onSubmitAgregarCarrera = (data: CoordinadorPatchPayload) => {
		agregarCarrera(
			{
				params: { id: id },
				data: data,
			},
			{
				onError: () =>
					abrirVentana({
						tipoVentana: 'error',
						onClose: cerrarVentana,
						onConfirm: cerrarVentana,
						titulo: '¡Error!',
						descripcion: `No se pudo agregar la carrera al usuario ${usuario?.first_name || ''} ${usuario?.last_name || ''}`,
					}),
				onSuccess: () =>
					abrirVentana({
						tipoVentana: 'exito',
						onClose: cerrarVentana,
						onConfirm: cerrarVentana,
						titulo: '¡Completado!',
						descripcion: `La carrera se agregó al usuario ${usuario?.first_name || ''} ${usuario?.last_name || ''} con éxito`,
					}),
			}
		);
	}

	const handleAgregarCarrera = () => {
		if (isErrorCarreras || !usuario) {
			abrirVentana({
				tipoVentana: 'error',
				onClose: cerrarVentana,
				onConfirm: cerrarVentana,
				titulo: '¡Error!',
				descripcion: 'No se pudo obtener las carreras.',
			});
		} else if (!usuario.roles.some((rol) => rol.nombre === 'Coordinador')) {
			abrirVentana({
				tipoVentana: 'error',
				onClose: cerrarVentana,
				onConfirm: cerrarVentana,
				titulo: '¡Error!',
				descripcion: 'El usuario no es coordinador.',
			});
		} else {
			abrirVentana({
				tipoVentana: 'form',
				onClose: cerrarVentana,
				content: (
					<div className='flex flex-col gap-2'>
						<Formulario onSubmit={onSubmitAgregarCarrera} valoresIniciales={valoresIniciales}>
							<CampoSelect
								nombre='carreras_coordinadas_ids'
								label='Carrera'
								options={carreras?.map((carrera) => ({
									value: carrera.id,
									label: carrera.nombre,
								})) || []}
								className='w-full'
							/>
							<div className='flex justify-between'>
								<BotonBase
									type='button'
									variant='cancelar'
									onClick={cerrarVentana}
								/>
								<BotonBase
									type='submit'
									variant='guardar'
									isLoading={isLoadingAgregarCarrera}
								/>
							</div>
						</Formulario>
					</div>
				),
			});
		}
	}

	return (
		<PageBase volver>
			{isLoading ? (
				<ComponenteCarga />
			) : isError ? (
				<MensajeError titulo='Error del Servidor' descripcion='No se pudo obtener los datos del usuario' />
			) : (
				usuario && (
					<Card className="mt-2">
						<CardTitle className="flex flex-col items-center justify-center gap-2">
							<span className="icon-[guidance--user-1] text-6xl" />
							<h3 className="text-xl">{`${usuario.first_name} ${usuario.last_name}`}</h3>
							<div className='flex flex-col flex-wrap sm:flex-row w-full gap-2 px-2 justify-center'>
								<BotonBase
									onClick={handleActivar}
									variant="guardar"
									type="button"
									icono='icon-[mingcute--power-fill]'
								>
									{usuario?.is_active ? "Desactivar" : "Activar"}
								</BotonBase>
								<BotonBase
									onClick={handleEditar}
									variant="editar"
									type="button"
								/>
								<BotonBase
									onClick={handleAgregarCarrera}
									variant="editar"
									type="button"
									isLoading={isLoadingCarreras}
								>
									Asignar Carrera
								</BotonBase>
								<BotonBase
									onClick={handleEliminar}
									variant="eliminar"
									type="button"
								/>
							</div>
						</CardTitle>
						<Separator />
						<CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2">
							<DetalleUsuario label="Nombres:" body={usuario.first_name} />
							<DetalleUsuario label="Apellidos:" body={usuario.last_name} />
							<DetalleUsuario label="Usuario:" body={usuario.username} />
							<DetalleUsuario label="Email:" body={usuario.email} />
							
							<DetalleUsuario
								label="Fecha de Nacimiento:"
								body={
									usuario.fecha_nacimiento
									? formatDate(new Date(usuario.fecha_nacimiento))
									: "Sin registros"
								}
							/>
							<DetalleUsuario label="Celular:" body={usuario.celular || 'Sin registros'} />
							<DetalleUsuario label="Legajo:" body={usuario.legajo || 'Sin registros'} />

							<DetalleUsuario
								label="Roles:"
								body={usuario.roles.map((r) => r.nombre).join(', ')}
							/>
						</CardContent>
					</Card>
				)
			)}
		</PageBase>
	);
}
