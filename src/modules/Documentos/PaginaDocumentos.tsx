import { useGetDocumentos } from "@apis/documentos";
import PageBase from "@components/PageBase/PageBase";
import { Tabla } from "@components/Tabla/Tabla";
import BotonDetalle from "@components/Botones/BotonDetalle";
import useAuth from "@hooks/useAuth";
import { useNavigate } from "react-router";

export default function PaginaDocumentos() {
  const { data: documentos, isLoading, error } = useGetDocumentos();
  const { user: usuario } = useAuth();
  const ROLES_PERMITIDOS = ["Administrador", "Coordinador"];
  const esAdmin = usuario?.roles?.some((r) => ROLES_PERMITIDOS.includes(r.nombre)) ?? false;
  const navigate = useNavigate();
  
  const columnas = [
    {
      header: "Documento",
      accessorKey: "nombreCompleto",
    },
    {
      header: "Año",
      accessorKey: "anio",
    },
    {
      header: "Emitido por",
      accessorKey: "emisor",
    },
    {
      header: "Acciones",
      accessorKey: "acciones",
      size: 1 ,
      cell: ({ row }: any) => (
        <BotonDetalle onClick={() => handleVerDocumento(row.original.id)} />
      ),
    },
  ];

  const documentosFormateados =
    documentos?.map((d) => ({
      ...d,
      nombreCompleto: `${d.tipo} ${d.emisor} Nº ${d.numero}/${d.anio}`,
    })) ?? [];

  const handleVerDocumento = (id: number) => {
    console.log("Ver documento", id);
    navigate(`/documentos/detalle/${id}`);
  };

    const handleAgregarDocumento = () => {
        console.log("Agregar documento");
         navigate(`/documentos/agregar/`);
  };

  return (
    <PageBase titulo="Documentos">
      <>
        {/* Vista Desktop */}
        <div className="hidden sm:block">
          <Tabla
            data={documentosFormateados}
            columnas={columnas}
            handleAccion={(row) => row.id && handleVerDocumento(row.id)}
            habilitarBuscador
            funcionAgregado={esAdmin ? handleAgregarDocumento : undefined}
          />
        </div>

        {/* Vista Mobile */}
        <div className="block sm:hidden">
          {documentosFormateados.map((doc) => (
            <div
              key={doc.id}
              className="p-4 border rounded-lg shadow mb-3 bg-white"
            >
              <p className="font-semibold">{doc.nombreCompleto}</p>
              <p className="text-sm">Año: {doc.anio}</p>
              <p className="text-sm">Emisor: {doc.emisor}</p>

              <div className="mt-2">
                <BotonDetalle
                  onClick={() => doc.id && handleVerDocumento(doc.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </>
    </PageBase>
  );
}