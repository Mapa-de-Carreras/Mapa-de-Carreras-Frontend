import PageBase from '@components/PageBase/PageBase'
import { Tabla } from '@components/Tabla/Tabla'
import { ColumnDef } from '@tanstack/react-table'
import TituloTabla from '@components/Tabla/TituloTabla'
import AccionTabla from '@components/Tabla/AccionTabla'
import Asignatura from '@globalTypes/asignatura'
import { useMemo, useCallback } from 'react'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'
import  useGetAsignaturas from '@apis/asignaturas'

export default function SubjectPage() {
	const { data: asignaturas, loading, error } = useGetAsignaturas()

	const handleVerDetalle = useCallback((codigo: string) => {
		console.log('Asignatura a ver detalle codigo: ', codigo)
	}, [])

	const columns = useMemo<ColumnDef<Asignatura>[]>( //luego la IA me recomendo memoizarlo
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

			{!loading &&
				!error &&
				(asignaturas ? (
					<Tabla
						columnas={columns}
						data={asignaturas}
						habilitarBuscador={true}
						habilitarPaginado={true}
					/>
				) : (
					<p className="text-center text-gray-500">No se encontraron asignaturas.</p>
				))}
		</PageBase>
	)
}
