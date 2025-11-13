import BotonDetalle from "@components/Botones/BotonDetalle"
import ComponenteCarga from "@components/ComponenteCarga/Componentecarga"
import Listado from "@components/Lista/Listado"
import AccionTabla from "@components/Tabla/AccionTabla"
import { Tabla } from "@components/Tabla/Tabla"
import TituloTabla from "@components/Tabla/TituloTabla"
import FeedCard from "@components/Tarjetas/FeedCard"
import {GetCarrera} from "@globalTypes/carrera"
import { ColumnDef } from "@tanstack/react-table"
import { useNavigate } from "react-router"

type ListarCarrerasProps = {
    carreras: GetCarrera[] | undefined
    loading: boolean
    error: any
}

export default function ListarCarreras({ carreras , loading, error } : ListarCarrerasProps) {

    const navigate = useNavigate()
    const handleVerDetalle = (id: number) => {
        console.log('Carreras a ver detalle id: ', id)
        navigate(`/academica/carreras/detalle/${id}`)
    }

    const handleAgregarCarrera = () => {
        navigate('/academica/carreras/agregar')
    }
    
    const columns: ColumnDef<GetCarrera>[] = [
            {
                accessorKey: 'nombre',
                header: ({ column }) => <TituloTabla column={column} titulo="Nombre" />,
            },
            {
                accessorKey: 'nivel',
                header: ({ column }) => <TituloTabla column={column} titulo="Nivel" />,
            },
            {
                id: 'actions',
                header: 'Acciones',
                cell: ({ row }) => (
                    <AccionTabla onClick={() => handleVerDetalle(row.original.id)} />
                ),
            },
        ]

    return (
        <div>
            {loading && <ComponenteCarga />}

            {error && <p className="text-center text-red-500">{error.message}</p>}

            {!loading && !error && carreras && (   
                <div>      
                    
                    <div className="hidden sm:block">
                        <h3 className="text-2xl font-semibold">Carreras</h3>
                        <Tabla
                            columnas={columns}
                            data={carreras}
                            habilitarBuscador={true}
                            habilitarPaginado={true}
                            funcionAgregado={handleAgregarCarrera}
                        />
                    </div>

                    <div className="block sm:hidden">
                        <Listado
                            data={carreras}
                            dataRender={(carrera) => (
                                <FeedCard
                                    key={carrera.id}
                                    titulo={carrera.nombre}
                                    descripcion={carrera.nivel}
                                    actions={
                                        <BotonDetalle onClick={() => handleVerDetalle(carrera.id)} />
                                    }
                                />
                            )
                            
                        }
                            onClick={handleAgregarCarrera}
                            mensajeSinDatos="No hay carreras." 
                        />
                    </div>
                </div>     
            )}
        </div>
    )
}