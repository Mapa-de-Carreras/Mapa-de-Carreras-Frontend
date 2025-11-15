import { useParams } from "react-router";
import { useGetDocenteDetalle } from "@apis/docentes";

export default function DocenteDetalle() {
  const { id } = useParams();
  const { data: docente, isLoading, error } = useGetDocenteDetalle(Number(id));

  if (isLoading) return <p>Cargando docente...</p>;
  if (error) return <p>Error al cargar el docente.</p>;
  if (!docente) return <p>No se encontró el docente.</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">
        {docente.usuario.first_name} {docente.usuario.last_name}
      </h1>

      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <p><strong>Email:</strong> {docente.usuario.email}</p>
        <p><strong>Legajo:</strong> {docente.usuario.legajo}</p>
        <p><strong>Celular:</strong> {docente.usuario.celular}</p>
        <p><strong>Cantidad de materias:</strong> {docente.cantidad_materias}</p>
        <p><strong>Modalidad:</strong> {docente.modalidad ?? "No informado"}</p>
        <p><strong>Carácter:</strong> {docente.caracter ?? "No informado"}</p>
        <p><strong>Dedicación:</strong> {docente.dedicacion ?? "No informado"}</p>
        <p><strong>Estado:</strong> {docente.activo ? "Activo" : "Inactivo"}</p>
      </div>

      {/* Carreras donde trabaja */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Carreras en las que dicta clases</h2>
        {docente.carreras.length > 0 ? (
          <ul className="list-disc ml-6 mt-2">
            {docente.carreras.map((c) => (
              <li key={c.id}>{c.nombre}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">No está asignado a ninguna carrera.</p>
        )}
      </div>
    </div>
  );
}
