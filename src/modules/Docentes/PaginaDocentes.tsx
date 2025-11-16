import { useGetDocentes } from "@apis/docentes";
import BotonBase from "@components/Botones/BotonBase";
import PageBase from "@components/PageBase/PageBase";
import { useNavigate } from "react-router";

export default function PaginaDocentes() {
  const { data: docentes, isLoading, error } = useGetDocentes();
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem("is_staff") === "true";

  const handleAgregarDocente = () => {
    navigate(`/docentes/agregar/`);
  };

  const handleVerDocente = (id: number) => {
    navigate(`/docentes/detalle/${id}`);
  };

  if (isLoading) return <p>Cargando docentes...</p>;
  if (error) return <p>Error al cargar los docentes.</p>;

  const docentesActivos = docentes?.filter((d) => d.activo === true) ?? [];

  return (
    <PageBase>
      <div className="p-6 space-y-6 mt-10">
        <h1 className="text-2xl font-bold text-foreground">Listado de Docentes</h1>

        <div className="space-y-3">
          {docentesActivos.map((d) => (
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

              <p className="text-sm text-muted-foreground">{d.usuario.email}</p>

              <p className="text-xs text-muted-foreground">
                Legajo: {d.usuario.legajo}
              </p>
            </div>
          ))}
        </div>

        {/* Botón agregar solo para administrador */}
        {isAdmin && (
          <div className="mt-6">
            <BotonBase variant="agregar" onClick={handleAgregarDocente} />
          </div>
        )}
      </div>
    </PageBase>
  );
}
