import { useDeleteCaracter, useGetCaracteres } from '@apis/caracteres'
import BotonBase from '@components/Botones/BotonBase'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'
import Listado from '@components/Lista/Listado'
import MensajeError from '@components/Mensajes/MensajeError'
import PageBase from '@components/PageBase/PageBase'
import { useVentana } from '@components/Providers/VentanaProvider'
import { Tabla } from '@components/Tabla/Tabla'
import Titulo from '@components/Tipografia/Titulo'
import { Card } from '@components/ui/card'
import { Caracter } from '@globalTypes/caracter'
import { extraerMensajeDeError } from '@lib/errores'
import { ColumnDef } from '@tanstack/react-table'
import { useNavigate } from 'react-router'

export default function PaginaCaracteres() {
	// Ventana y Navegación
	const { abrirVentana, cerrarVentana } = useVentana()
	const navigate = useNavigate()
	
	// Obtiene los datos de los Caracteres
	const {
		data: caracteres,
		isError: isErrorCaracteres,
		isLoading: isLoadingCaracteres,
	} = useGetCaracteres()

	// Configuación para eliminar un Caracter
	const {
		mutate: eliminarCaracter,
		isPending: isLoadingEliminar,
	} = useDeleteCaracter({ queriesToInvalidate: ['useGetCaracteres'] })

	const onConfirmDelete = (caracter: Caracter) => {
		eliminarCaracter(
			{ params: { id: caracter.id } },
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
						descripcion: `El caracter ${caracter.nombre} se eliminó con éxito`,
					}),
			}
		)
	}

	// Funciones de manejo de eventos
	const handleEliminar = (caracter: Caracter) => {
		abrirVentana({
			tipoVentana: 'eliminar',
			onClose: cerrarVentana,
			onConfirm: () => onConfirmDelete(caracter),
			cargando: isLoadingEliminar,
			titulo: 'Eliminar Caracter',
			descripcion: `¿Está seguro de que desea eliminar el caracter ${caracter.nombre}?`,
		});
	}

	const handleEditar = (id: number) => {
		navigate(`/docentes/caracteres/editar/${id}`)
	}

	const handleAgregar = () => {
		navigate('/docentes/caracteres/agregar')
	}

	// Columnas de la tabla
	const columnas: ColumnDef<Caracter>[] = [
		{ accessorKey: 'id', header: 'Codigo', size: 1 },
		{ accessorKey: 'nombre', header: 'Nombre', size: 4 },
		{
			id: 'Acciones',
			header: 'Acciones',
			cell: ({ row }) => (
				<div className="flex flex-row gap-2">
					<BotonBase variant="eliminar" onClick={() => handleEliminar(row.original)} />
					<BotonBase variant="editar" onClick={() => handleEditar(row.original.id)} />
				</div>
			),
			size: 2,
		},
	]

	return (
		<PageBase titulo='Caracteres del Docente'>
			{isLoadingCaracteres ? (
				<ComponenteCarga mensaje="Obteniendo los caracteres" />
			) : isErrorCaracteres ? (
				<MensajeError titulo="Error" descripcion="No se pudo obtener los caracteres" />
			) : (
				<div className="w-full">
					<div className="hidden sm:block">
						<Tabla
							columnas={columnas}
							data={caracteres || []}
							columnasFijas={false}
							funcionAgregado={handleAgregar}
						/>
					</div>
					<div className="sm:hidden">
						<Listado
							data={caracteres || []}
							dataRender={(caracter) => {
								return (
									<Card key={caracter.id} className="justify-between px-2">
										<Titulo>{caracter.nombre}</Titulo>
										<div className="flex flex-row gap-2">
											<BotonBase
												variant="eliminar"
												onClick={() => handleEliminar(caracter)}
											/>
											<BotonBase variant="editar" onClick={() => handleEditar(caracter.id)} />
										</div>
									</Card>
								)
							}}
							onClick={handleAgregar}
							mensajeSinDatos="No hay caracteres cargados"
						/>
					</div>
				</div>
			)}
		</PageBase>
	)
}
