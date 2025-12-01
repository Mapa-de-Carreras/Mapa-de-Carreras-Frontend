import PageBase from "@components/PageBase/PageBase";
import useAuth from "@hooks/useAuth";
import { useNavigate } from "react-router";
import { ColumnDef } from "@tanstack/react-table";
import MensajeError from '@components/Mensajes/MensajeError';
import { Tabla } from '@components/Tabla/Tabla';
import { Loading } from '@components/Templates/Loading';
import Listado from '@components/Lista/Listado';
import FeedCard from '@components/Tarjetas/FeedCard';
import BotonDetalle from '@components/Botones/BotonDetalle';
import { useGetComisiones } from "@apis/comisiones";
import { Comision } from "@globalTypes/comisiones";

export default function PaginaComisiones() {
  const { data: comisiones, isLoading, isError } = useGetComisiones();
  const navigate = useNavigate();
  const { user: usuario } = useAuth();
  const ROLES_PERMITIDOS = ["Administrador", "Coordinador"];
  const esAdmin = usuario?.roles?.some((r) => ROLES_PERMITIDOS.includes(r.nombre)) ?? false;

  const handleAgregar = () => {
    navigate(`/academica/comisiones/agregar`);
  };

  const handleVer = (id: number) => {
    navigate(`/academica/comisiones/detalle/${id}`);
  };


  const columnas: ColumnDef<Comision>[] = [
    {
      accessorKey: "nombre",
      header: "Nombre",
      size: 2,
    },
    {
      accessorKey: "plan_asignatura_str",
      header: "Plan / Asignatura",
      size: 4,
    },
    {
      accessorKey: "turno",
      header: "Turno",
      size: 1,
    },
    {
      accessorFn: (row) => (row.promocionable ? "Sí" : "No"),
      id: "promocionable",
      header: "Promocionable",
      size: 1,
    },
    {
      accessorFn: (row) => (row.activo ? "Sí" : "No"),
      id: "activo",
      header: "Activo",
      size: 1,
    },
    { id: "actions", header: "Acciones", size: 1 },
  ];

  if (isLoading)
    return (
      <Loading
        titulo="Buscando comisiones"
        descripcion="Esperando al servidor..."
      />
    );

  if (isError)
    return (
      <MensajeError
        titulo="Error al cargar las comisiones"
        descripcion="No se pudieron obtener las comisiones"
      />
    );

  return (
    <PageBase titulo="Comisiones" subtitulo="Listado general de comisiones">
      <>
        {/* Desktop */}
        <div className="hidden sm:block">
          <Tabla
            data={comisiones ?? []}
            columnas={columnas}
            handleAccion={(row) => handleVer(row.id)}
            habilitarBuscador
            funcionAgregado={esAdmin ? handleAgregar : undefined}
          />
        </div>

        {/* Mobile */}
        <div className="block sm:hidden">
          {comisiones && (
            <Listado
              data={comisiones}
              dataRender={(c) => (
                <FeedCard
                  key={c.id}
                  titulo={c.nombre}
                  descripcion={`Turno: ${c.turno} · Activo: ${
                    c.activo ? "Sí" : "No"
                  }`}
                  actions={<BotonDetalle onClick={() => handleVer(c.id)} />}
                />
              )}
              onClick={esAdmin ? handleAgregar : undefined}
              enableSearch={true}
              searchFields={["nombre", "plan_asignatura_str"]}
              searchPlaceholder="Buscar comisiones por nombre o por plan / asignatura"
            />
          )}
        </div>
      </>
    </PageBase>
  );
}