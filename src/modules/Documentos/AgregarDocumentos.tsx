import { useState } from "react";
import PageBase from "@components/PageBase/PageBase";
import { Card} from '@components/ui/card'
import MensajeError from "@components/Mensajes/MensajeError";
import { URL_API } from "@apis/constantes";
import BotonGenerico from "@components/Botones/BotonGenerico";
import ModalGenerico from "@components/Modal/ModalGenerico";
import { useNavigate } from "react-router";
import PantallaCarga from "@components/PantallaCarga/PantallaCarga";
import { CampoSelect } from "@components/Formularios/CampoSelect";
import { CampoInput } from "@components/Formularios/CampoInput";
import { useForm, FormProvider } from "react-hook-form";

export default function AgregarDocumentos() {
  const [file, setFile] = useState<File | null>(null);
  const [tipo, setTipo] = useState("");
  const [emisor, setEmisor] = useState("");
  const [anio, setAnio] = useState("");
  const [numero, setNumero] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const methods = useForm(); // inicializa RHF

    const handleCerrarModal = () => {
    setMostrarModal(false);
    navigate("/documentos/gestion");
  };

  const handleSubmit = async (data: any) => {
    if (!file) return setError("Debes seleccionar un archivo PDF");

    setError(null);
    setCargando(true);

    try {
      const formData = new FormData();
      formData.append("archivo", file);
      formData.append("tipo", data.tipo);
      formData.append("emisor", data.emisor);
      formData.append("anio", data.anio);
      formData.append("numero", data.numero);

      const token = localStorage.getItem("access_token");

      const res = await fetch(`${URL_API}documentos/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        if (errorData?.non_field_errors) {
          throw new Error(errorData.non_field_errors[0]);
        } else {
          throw new Error("No se pudo guardar el documento.");
        }
      }

      // Éxito
      setMostrarModal(true);

      // limpiar campos
      setFile(null);
      methods.reset(); // resetea todos los campos de RHF
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error desconocido");
      }
    } finally {
      setCargando(false);
    }
  };

return (
  <PageBase titulo="Agregar Documento" subtitulo="Cargar un nuevo documento">
    {cargando && <PantallaCarga mensaje="Cargando..." />}
    <Card className="max-w-xl mx-auto mt-4 p-4 flex flex-col gap-4">
      {error && <MensajeError titulo="Error" descripcion={error} />}

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Archivo */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Archivo PDF</label>

              <input
                id="archivo"
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />

              <label
                htmlFor="archivo"
                className="
                  cursor-pointer px-4 py-2 bg-[#47ADA4] text-white 
                  rounded font-medium shadow hover:bg-[#3a928b] 
                  transition inline-flex items-center gap-2
                "
              >
                <span className="icon-[mdi--file-upload] text-xl" />
                Seleccionar archivo
              </label>

              {file ? (
                <p className="text-sm text-gray-700">📄 {file.name}</p>
              ) : (
                <p className="text-sm text-gray-400">Ningún archivo seleccionado</p>
              )}
            </div>

            {/* Tipo */}
            <CampoSelect
              label="Tipo"
              nombre="tipo"
              options={[
                { value: "ORDENANZA", label: "Ordenanza" },
                { value: "RESOLUCION", label: "Resolución" },
              ]}
            />

            {/* Emisor */}
            <CampoInput
              label="Emisor"
              nombre="emisor"
              type="text"
              placeholder="Ej: UNTDF"
            />

            {/* Año */}
            <CampoInput
              label="Año"
              nombre="anio"
              type="number"
              placeholder="Ej: 2025"
            />

            {/* Número */}
            <CampoInput
              label="Número"
              nombre="numero"
              type="text"
              placeholder="Ej: 15"
            />

            <BotonGenerico
              texto="Guardar"
              icono={<span className="icon-[mdi--content-save] text-xl" />}
              color="#47ADA4"
              type="submit"
            />
          </form>
        </FormProvider>
      </Card>

      <ModalGenerico
        abierto={mostrarModal}
        onClose={handleCerrarModal}
        icono={<span className="icon-[mdi--check-bold] text-green-600 text-5xl" />}
        titulo="Éxito"
        mensaje="Documento subido correctamente."
        textoBoton="Aceptar"
        colorBoton="#47ADA4"
        onConfirmar={handleCerrarModal}
      />
    </PageBase>
  );
}