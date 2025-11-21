import { useGetDesignaciones } from "@apis/designaciones";
import PageBase from "@components/PageBase/PageBase";
import { useNavigate } from "react-router";
import { ColumnDef } from "@tanstack/react-table";
import MensajeError from "@components/Mensajes/MensajeError";
import { Tabla } from "@components/Tabla/Tabla";
import { Loading } from "@components/Templates/Loading";
import Listado from "@components/Lista/Listado";
import FeedCard from "@components/Tarjetas/FeedCard";
import BotonDetalle from "@components/Botones/BotonDetalle";
import { IDesignacion } from "../../../src/shared/types/designaciones";
import useAuth from "@hooks/useAuth";

export default function PaginaDesignaciones() {
  const { data: designaciones, isLoading, isError } = useGetDesignaciones();
  const navigate = useNavigate();
  const { user: usuario } = useAuth();
  
  // Verifica si el usuario es administrador
  const esAdmin = usuario?.roles?.some((r) => r.nombre === "Administrador") ?? false;
  

  const handleVerDetalle = (row: IDesignacion) => {
    navigate(`/designaciones/detalle/${row.id}`);
  };

  const columnas: ColumnDef<IDesignacion>[] = [
    {
      accessorFn: (row) =>
        `${row.docente.usuario.first_name} ${row.docente.usuario.last_name}`,
      id: "docente",
      header: "Docente",
      size: 1,
    },
    {
      accessorFn: (row) => row.tipo_designacion,
      id: "tipo",
      header: "Tipo",
      size: 1,
    },
    {
      accessorFn: (row) => row.cargo.nombre,
      id: "cargo",
      header: "Cargo",
      size: 1,
    },
    {
      accessorFn: (row) => row.fecha_inicio.split("T")[0],
      id: "inicio",
      header: "Inicio",
      size: 1,
    },
    {
      accessorFn: (row) => (row.fecha_fin ? row.fecha_fin.split("T")[0] : "-"),
      id: "fin",
      header: "Fin",
      size: 1,
    },
    {
      accessorFn: (row) => (row.activo ? "Activa" : "Inactiva"),
      id: "estado",
      header: "Estado",
      size: 1,
    },
    { id: "actions", header: "Acciones", size: 1 },
  ];

  return (
    <PageBase titulo="Designaciones" subtitulo="Listado general de designaciones">
 
      {isLoading ? (
        <Loading
          titulo="Buscando Designaciones"
          descripcion="Esperando al servidor de la UNTDF..."
        />
      ) : isError ? (
        <MensajeError titulo="Error" descripcion="No se pudieron cargar las designaciones." />
      ) : (
        <>

          <div className="hidden sm:block">
            <Tabla
              data={designaciones || []}
              columnas={columnas}
              handleAccion={handleVerDetalle}
              habilitarBuscador
          //    funcionAgregado={esAdmin ? handleAgregarPlan : undefined}
            />
          </div>

          {/*  Listado en mobile */}
          <div className="block sm:hidden">
            {designaciones && (
              <Listado
                data={designaciones}
                dataRender={(designacion) => (
                  <FeedCard
                    key={designacion.id}
                    titulo={`${designacion.docente.usuario.first_name} ${designacion.docente.usuario.last_name}`}
                    descripcion={`${designacion.tipo_designacion} — ${designacion.cargo.nombre}`}
                    actions={
                      <BotonDetalle onClick={() => handleVerDetalle(designacion)} />
                    }
                  />
                )}
              />
            )}
          </div>
        </>
      )}
    </PageBase>
  );
}
