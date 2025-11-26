import { useGetDocentes } from "@apis/docentes";
import BotonDetalle from "@components/Botones/BotonDetalle";
import ComponenteCarga from "@components/ComponenteCarga/Componentecarga";
import Listado from "@components/Lista/Listado";
import PageBase from "@components/PageBase/PageBase";
import AccionTabla from "@components/Tabla/AccionTabla";
import { Tabla } from "@components/Tabla/Tabla";
import TituloTabla from "@components/Tabla/TituloTabla";
import FeedCard from "@components/Tarjetas/FeedCard";
import { IDocente } from "@globalTypes/docentes";
import useAuth from "@hooks/useAuth";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router";

export default function PaginaDocentes() {
  const { data: docentes, isLoading, error } = useGetDocentes();
  const navigate = useNavigate();

  const { user: usuario } = useAuth();
  const ROLES_PERMITIDOS = ["Administrador", "Coordinador"];
  const esAdmin = usuario?.roles?.some((r) => ROLES_PERMITIDOS.includes(r.nombre)) ?? false;
   console.log("Es admin ",esAdmin);
const handleAgregarDocente = () => {
    navigate(`/docentes/agregar/`);
};

const handleVerDocente = (id: number) => {
    navigate(`/docentes/detalle/${id}`);
};

const docentesActivos = docentes?.filter((d) => d.activo === true) ?? [];

const columns : ColumnDef<IDocente>[] = [
    {
        id: 'nombre',
        accessorFn: (row) => `${row.usuario.first_name} ${row.usuario.last_name}`,
        header: ({ column }) => <TituloTabla column={column} titulo="Nombre" />,
    },
    {
        id: 'email',
        accessorFn: (row) => row.usuario.email,
        header: ({ column }) => <TituloTabla column={column} titulo="Email" />,
    },
    {
        id: 'legajo',
        accessorFn: (row) => row.usuario.legajo,
        header: ({ column }) => <TituloTabla column={column} titulo="Legajo" />,
    },
    {
        id: 'actions',
        header: 'Detalle',
        cell: ({ row }) => <AccionTabla onClick={() => handleVerDocente(row.original.usuario.id)} />,
    },
]

return (
    <PageBase titulo="Listado de Docentes">
        {isLoading && <ComponenteCarga />}
        {error && <p className="text-center text-red-500">Error al cargar los docentes.</p>}

        {docentesActivos && docentesActivos.length > 0 && (
            <div>
                <div className="hidden sm:block">
                    <Tabla
                        columnas={columns}
                        data={docentesActivos}
                        habilitarBuscador={true}
                        habilitarPaginado={true}
                        funcionAgregado={esAdmin ? handleAgregarDocente : undefined}
                    />
                </div>
                <div className="block sm:hidden">
                    <Listado
                        data={docentesActivos}
                        orderData={docentesActivos}
                        orderKey={(d) => d.usuario.last_name}
                        dataRender={(d) => (
                            <FeedCard
                                titulo={`${d.usuario.first_name} ${d.usuario.last_name}`}
                                descripcion={d.usuario.email}
                                actions={
                                    <BotonDetalle
                                        onClick={() => handleVerDocente(d.usuario.id)}
                                    />
                                }
                            />
                        )}
                        onClick={esAdmin ? handleAgregarDocente : undefined}
                    />
                </div>
            </div>
        )}

        {docentesActivos && docentesActivos.length === 0 && (
            <p className="text-center">No hay docentes activos.</p>
        )}
    </PageBase>
  );
}
