import { useGetPlanes } from "@apis/planestudio";
import PageBase from "@components/PageBase/PageBase";
import useAuth from "@hooks/useAuth";
import { useNavigate } from "react-router";
import { ColumnDef } from '@tanstack/react-table'
import MensajeError from '@components/Mensajes/MensajeError'
import { Tabla } from '@components/Tabla/Tabla'
import { Loading } from '@components/Templates/Loading'
import Listado from '@components/Lista/Listado'
import FeedCard from '@components/Tarjetas/FeedCard'
import BotonDetalle from '@components/Botones/BotonDetalle'

export default function PaginaPlanEstudio() {
  const { data: planes, isLoading, isError } = useGetPlanes();
  const navigate = useNavigate();
  const { user: usuario } = useAuth();

  // Verifica si el usuario es administrador o coordinador
  const ROLES_PERMITIDOS = ["Administrador", "Coordinador"];
  const esAdmin = usuario?.roles?.some((r) => ROLES_PERMITIDOS.includes(r.nombre)) ?? false;

  const handleAgregarPlan = () => {
    navigate(`/academica/planes/agregar`);
  };

  const handleVerPlan = (id: number) => {
    navigate(`/academica/planes/detalle/`, { state: { id } });
  };

  // Columnas para la tabla
  const columnas: ColumnDef<any>[] = [
    {
      accessorFn: (row) =>
        row.documento
          ? `${row.documento.tipo} ${row.documento.emisor} Nº ${row.documento.numero}/${row.documento.anio}`
          : `Plan #${row.id}`,
      id: "documento",
      header: "Documento",
      size: 2,
    },
    {
      accessorKey: "fecha_inicio",
      header: "Fecha Inicio",
      size: 1,
    },
    {
      accessorFn: (row) => (row.esta_vigente ? "Sí" : "No"),
      id: "vigente",
      header: "Vigente",
      size: 1,
    },
    { id: "actions", header: "Acciones", size: 1 },
  ];

  if (isLoading)
    return <Loading titulo="Buscando Planes" descripcion="Esperando al servidor..." />;

  if (isError)
    return (
      <MensajeError
        titulo="Error al cargar los planes"
        descripcion="No se pudieron obtener los planes de estudio"
      />
    );

  return (
    <PageBase>
      <>
        {/* Vista Desktop */}
        <div className="hidden sm:block">
          <Tabla
            data={planes ?? []}
            columnas={columnas}
            handleAccion={(row) => handleVerPlan(row.id)}
            habilitarBuscador
            funcionAgregado={esAdmin ? handleAgregarPlan : undefined}
          />
        </div>

        {/* Vista Mobile */}
        <div className="block sm:hidden">
          {planes && (
            <Listado
              data={planes}
              dataRender={(p) => (
                <FeedCard
                  key={p.id}
                  titulo={
                    p.documento
                      ? `${p.documento.tipo} ${p.documento.emisor} Nº ${p.documento.numero}/${p.documento.anio}`
                      : `Plan #${p.id}`
                  }
                  descripcion={`Inicio: ${p.fecha_inicio} · Vigente: ${
                    p.esta_vigente ? "Sí" : "No"
                  }`}
                  actions={<BotonDetalle onClick={() => handleVerPlan(p.id)} />}
                />
              )}
              onClick={esAdmin ? handleAgregarPlan : undefined}
            />
          )}
        </div>
      </>
    </PageBase>
  );
}