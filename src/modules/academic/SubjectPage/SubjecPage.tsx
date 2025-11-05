import PageBase from "@components/PageBase/PageBase";
import asignaturas from "@data/asignaturas";
import { Tabla } from "@components/Tabla/Tabla";
import { ColumnDef } from "@tanstack/react-table";
import TituloTabla from "@components/Tabla/TituloTabla";
import AccionTabla from "@components/Tabla/AccionTabla";
import Asignatura from "@globalTypes/asignatura";

export default function SubjectPage() {

    const handleVerDetalle = (codigo: string) => {
        console.log("Asignatura a ver detalle codigo: ", codigo);
    }

    const columns: ColumnDef<Asignatura>[] = [
        {

            accessorKey: "asignatura",
            header: ({ column }) => (
                <TituloTabla column={column} titulo="Asignatura" />
            ),
            cell: ({ row }) => (
                <div className="flex flex-wrap font-medium">
                    {row.getValue("asignatura")}
                </div>
            ),

            size: 1,
        },
        {

            accessorFn: (row) => row.instituto.titulo,
            id: "instituto",
            header: ({ column }) => (
                <TituloTabla column={column} titulo="Instituto" />
            ),
            cell: ({ row }) => (
                <div className="w-full flex flex-wrap font-medium">
                    {row.getValue("instituto")}
                </div>
            ),
        },
        {
    
            accessorFn: (row) => row.carrera.titulo,
            id: "carrera",
            header: ({ column }) => (
                <TituloTabla column={column} titulo="Carrera" />
            ),
            cell: ({ row }) => (
                <div className="w-full flex flex-wrap font-medium">
                    {row.getValue("carrera")}
                </div>
            ),
        },
        {
            accessorKey: "anio",
            header: ({ column }) => (
                <TituloTabla column={column} titulo="Año" />
            ),
        },
        {
            accessorKey: "tipo",
            header: ({ column }) => (
                <TituloTabla column={column} titulo="Tipo de Ciclo" />
            ),
        },
        {
            accessorKey: "etapa",
            header: ({ column }) => (
                <TituloTabla column={column} titulo="Ciclo" />
            ),
        },
        {
            accessorKey: "comision",
            header: ({ column }) => (
                <TituloTabla column={column} titulo="Comision" />
            ),
        },
        {
            id: "actions",
            header: "Acciones",
            cell: ({ row }) => (
                <AccionTabla onClick={() => handleVerDetalle(row.original.codigo)} />
            ),
        }
    ]

    return (
        <PageBase
            titulo="Página de Asignaturas"
            subtitulo="Listado de Asignaturas"
        >
            <Tabla
                columnas={columns}
                data={asignaturas}
                habilitarBuscador={true}
                habilitarPaginado={true}
                classNameCelda="truncate"
            />
        </PageBase>
    )
}