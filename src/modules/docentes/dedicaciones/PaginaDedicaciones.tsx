import useGetDedicaciones, { useDeleteDedicacion } from '@apis/dedicacion'
import BotonBase from '@components/Botones/BotonBase'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'
import Listado from '@components/Lista/Listado'
import MensajeError from '@components/Mensajes/MensajeError'
import PageBase from '@components/PageBase/PageBase'
import { useVentana } from '@components/Providers/VentanaProvider'
import { Tabla } from '@components/Tabla/Tabla'
import Titulo from '@components/Tipografia/Titulo'
import { Card } from '@components/ui/card'
import { Dedicacion } from '@globalTypes/dedicaciones'
import { extraerMensajeDeError } from '@lib/errores'
import { ColumnDef } from '@tanstack/react-table'
import { useNavigate } from 'react-router'
import useRol from '@hooks/useRol'

export default function PaginaDedicaciones() {
    // Roles de Usuario
    const esAdmin = useRol('Administrador');

	// Ventana y Navegación
	const { abrirVentana, cerrarVentana } = useVentana()
	const navigate = useNavigate()
	
	// Obtiene los datos de los Dedicaciones
	const {
		data: dedicaciones,
		isError: isErrorDedicaciones,
		isLoading: isLoadingDedicaciones,
	} = useGetDedicaciones()

	// Configuación para eliminar una Dedicacion
	const {
		mutate: eliminarDedicacion,
		isPending: isLoadingEliminar,
	} = useDeleteDedicacion({ queriesToInvalidate: ['useGetDedicaciones'] })

	const onConfirmDelete = (dedicacion: Dedicacion) => {
		eliminarDedicacion(
			{ params: { id: dedicacion.id } },
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
						onClose: cerrarVentana,
						onConfirm: cerrarVentana,
						titulo: '¡Completado!',
						descripcion: `La dedicación ${dedicacion.nombre} se eliminó con éxito`,
					}),
			}
		)
	}

	// Funciones de manejo de eventos
	const handleEliminar = (dedicacion: Dedicacion) => {
		abrirVentana({
			tipoVentana: 'eliminar',
			onClose: cerrarVentana,
			onConfirm: () => onConfirmDelete(dedicacion),
			cargando: isLoadingEliminar,
			titulo: 'Eliminar Dedicación',
			descripcion: `¿Está seguro de que desea eliminar la dedicación ${dedicacion.nombre}?`,
		});
	}

	const handleEditar = (id: number) => {
		navigate(`/docentes/dedicaciones/editar/${id}`)
	}

	// const handleAgregar = () => {
	// 	navigate('/docentes/dedicaciones/agregar')
	// }

	// Columnas de la tabla
	const columnas: ColumnDef<Dedicacion>[] = [
		{ accessorKey: 'id', header: 'Codigo', size: 1 },
		{ accessorKey: 'nombre', header: 'Nombre', size: 4 },
		// {
		// 	id: 'Acciones',
		// 	header: 'Acciones',
		// 	cell: ({ row }) => (
		// 		<div className="flex flex-row gap-2">
		// 			<BotonBase variant="eliminar" onClick={() => handleEliminar(row.original)} />
		// 			<BotonBase variant="editar" onClick={() => handleEditar(row.original.id)} />
		// 		</div>
		// 	),
		// 	size: 2,
		// },
	]

	return (
		<PageBase titulo='Dedicaciones del Docente'>
			{isLoadingDedicaciones ? (
				<ComponenteCarga mensaje="Obteniendo las dedicaciones" />
			) : isErrorDedicaciones ? (
				<MensajeError titulo="Error" descripcion="No se pudo obtener las dedicaciones" />
			) : (
				<div className="w-full">
					<div className="hidden sm:block">
						<Tabla
							columnas={columnas}
							data={dedicaciones || []}
							columnasFijas={false}
							// funcionAgregado={handleAgregar}
						/>
					</div>
					<div className="sm:hidden">
						<Listado
							data={dedicaciones || []}
							dataRender={(dedicacion) => {
								return (
									<Card key={dedicacion.id} className="justify-between px-2">
										<Titulo>{dedicacion.nombre}</Titulo>
										{esAdmin && (
											<div className="flex flex-row gap-2">
												<BotonBase
													variant="eliminar"
													onClick={() => handleEliminar(dedicacion)}
												/>
												<BotonBase variant="editar" onClick={() => handleEditar(dedicacion.id)} />
											</div>
										)}
									</Card>
								)
							}}
							// onClick={handleAgregar}
							mensajeSinDatos="No hay dedicaciones cargadas"
						/>
					</div>
				</div>
			)}
		</PageBase>
	)
}
