import { useParams } from "react-router";
import { useGetDocenteDetalle } from "@apis/docentes";
import PageBase from "@components/PageBase/PageBase";

export default function DocenteDetalle() {
  const { id } = useParams();
  const { data: docente, isLoading, error } = useGetDocenteDetalle(Number(id));

  if (isLoading) return <p>Cargando docente...</p>;
  if (error) return <p>Error al cargar el docente.</p>;
  if (!docente) return <p>No se encontró el docente.</p>;

  // EXTRAEMOS LAS CARRERAS DESDE LA DESIGNACIÓN ACTUAL
  const carreras =
    docente.designaciones?.actuales?.[0]?.docente?.carreras ?? [];

  return (
     <PageBase>
    <div className="p-6 space-y-6 mt-14"> {/*  <-- BAJA TODO */}
      <h1 className="text-2xl font-bold">
        {docente.usuario.first_name} {docente.usuario.last_name}
      </h1>

      {/* Datos principales */}
    <div className="bg-card p-4 rounded-lg shadow space-y-2 text-foreground">
        <p>
          <strong>Email:</strong> {docente.usuario.email}
        </p>
        <p>
          <strong>Legajo:</strong> {docente.usuario.legajo}
        </p>
        <p>
          <strong>Celular:</strong> {docente.usuario.celular}
        </p>
        <p>
          <strong>Cantidad de materias:</strong> {docente.cantidad_materias}
        </p>
        <p>
          <strong>Modalidad:</strong> {docente.modalidad ?? "No informado"}
        </p>
        <p>
          <strong>Carácter:</strong> {docente.caracter ?? "No informado"}
        </p>
        <p>
          <strong>Dedicación:</strong> {docente.dedicacion ?? "No informado"}
        </p>
      </div>

      {/* Carreras */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">
          Carreras asociadas
        </h2>

        {carreras.length > 0 ? (
          <ul className="list-disc ml-6 mt-2">
            {carreras.map((c) => (
              <li key={c.id}>{c.nombre}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">
            No está asignado a ninguna carrera.
          </p>
        )}
      </div>

      {/* Designaciones */}
      <div>
        <h2 className="text-xl font-semibold">Designaciones actuales</h2>

        {docente.designaciones.actuales.length > 0 ? (
          <ul className="list-disc ml-6 mt-2">
            {docente.designaciones.actuales.map((d) => (
              <li key={d.id}>
                {d.tipo_designacion} — {d.comision.asignatura_nombre}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">Sin designaciones actuales.</p>
        )}
      </div>
    </div>
    </PageBase>
  );
}
