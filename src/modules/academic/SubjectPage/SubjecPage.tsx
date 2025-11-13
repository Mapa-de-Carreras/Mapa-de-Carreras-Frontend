import PageBase from '@components/PageBase/PageBase'
import { Tabla } from '@components/Tabla/Tabla'
import { ColumnDef } from '@tanstack/react-table'
import TituloTabla from '@components/Tabla/TituloTabla'
import AccionTabla from '@components/Tabla/AccionTabla'
import Asignatura from '@globalTypes/asignatura'
import { useMemo, useCallback } from 'react'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'
import  useGetAsignaturas from '@apis/asignaturas'
import Listado from '@components/Lista/Listado'
import FeedCard from '@components/Tarjetas/FeedCard'
import BotonDetalle from '@components/Botones/BotonDetalle'

export default function SubjectPage() {
	const { data: asignaturas, isLoading: loading, error } = useGetAsignaturas()

	const handleVerDetalle = useCallback((codigo: string) => {
		console.log('Asignatura a ver detalle codigo: ', codigo)
	}, [])

	
	const columns = useMemo<ColumnDef<Asignatura>[]>( 
		() => [
			{
				accessorKey: 'nombre',
				header: ({ column }) => <TituloTabla column={column} titulo="Nombre" />,
			},
			{
				accessorKey: 'codigo',
				header: ({ column }) => <TituloTabla column={column} titulo="Código" />,
			},
			{
				accessorKey: 'cuatrimestre',
				header: ({ column }) => <TituloTabla column={column} titulo="Cuatrimestre" />,
			},
			{
				accessorKey: 'tipo_duracion',
				header: ({ column }) => <TituloTabla column={column} titulo="Duración" />,
			},
			{
				accessorKey: 'tipo_asignatura',
				header: ({ column }) => <TituloTabla column={column} titulo="Tipo" />,
			},
			{
				accessorKey: 'horas_semanales',
				header: ({ column }) => <TituloTabla column={column} titulo="Hs. Semanales" />,
			},
			{
				accessorKey: 'horas_totales',
				header: ({ column }) => <TituloTabla column={column} titulo="Hs. Totales" />,
			},
			{
				id: 'actions',
				header: 'Acciones',
				cell: ({ row }) => (
					<AccionTabla onClick={() => handleVerDetalle(row.original.codigo)} />
				),
			},
		],
		[handleVerDetalle]
	)

	return (
		<PageBase titulo="Página de Asignaturas" subtitulo="Listado de Asignaturas">
			{loading && <ComponenteCarga />}

			{error && <p className="text-center text-red-500">{error.message}</p>}

			{asignaturas && asignaturas.length > 0 && (   
				<div>       
					<div className="hidden sm:block">
						<Tabla
							columnas={columns}
							data={asignaturas}
							habilitarBuscador={true}
							habilitarPaginado={true}
						/>
					</div>
					<div className="block sm:hidden">
						{asignaturas && (
							<Listado
								data={asignaturas}
								orderData={asignaturas}
								orderKey={(asignaturas) => asignaturas.codigo}
								compareTo={(asignaturas) => true}
								dataRender={(asignaturas) => (
									<FeedCard titulo={asignaturas.nombre} descripcion={asignaturas.codigo}
									actions={
										<BotonDetalle onClick={() => handleVerDetalle(asignaturas.codigo)} />
									}
									/>
								)}
								mensajeSinDatos="No hay institutos."
							/>
						)}
					</div>
				</div>     
			)}

			{asignaturas && asignaturas.length === 0 &&
				<p className="text-center">No hay institutos</p>
			}				
		</PageBase>
	)
}
