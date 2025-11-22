import PageBase from '@components/PageBase/PageBase'
import { Tabla } from '@components/Tabla/Tabla'
import { ColumnDef } from '@tanstack/react-table'
import TituloTabla from '@components/Tabla/TituloTabla'
import AccionTabla from '@components/Tabla/AccionTabla'
import { GET_TYPE_ASIGNATURA } from '@globalTypes/asignatura'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'
import  {useGetAsignaturas} from '@apis/asignaturas'
import Listado from '@components/Lista/Listado'
import FeedCard from '@components/Tarjetas/FeedCard'
import BotonDetalle from '@components/Botones/BotonDetalle'

export default function SubjectPage() {
	const { data: asignaturas, isLoading: loading, error } = useGetAsignaturas()

	const handleVerDetalle = (codigo: string) => {
		console.log('Asignatura a ver detalle codigo: ', codigo)
	}

	
	const columns: ColumnDef<GET_TYPE_ASIGNATURA>[] = 
		[
			{
				accessorKey: 'nombre',
				header: ({ column }) => <TituloTabla  column={column} titulo="Nombre" />,
			},
			
			{
				accessorKey: 'codigo',
				header: ({ column }) => <TituloTabla column={column} titulo="Código" />,
				size: 1
			},
			
			{
				id: 'actions',
				cell: ({ row }) => (
					<AccionTabla onClick={() => handleVerDetalle(row.original.codigo)} />
				),size: 1
				
			},
		]

	return (
		<PageBase titulo="Asignaturas">
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
								dataRender={(asignaturas) => (
									<FeedCard titulo={asignaturas.nombre} descripcion={asignaturas.codigo}
									actions={
										<BotonDetalle onClick={() => handleVerDetalle(asignaturas.codigo)} />
									}
									/>
								)}
							/>
						)}
					</div>
				</div>     
			)}

			{asignaturas && asignaturas.length === 0 &&
				<p className="text-center">No hay asignaturas</p>
			}				
		</PageBase>
	)
}
