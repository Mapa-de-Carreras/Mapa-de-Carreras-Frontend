import PageBase from "@components/PageBase/PageBase";
import { useNavigate, useParams } from "react-router";
import PantallaCarga from "@components/PantallaCarga/PantallaCarga";

// --- 1. Hooks de API y Lógica (Sin cambios) ---
import { useGetCarrera, useDeleteCarrera } from "@apis/carreras";
import { useModal } from "@components/Providers/ModalProvider"; 

// --- 2. Componentes de UI de "Tu Código" ---
import BotonBase from '@components/Botones/BotonBase';
import { DetailCard } from '@components/CardDetalles/DetailCard';
import { DetailField } from '@components/CardDetalles/DetailField'; // Asumo que tienes este
import { DetailList } from '@components/CardDetalles/DetailList';
import Icon from '@components/const/icons';
import FeedCard from '@components/Tarjetas/FeedCard';
import BotonDetalle from '@components/Botones/BotonDetalle';

export default function DegreeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // --- Lógica de Hooks (Sin cambios) ---
  const { showModal } = useModal();
  const { data: carrera, isLoading: loading, error } = useGetCarrera(Number(id));
  
  const { mutate: deleteCarrera, isPending: isDeleting } = useDeleteCarrera();

  // --- Handlers (Sin cambios) ---
  const handleEditar = () => {
    navigate(`/academica/carreras/editar/${id}`);
  }

  const handleVerPlanEstudio = (idPlan: number) => {
   console.log("Ver plan de estudio id: ", idPlan);
   navigate("/academica/planes/detalle", { state: { id: idPlan } });
  };

  const handleConfirmDelete = () => {
    if (!id) return;
    deleteCarrera(Number(id), {
        onSuccess: () => {
            showModal({
                title: 'Éxito',
                description: 'La carrera se ha eliminado correctamente.',
                buttons: [{ variant: 'aceptar', onClick: () => navigate(-1) }],
            });
        },
        onError: (err) => {
            showModal({
                title: 'Error',
                description: err.message || 'No se pudo eliminar la carrera.',
                buttons: [{ variant: 'error', onClick: () => {} }],
            });
        },
    });
  };

  const handleClickModalEliminar = () => {
    showModal({
        title: 'Eliminar Carrera',
        description: '¿Está seguro que desea eliminar esta carrera?',
        buttons: [
            { 
              variant: 'eliminar', 
              onClick: handleConfirmDelete, 
             },
            { 
              variant: 'cancelar', 
              onClick: () => {},        
            },
        ],
    });
  };

  // --- Renderizado (Loading y Error) ---
  if (loading || isDeleting) {
    return <PantallaCarga mensaje="Cargando información de la carrera..." />;
  }
 
  if (error) {
    return (
      <PageBase>
        <p className="text-center text-red-600">{error.message}</p>
      </PageBase>
    );
  }
 
  if (!carrera) {
    return (
        <PageBase>
            {/* Botón Volver (como en tu InstitutesDetail) */}
            <div className="mb-4">
                <BotonBase variant="regresar" onClick={() => navigate(-1)} />
            </div>
            <p className="text-center text-gray-500">Carrera no encontrada.</p>
        </PageBase>
    );
  }

  // --- 3. Renderizado Principal (Usando TUS componentes) ---
  return (
    <PageBase>
        {/* Botón Volver (como en tu InstitutesDetail) */}
        <div className="mb-4">
            <BotonBase
                variant="regresar"
                onClick={() => navigate(-1)}
            />
        </div>

        <DetailCard
            titulo={`${carrera.codigo} - Detalles`}
            // Usamos el mismo ícono que tenías en el 'span'
            icono={<Icon type="carrera" className="text-5xl" />}
            descripcion={carrera.nombre}
            actions={
                <>
                    <BotonBase 
                        variant="editar" 
                        onClick={handleEditar} 
                
                    />
                    <BotonBase 
                        variant="eliminar" 
                        onClick={handleClickModalEliminar} 
                    />
                </>
            }
        >
            {/* --- Campos de Detalle (reemplazando CardContent) --- */}
            <DetailField label="Instituto">
                {carrera.instituto?.nombre || "No disponible"}
            </DetailField>
            <DetailField label="Nivel">
                {carrera.nivel}
            </DetailField>
            <DetailField label="Vigente">
                {carrera.esta_vigente ? "Sí" : "No"}
            </DetailField>
            <DetailField label="Coordinador actual">
                {carrera.coordinador_actual
                  ? carrera.coordinador_actual.nombre_completo
                  : "Sin asignar"}
            </DetailField>

            {/* --- Lista de Planes (como tu lista de Carreras en InstitutesDetail) --- */}
            <DetailList label="Planes" scrollable={false}>
                {carrera.planes && carrera.planes.length > 0 ? (
                    carrera.planes.map((plan) => (
                        <FeedCard
                            key={plan.id}
                            titulo={`Plan ${plan.fecha_inicio}`}
                            descripcion={plan.esta_vigente ? "Plan Vigente" : "Plan no vigente"}
                            actions={
                                <BotonDetalle
                                    onClick={() => handleVerPlanEstudio(plan.id)}
                                />
                            }
                        />
                    ))
                ) : (
                    <p className="text-sm text-gray-500">Esta carrera no tiene planes de estudio asociados.</p>
                )}
            </DetailList>
        </DetailCard>
    </PageBase>
  );
}