import PageBase from '@components/PageBase/PageBase'
import asignaturas from '@data/asignaturas'
import { Tabla } from '@components/Tabla/Tabla'
import { ColumnDef } from '@tanstack/react-table'
import TituloTabla from '@components/Tabla/TituloTabla'
import AccionTabla from '@components/Tabla/AccionTabla'
import Asignatura from '@globalTypes/asignatura'

export default function SubjectPage() {
	const handleVerDetalle = (codigo: string) => {
		console.log('Asignatura a ver detalle codigo: ', codigo)
	}

	const columns: ColumnDef<Asignatura>[] = [
		{
			accessorKey: 'nombre',
			header: ({ column }) => <TituloTabla column={column} titulo="Nombre" />,
			cell: ({ row }) => (
				<div className="flex flex-wrap font-medium">{row.getValue('nombre')}</div>
			),
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
			id: 'actions',
			header: 'Acciones',
			cell: ({ row }) => (
				<AccionTabla onClick={() => handleVerDetalle(row.original.codigo)} />
			),
		},
	]

	return (
		<PageBase titulo="Página de Asignaturas" subtitulo="Listado de Asignaturas">
			<Tabla
				columnas={columns}
				data={asignaturas}
				habilitarBuscador={true}
				habilitarPaginado={true}
			/>
		</PageBase>
	)
}
