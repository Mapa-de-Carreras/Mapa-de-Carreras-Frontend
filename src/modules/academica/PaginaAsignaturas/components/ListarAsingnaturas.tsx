import useGetAsignaturas from "@apis/asignaturas"
import BotonDetalle from "@components/Botones/BotonDetalle"
import ComponenteCarga from "@components/ComponenteCarga/Componentecarga"
import Listado from "@components/Lista/Listado"
import AccionTabla from "@components/Tabla/AccionTabla"
import { Tabla } from "@components/Tabla/Tabla"
import TituloTabla from "@components/Tabla/TituloTabla"
import FeedCard from "@components/Tarjetas/FeedCard"
import {Asignatura} from "@globalTypes/asignatura"
import { ColumnDef } from "@tanstack/react-table"
import { useNavigate } from "react-router"

export default function ListarAsignaturas() {
    const { data: asignaturas, isLoading: loading, error } = useGetAsignaturas()

    const navigate = useNavigate()
    const handleVerDetalle = (id: number) => {
        console.log('Asignatura a ver detalle id: ', id)
        navigate(`/academica/asignaturas/detalle/${id}`)
    }

    const handleAgregarAsignatura = () => {
        navigate('/academica/asignaturas/agregar')
    }
    
    const columns: ColumnDef<Asignatura>[] = [
            {
                accessorKey: 'nombre',
                header: ({ column }) => <TituloTabla column={column} titulo="Nombre" />,
            },
            {
                accessorKey: 'codigo',
                header: ({ column }) => <TituloTabla column={column} titulo="Código" />,
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

            {!loading && !error && asignaturas && asignaturas.length > 0 && (   
                <div>       
                    <div className="hidden sm:block">
                        <Tabla
                            columnas={columns}
                            data={asignaturas}
                            habilitarBuscador={true}
                            habilitarPaginado={true}
                            funcionAgregado={handleAgregarAsignatura}
                        />
                    </div>

                    <div className="block sm:hidden">
                        <Listado
                            data={asignaturas}
                            dataRender={(asignatura) => (
                                <FeedCard
                                    key={asignatura.id}
                                    titulo={asignatura.nombre}
                                    descripcion={asignatura.codigo}
                                    actions={
                                        <BotonDetalle onClick={() => handleVerDetalle(asignatura.id)} />
                                    }
                                />
                            )}
                            onClick={handleAgregarAsignatura}
                            mensajeSinDatos="No hay asignaturas." 
                        />
                    </div>
                </div>     
            )}
        </div>
    )
}