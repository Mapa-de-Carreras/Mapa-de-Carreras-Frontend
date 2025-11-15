import { useGetDocentes } from "@apis/docentes";
import { useNavigate } from "react-router";

export default function PaginaDocentes() {
  const { data: docentes, isLoading, error } = useGetDocentes();
  const navigate = useNavigate();

  const handleVerDocente = (id: number) => {
    navigate(`/docentes/detalle/${id}`);
  };

  if (isLoading) return <p>Cargando docentes...</p>;
  if (error) return <p>Error al cargar los docentes.</p>;

  return (
    <div className="p-6 space-y-6 mt-10"> {/* ← bajamos todo el contenido */}
      <h1 className="text-2xl font-bold text-foreground">Listado de Docentes</h1>

      <div className="space-y-3">
        {docentes?.map((d) => (
          <div
            key={d.id}
            onClick={() => handleVerDocente(d.usuario.id)}
            className="
              border 
              rounded-lg 
              p-4 
              cursor-pointer 
              shadow-sm 
              bg-card 
              hover:bg-accent
              transition
            "
          >
            <p className="font-semibold text-foreground">
              {d.usuario.first_name} {d.usuario.last_name}
            </p>

            <p className="text-sm text-muted-foreground">
              {d.usuario.email}
            </p>

            <p className="text-xs text-muted-foreground">
              Legajo: {d.usuario.legajo}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
