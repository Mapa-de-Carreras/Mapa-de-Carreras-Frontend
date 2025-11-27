import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Card, CardHeader, CardTitle, CardContent } from "@components/ui/card";
import PageBase from "@components/PageBase/PageBase";
import BotonGenerico from "@components/Botones/BotonGenerico";
import BotonBase from "@components/Botones/BotonBase";
import MensajeError from "@components/Mensajes/MensajeError";
import { useGetDocumento } from "@apis/documentos";
import { URL_API } from "@apis/constantes";
import ModalGenerico from "@components/Modal/ModalGenerico";

export default function EditarDocumento() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [errorEditar, setErrorEditar] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const { data: documento, isLoading } = useGetDocumento(Number(id));

  // FORM STATE
  const [form, setForm] = useState({
    tipo: "",
    emisor: "",
    numero: "",
    anio: "",
    archivo: null as File | null,
  });

  // CARGAR DATOS INICIALES
  useEffect(() => {
    if (documento) {
      setForm({
        tipo: documento.tipo,
        emisor: documento.emisor,
        numero: String(documento.numero),
        anio: String(documento.anio),
        archivo: null,
      });
    }
  }, [documento]);

  // CAMBIOS DE INPUTS
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setForm((prev) => ({ ...prev, archivo: file }));
  };


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const token = localStorage.getItem("access_token");
  const formData = new FormData();

  formData.append("tipo", form.tipo);
  formData.append("emisor", form.emisor);
  formData.append("numero", form.numero);
  formData.append("anio", form.anio);

  // Si seleccionó un archivo → lo manda
  if (form.archivo) {
    formData.append("archivo", form.archivo);
  } 
  // Si NO seleccionó archivo → NO mandar "archivo": null
  // Django mantiene el archivo actual automáticamente
 
  try {
    const res = await fetch(`${URL_API}documentos/${id}/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const msg = await res.json();
      setErrorEditar(`No se pudo editar el documento. ${JSON.stringify(msg)}`);
      return;
    }

    setErrorEditar(null);
    setMostrarModal(true);

  } catch (err) {
    console.error(err);
    setErrorEditar("Ocurrió un error al comunicarse con el servidor.");
  }
};
  const handleCerrarModal = () => {
    setMostrarModal(false);
    navigate("/documentos/gestion");
  };

  return (
    <PageBase titulo="Editar Documento" subtitulo="Modificar información existente">
      <div className="flex flex-col items-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 md:px-10 lg:px-20 py-10">
        
        <Card className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-300 dark:border-gray-700 p-6 md:p-8">

          {isLoading && <p className="text-center">Cargando...</p>}
          {errorEditar && <MensajeError titulo="Error" descripcion={errorEditar} />}

          {documento && (
            <>
              <CardHeader className="text-center">
                <span className="icon-[mdi--file-document-edit-outline] text-[60px] mb-3 block mx-auto text-gray-900 dark:text-gray-100" />

                <CardTitle className="text-2xl sm:text-3xl font-bold">
                  Editar Documento
                </CardTitle>
              </CardHeader>

              <CardContent className="mt-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                  <div>
                    <label className="font-semibold">Tipo</label>
                    <input
                      type="text"
                      name="tipo"
                      value={form.tipo}
                      onChange={handleChange}
                      className="w-full p-2 rounded border bg-gray-50 dark:bg-gray-700"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-semibold">Emisor</label>
                    <input
                      type="text"
                      name="emisor"
                      value={form.emisor}
                      onChange={handleChange}
                      className="w-full p-2 rounded border bg-gray-50 dark:bg-gray-700"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold">Número</label>
                      <input
                        type="text"
                        name="numero"
                        value={form.numero}
                        onChange={handleChange}
                        className="w-full p-2 rounded border bg-gray-50 dark:bg-gray-700"
                        required
                      />
                    </div>

                    <div>
                      <label className="font-semibold">Año</label>
                      <input
                        type="text"
                        name="anio"
                        value={form.anio}
                        onChange={handleChange}
                        className="w-full p-2 rounded border bg-gray-50 dark:bg-gray-700"
                        required
                      />
                    </div>
                  </div>

                 <div className="flex flex-col gap-2">
  <label className="font-semibold">Archivo PDF (opcional)</label>

        <label className="cursor-pointer inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow">
            <span className="icon-[mdi--file-upload-outline] text-xl" />
            Seleccionar archivo PDF
            <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
            />
        </label>

    
        {form.archivo && (
            <p className="text-xs text-gray-600 dark:text-gray-300">
            Archivo seleccionado: <span className="font-medium">{form.archivo.name}</span>
            </p>
        )}

        {/* PDF actual */}
        {documento.archivo_url && !form.archivo && (
            <p className="text-xs mt-1 text-gray-500">
            Archivo actual:
            <a
                href={documento.archivo_url}
                target="_blank"
                className="text-blue-600 ml-1 underline"
            >
                Ver PDF
            </a>
            </p>
        )}
        </div>

                  <div className="flex justify-center gap-4 mt-6">
                    <BotonGenerico
                      texto="Guardar Cambios"
                      color="#47ADA4"
                      icono={<span className="icon-[mdi--content-save] text-xl" />}
                      type="submit"
                    />

                    <BotonBase
                      variant="cancelar"
                      onClick={() => navigate(-1)}
                    />
                  </div>
                </form>
              </CardContent>
            </>
          )}
        </Card>
      </div>

      <ModalGenerico
        abierto={mostrarModal}
        onClose={handleCerrarModal}
        icono={<span className="icon-[mdi--check-bold] text-green-600 text-5xl" />}
        titulo="Éxito"
        mensaje="Documento editado correctamente."
        textoBoton="Aceptar"
        colorBoton="#47ADA4"
        onConfirmar={handleCerrarModal}
      />
    </PageBase>
  );
}
