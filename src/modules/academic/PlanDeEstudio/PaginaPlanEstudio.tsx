import { useGetPlanes } from "@apis/planestudio";
import BotonBase from "@components/Botones/BotonBase";
import PageBase from "@components/PageBase/PageBase";
import { useNavigate } from "react-router";

export default function PaginaPlanEstudio() {
  const { data: planes, isLoading, error } = useGetPlanes();
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem("is_staff") === "true";

  const handleAgregarPlan = () => {
    navigate(`/academica//planes/agregar`);
  };

 const handleVerPlan = (id: number) => {
    navigate("/academica/planes/detalle/", { state: { id } });
    };

  if (isLoading) return <p>Cargando planes de estudio...</p>;
  if (error) return <p>Error al cargar los planes de estudio.</p>;

  return (
    <PageBase>
      <div className="p-6 space-y-6 mt-10">
        <h1 className="text-2xl font-bold text-foreground">
          Listado de Planes de Estudio
        </h1>

        <div className="space-y-3">
          {(planes ?? []).map((p) => (
            <div
              key={p.id}
              onClick={() => handleVerPlan(p.id)}
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
                Plan #{p.id}
              </p>

              <p className="text-sm text-muted-foreground">
                Fecha de inicio: {p.fecha_inicio}
              </p>

              <p className="text-xs text-muted-foreground">
                Vigente: {p.esta_vigente ? "Sí" : "No"}
              </p>
            </div>
          ))}
        </div>

        {/* Botón agregar solo para admin */}
        {isAdmin && (
          <div className="mt-6">
            <BotonBase variant="agregar" onClick={handleAgregarPlan} />
          </div>
        )}
      </div>
    </PageBase>
  );
}