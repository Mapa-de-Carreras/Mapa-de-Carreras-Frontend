import { useState } from "react";
import PageBase from "@components/PageBase/PageBase";
import { Card, CardContent, CardFooter } from '@components/ui/card'
import BotonBase from "@components/Botones/BotonBase";
import MensajeError from "@components/Mensajes/MensajeError";
import { URL_API } from "@apis/constantes";
import BotonGenerico from "@components/Botones/BotonGenerico";


export default function AgregarDocumentos() {
  const [file, setFile] = useState<File | null>(null);
  const [tipo, setTipo] = useState("");
  const [emisor, setEmisor] = useState("");
  const [anio, setAnio] = useState("");
  const [numero, setNumero] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return setError("Debes seleccionar un archivo PDF");

    if (!tipo || !emisor || !anio || !numero)
      return setError("Todos los campos son obligatorios");

    setError(null);
    setCargando(true);

    try {
      const formData = new FormData();
      formData.append("archivo", file);
      formData.append("tipo", tipo);
      formData.append("emisor", emisor);
      formData.append("anio", anio);
      formData.append("numero", numero);

      const res = await fetch(`${URL_API}documentos/`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("No se pudo guardar el documento.");

      alert("Documento cargado correctamente.");

      // Limpiar formulario
      setFile(null);
      setTipo("");
      setEmisor("");
      setAnio("");
      setNumero("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <PageBase titulo="Agregar Documento" subtitulo="Cargar un nuevo documento">
      <Card className="max-w-xl mx-auto mt-4 p-4 flex flex-col gap-4">
        {error && <MensajeError titulo="Error" descripcion={error} />}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
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
                cursor-pointer 
                px-4 py-2 
                bg-[#47ADA4] 
                text-white 
                rounded 
                font-medium 
                shadow 
                hover:bg-[#3a928b] 
                transition
                inline-flex
                items-center
                gap-2
                "
            >
                <span className="icon-[mdi--file-upload] text-xl" />
                Seleccionar archivo
            </label>

            {/* Nombre del archivo */}
            {file ? (
                <p className="text-sm text-gray-700">📄 {file.name}</p>
            ) : (
                <p className="text-sm text-gray-400">Ningún archivo seleccionado</p>
            )}
            </div>

          {/* Tipo */}
          <div>
            <label className="font-semibold">Tipo</label>
            <input
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              placeholder="Ej: RESOLUCIÓN"
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Emisor */}
          <div>
            <label className="font-semibold">Emisor</label>
            <input
              value={emisor}
              onChange={(e) => setEmisor(e.target.value)}
              placeholder="Ej: UNTDF"
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Año */}
          <div>
            <label className="font-semibold">Año</label>
            <input
              type="number"
              value={anio}
              onChange={(e) => setAnio(e.target.value)}
              placeholder="Ej: 2025"
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Número */}
          <div>
            <label className="font-semibold">Número</label>
            <input
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              placeholder="Ej: 15"
              className="border p-2 rounded w-full"
            />
          </div>

            <BotonGenerico
                                               texto="Guardar"
                                               icono={<span className="icon-[mdi--content-save] text-xl" />}
                                               color="#47ADA4"
                                               type="submit"
                                               />
        </form>
      </Card>
    </PageBase>
  );
}