import { useDeleteDocumento, useGetDocumento } from "@apis/documentos";
import PageBase from "@components/PageBase/PageBase";
import { useNavigate, useParams } from "react-router";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import BotonBase from "@components/Botones/BotonBase";
import BotonGenerico from "@components/Botones/BotonGenerico";
import MensajeError from "@components/Mensajes/MensajeError";
import useAuth from "@hooks/useAuth";

export default function DetalleDocumentos() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: documento, isLoading, error } = useGetDocumento(Number(id));
  const { user: usuario } = useAuth();
  const ROLES_PERMITIDOS = ["Administrador", "Coordinador"];
  const esAdmin =
    usuario?.roles?.some((r) => ROLES_PERMITIDOS.includes(r.nombre)) ?? false;
  const { deleteDocumento, loading, success } = useDeleteDocumento();

   const handleEliminar = async () => {
    console.log("Eliminar documento");
    await deleteDocumento(Number(id));
    navigate("/documentos/gestion");
  };

  const descargarArchivo = () => {
    if (documento?.archivo_url) {
      window.open(documento.archivo_url, "_blank");
    }
  };

  return (
    <PageBase titulo="Detalle del Documento" subtitulo="Información completa">
      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 md:px-10 lg:px-20 py-10">

        <Card className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-300 dark:border-gray-700 p-6 md:p-8">

          {isLoading && <p className="text-center">Cargando...</p>}
          {error && (
            <MensajeError
              titulo="Error"
              descripcion="No se pudo cargar el documento"
            />
          )}

          {documento && (
            <>
            <CardHeader className="text-center">
                 <span
                    className="icon-[mdi--file-document-outline] text-[60px] mb-3 block mx-auto text-gray-900 dark:text-gray-100"
                />

                <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {`${documento.tipo} ${documento.emisor} Nº ${documento.numero}/${documento.anio}`}
                </CardTitle>

                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Creado: {new Date(documento.created_at).toLocaleDateString()}
                </p>
              </CardHeader>

              <CardContent className="flex flex-col gap-4 mt-6">

                {/* Mostrar botón solo si existe archivo */}
                <div className="flex justify-center">
                  {documento.archivo_url ? (
                    <BotonGenerico
                      texto="Descargar PDF"
                      color="#47ADA4"
                      icono={<span className="icon-[mdi--download] text-xl" />}
                      onClick={descargarArchivo}
                    />
                  ) : (
                    <p className="text-gray-500 italic">
                      No hay archivo disponible para descargar
                    </p>
                  )}
                </div>

                {esAdmin && (
                  <div className="flex justify-center gap-4 mt-6">
                    <BotonBase variant="eliminar" onClick={handleEliminar} />
                  </div>
                )}

                <div className="flex justify-center mt-6">
                  <BotonGenerico
                    texto="Volver"
                    color="#49454F"
                    icono={<span className="icon-[mdi--arrow-left] text-xl" />}
                    onClick={() => navigate(-1)}
                  />
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </PageBase>
  );
}