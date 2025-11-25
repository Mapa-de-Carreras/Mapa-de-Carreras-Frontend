import { useGetPlanesAsignatura } from "@apis/planasignatura";
import BotonDetalle from "@components/Botones/BotonDetalle";
import ComponenteCarga from "@components/ComponenteCarga/Componentecarga";
import Listado from "@components/Lista/Listado";
import PageBase from "@components/PageBase/PageBase";
import AccionTabla from "@components/Tabla/AccionTabla";
import { Tabla } from "@components/Tabla/Tabla";
import TituloTabla from "@components/Tabla/TituloTabla";
import FeedCard from "@components/Tarjetas/FeedCard";
import { IDocente } from "@globalTypes/docentes";
import { IPlanAsignatura } from "@globalTypes/planasignatura";
import useRol from "@hooks/useRol";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router";

export default function PaginaPlanesAsignatura() {
  const { data: planesAsignatura, isLoading, error } = useGetPlanesAsignatura();
  const navigate = useNavigate();

   const isAdmin = useRol("Administrador");
   const isCoordinador = useRol("Coordinador");

  const handleAgregarPlan = () => {
    navigate(`/academica/planes-asignatura/agregar/`);
  };

  const handleVerPlan = (id: number) => {
    navigate(`/academica/planes-asignatura/detalle/${id}`);
  };

  const planesActivos = planesAsignatura ?? [];

  const columns: ColumnDef<IPlanAsignatura>[] = [
    {
      id: "descripcion",
      accessorFn: (row) => row.descripcion,
      header: ({ column }) => <TituloTabla column={column} titulo="Nombre" />,
    },
    {
      id: "anio",
      accessorFn: (row) => row.anio ?? "-",
      header: ({ column }) => <TituloTabla column={column} titulo="Año" />,
    },
    {
      id: "horas_totales",
      accessorFn: (row) => row.horas_totales ?? "-",
      header: ({ column }) => <TituloTabla column={column} titulo="Horas totales" />,
    },
    {
      id: "actions",
      header: "Detalle",
      cell: ({ row }) => <AccionTabla onClick={() => handleVerPlan(row.original.id)} />,
    },
  ];

  return (
    <PageBase titulo="Listado de Planes de Asignatura">
      {isLoading && <ComponenteCarga />}
      {error && <p className="text-center text-red-500">Error al cargar los planes de asignatura.</p>}

      {planesActivos && planesActivos.length > 0 && (
        <div>
          <div className="hidden sm:block">
            <Tabla
              columnas={columns}
              data={planesActivos}
              habilitarBuscador={true}
              habilitarPaginado={true}
              funcionAgregado={isAdmin || isCoordinador ? handleAgregarPlan : undefined}
            />
          </div>
          <div className="block sm:hidden">
            <Listado
              data={planesActivos}
              orderData={planesActivos}
              orderKey={(p) => p.descripcion}
              dataRender={(p) => (
                <FeedCard
                  titulo={p.descripcion}
                  descripcion={`Año: ${p.anio ?? "-"}`}
                  actions={
                    <BotonDetalle onClick={() => handleVerPlan(p.id)} />
                  }
                />
              )}
              onClick={isAdmin ? handleAgregarPlan : undefined}
            />
          </div>
        </div>
      )}

      {planesActivos && planesActivos.length === 0 && (
        <p className="text-center">No hay planes de asignatura activos.</p>
      )}
    </PageBase>
  );
}