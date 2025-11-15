import PageBase from "@components/PageBase/PageBase";
import { data, useNavigate, useParams } from "react-router";
import PantallaCarga from "@components/PantallaCarga/PantallaCarga";

// --- 1. Hooks de API y Lógica  ---
import { useGetCarrera, useDeleteCarrera } from "@apis/carreras";
import { useModal } from "@components/Providers/ModalProvider"; 

// --- 2. Componentes de UI " ---
import BotonBase from '@components/Botones/BotonBase';
import { DetailCard } from '@components/CardDetalles/DetailCard';
import { DetailField } from '@components/CardDetalles/DetailField'; 
import { DetailList } from '@components/CardDetalles/DetailList';
import Icon from '@components/const/icons';
import FeedCard from '@components/Tarjetas/FeedCard';
import BotonDetalle from '@components/Botones/BotonDetalle';
import { useGetDocenteCarrera } from "@apis/docentes";
import {Accordion,AccordionItem,AccordionTrigger,AccordionContent} from "@components/ui/accordion";

export default function DegreeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // --- Lógica de Hooks (Sin cambios) ---
  const { showModal } = useModal();
  const { data: carrera, isLoading: loading, error } = useGetCarrera(Number(id));
  
  const { mutate: deleteCarrera, isPending: isDeleting } = useDeleteCarrera();
  const { data: docente } = useGetDocenteCarrera(Number(id));

  // --- Handlers (Sin cambios) ---
  const handleEditar = () => {
    navigate(`/academica/carreras/editar/${id}`);
  }

  const handleVerPlanEstudio = (idPlan: number) => {
   console.log("Ver plan de estudio id: ", idPlan);
   navigate("/academica/planes/detalle", { state: { id: idPlan } });
  };

  const handleVerDocente = (idDocente: number) => {
   console.log("Ver plan de estudio id: ", idDocente);
 navigate(`/docentes/detalle/${idDocente}`);
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

  // --- 3. Renderizado Principal ) ---
  return (
    <PageBase>
        {/* Botón Volver  */}
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
            {/* --- Campos de Detalle --- */}
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

            {/* --- Lista de Planes --- */}
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
  
         {/* --- Docentes asignados --- */}
                <Accordion type="single" collapsible className="mt-6">
                <AccordionItem value="docentes">
                    <AccordionTrigger className="text-lg font-semibold">
                    Docentes a Cargo
                    </AccordionTrigger>
                    <AccordionContent>
                    {docente && docente.length > 0 ? (
                        <ul className="space-y-2">
                        {docente.map((d) => (
                       <li
                            key={d.id}
                            onClick={() => handleVerDocente(d.usuario.id)}
                            className="border rounded-lg p-3 shadow-sm cursor-pointer hover:opacity-90 transition"
                            style={{ backgroundColor: "oklch(28% 0.03 270)" }}
                            >
                            <p className="font-medium">
                                {d.usuario.first_name} {d.usuario.last_name}
                            </p>
                            <p className="text-sm text-gray-600">
                                {d.usuario.email}
                            </p>
                            </li>
                        ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500">
                        No hay docentes asignados a esta carrera.
                        </p>
                    )}
                    </AccordionContent>
                </AccordionItem>
                </Accordion>


        </DetailCard>
    </PageBase>
  );
}