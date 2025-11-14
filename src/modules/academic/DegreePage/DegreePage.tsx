import PageBase from '@components/PageBase/PageBase'
import { Tabla } from '@components/Tabla/Tabla'
import { ColumnDef } from '@tanstack/react-table'
import TituloTabla from '@components/Tabla/TituloTabla'
import AccionTabla from '@components/Tabla/AccionTabla'
import { useNavigate } from 'react-router'
import Listado from '@components/Lista/Listado'
import institutos from '@data/institutos'

// --- 2. Importa el hook y los tipos correctos ---
import useGetCarreras from '@apis/carreras'
import { CarreraListItem } from '@globalTypes/carrera' // El tipo que devuelve la API
import BotonDetalle from '@components/Botones/BotonDetalle'
import FeedCard from '@components/Tarjetas/FeedCard'
import ComponenteCarga from '@components/ComponenteCarga/Componentecarga'

export default function DegreePage() {
    const navigate = useNavigate()

    const { data: carreras, isLoading: loading, error } = useGetCarreras()

    const handleVerDetalle = (id: string | number) => {//lo hago asi porque la posta no se que será el id
        navigate(`/academica/carreras/detalle/${Number(id)}`)
    }

    const columns : ColumnDef<CarreraListItem>[] = 
		[
            {
                accessorFn: (row) => row.instituto?.codigo || '—',
                id: 'instituto',
                header: ({ column }) => <TituloTabla column={column} titulo="Instituto" />,
                cell: ({ row }) => (
                    <div className="text-center font-medium">{row.getValue('instituto')}</div>
                ),
                size: 1,
            },
            {
                accessorKey: 'nombre',
                header: ({ column }) => <TituloTabla column={column} titulo="Carrera" />,
                cell: ({ row }) => (
                    <div className="flex flex-wrap">
                        {row.getValue('nombre')}
                    </div>
                ),
                size: 3,
            },
            {
                id: 'actions',
                header: 'Acciones',
                cell: ({ row }) => <AccionTabla onClick={() => handleVerDetalle(row.original.id)} />,
                size: 1,
            },
        ]

	function handleAgregar(): void {
		navigate("/academica/carreras/agregar")
	}

    return (
        <PageBase titulo="Carreras">
            
  
            {loading && <ComponenteCarga mensaje="Cargando carreras..." />}
            

            {error && <p className="text-center text-red-500">{error.message}</p>}
            {
				!loading && !error && carreras && institutos && (
				<div>
					<div className="hidden sm:block"> 
						<Tabla
							columnas={columns}
							data={carreras} 
							habilitarBuscador
							habilitarPaginado
							columnasFijas={false}
							funcionAgregado={handleAgregar}
						/>
					</div>
					<div className="block sm:hidden">
						{carreras && institutos && (
							<Listado
								data={carreras} 
								orderData={institutos}
								dataRender={(carrera) => (
									<FeedCard
										titulo={carrera.nombre}
										descripcion={carrera.codigo}
										actions={
											<BotonDetalle
												onClick={() => handleVerDetalle(carrera.id)}
											/>
										}
									/>
								)}
								onClick={handleAgregar}
							/>
						)}
					</div>				
				</div>
				)
			}
			
			{
				carreras && carreras.length === 0 && (
					<p className="text-center text-gray-500">No se encontraron carreras.</p>
				)
			}

        </PageBase>
    )
}