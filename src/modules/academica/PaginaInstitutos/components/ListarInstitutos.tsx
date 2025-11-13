import useGetInstitutos from "@apis/intitutos"
import BotonDetalle from "@components/Botones/BotonDetalle"
import ComponenteCarga from "@components/ComponenteCarga/Componentecarga"
import Listado from "@components/Lista/Listado"
import AccionTabla from "@components/Tabla/AccionTabla"
import { Tabla } from "@components/Tabla/Tabla"
import TituloTabla from "@components/Tabla/TituloTabla"
import FeedCard from "@components/Tarjetas/FeedCard"
import {Instituto} from "@globalTypes/instituto"
import { ColumnDef } from "@tanstack/react-table"
import { useNavigate } from "react-router"
    
export default function ListarInstitutos () {
    const {data: institutos, isLoading: loading, error} = useGetInstitutos()
    const navigate = useNavigate()

    const handleVerDetalle = (id: number) => {
		navigate(`/academica/institutos/detalle/${id}`)
    }

    const handlerAgregarInstituto = () => {
        navigate('/academica/institutos/agregar')
    }

    const columns : ColumnDef<Instituto>[] = [
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

            {!loading && !error && institutos && institutos.length > 0 && (   
                <div>       
                    <div className="hidden sm:block">
                        <Tabla
                            columnas={columns}
                            data={institutos}
                            habilitarBuscador={true}
                            habilitarPaginado={true}
                            funcionAgregado={handlerAgregarInstituto}
                        />
                    </div>
                    <div className="block sm:hidden">
                        <Listado
                            data={institutos}
                            dataRender={(institutos) => (
                                <FeedCard 
                                    titulo={institutos.nombre} 
                                    descripcion={institutos.codigo}
                                    actions={
                                        <BotonDetalle onClick={() => handleVerDetalle(institutos.id)} />
                                    }
                                />
                            )}
                            onClick={handlerAgregarInstituto}
                            orderData={institutos}
                            mensajeSinDatos="No hay institutos."
                        />
                    </div>
                </div>     
            )}
        </div>
    )
}