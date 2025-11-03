import PageBase from "@components/PageBase/PageBase";
import carreras from "@data/carreras";
import { Tabla } from "@components/Tabla/Tabla";
import { ColumnDef } from "@tanstack/react-table";
import TituloTabla from "@components/Tabla/TituloTabla";
import AccionTabla from "@components/Tabla/AccionTabla";
import Carrera from "@globalTypes/carrera";
import BotonBase from "@components/Botones/BotonBase";

export default function DegreePage() {

    const columns: ColumnDef<Carrera>[] = [
        {
            accessorFn: (row) => row.instituto.titulo,
            id: "instituto",
            header: ({ column }) => (
                <TituloTabla column={column} titulo="Instituto" />
            ),
            cell: ({ row }) => (
                <div className="text-center font-medium">
                    {row.getValue("instituto")}
                </div>
            ),
            size: 1,
        },
        {
            accessorKey: "titulo",
            header: ({ column }) => (
                <TituloTabla column={column} titulo="Carrera" />
            ),
            cell: ({ row }) => (
                <div className="flex flex-wrap">
                    {row.getValue("titulo")}
                </div>
            ),
            size: 3,
        },
        {
            accessorKey: "coordinador",
            header: ({ column }) => (
                <TituloTabla column={column} titulo="Coordinador" />
            ),
            size: 2,
        },
        {
            id: "actions",
            header: "Acciones",
            cell: () => <AccionTabla onClick={() => { }} />,
            size: 1,
        },
    ]

    return (
        <PageBase
            titulo="Página de Carreras"
            subtitulo="Listado de carreras ordenadas por instituto"
        >
            <Tabla
                columnas={columns}
                data={carreras}
                habilitarBuscador
                habilitarPaginado
                columnasFijas={false}
                funcionAgregado={() => {}}
            />
        </PageBase>
    )
}