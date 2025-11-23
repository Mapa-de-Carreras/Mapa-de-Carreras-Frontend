import PageBase from "@components/PageBase/PageBase";
import { useNavigate, useParams } from "react-router";
import ComponenteCarga from "@components/ComponenteCarga/Componentecarga";

import { useGetCarrera, useDeleteCarrera } from "@apis/carreras";
import { useModal } from "@components/Providers/ModalProvider"; 

import BotonBase from '@components/Botones/BotonBase';
import { DetailCard } from '@components/CardDetalles/DetailCard';
import { DetailField } from '@components/CardDetalles/DetailField'; 
import { DetailList } from '@components/CardDetalles/DetailList';
import Icon from '@components/const/icons';
import FeedCard from '@components/Tarjetas/FeedCard';
import BotonDetalle from '@components/Botones/BotonDetalle';
import { useGetDocenteCarrera } from "@apis/docentes";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@components/ui/accordion";

export default function DetallesCarrera() {
  const id = Number(useParams<{ id: string }>().id); 
  const navigate = useNavigate();
  const { showModal } = useModal();
  const { data: carrera, isLoading: loadingCarrera, error: errorGetingCarrera } = useGetCarrera(id);
  
  const { mutate: deleteCarrera } = useDeleteCarrera();
  const { data: docente } = useGetDocenteCarrera(id);

  const handleEditar = () => {
    navigate(`/academica/carreras/editar/${id}`);
  }

  const handleVerPlanEstudio = (idPlan: number) => {
   navigate("/academica/planes/detalle", { state: { id: idPlan } });
  };

  const handleVerDocente = (idDocente: number) => {
    navigate(`/docentes/detalle/${idDocente}`);
  };

  const handleConfirmDelete = () => {
    if (!id) return;

    showModal({
        isLoading: true,
        msg: 'Eliminando Instituto...',
    })

    deleteCarrera({ params: { id : id}}, {
        onSuccess: () => {
            showModal({
                title: 'Éxito',
                description: 'La carrera se ha eliminado correctamente.',
                buttons: [{ variant: 'aceptar', onClick: () => navigate(-1) }],
                isLoading: false,
            });
        },
        onError: (err) => {
            showModal({
                title: 'Error',
                description: err.message || 'No se pudo eliminar la carrera.',
                buttons: [{ variant: 'error', onClick: () => {} }],
                isLoading: false,
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
              autoClose: false,
              onClick: handleConfirmDelete, 
             },
            { 
              variant: 'cancelar', 
              onClick: () => {},        
            },
        ],
    });
  };


  return (
    <PageBase>
        
        <div className="mb-4">
            <BotonBase
                variant="regresar"
                onClick={() => navigate(-1)}
            />
        </div>

        {loadingCarrera && <ComponenteCarga />}
        {errorGetingCarrera && <p>Error al obtener la carrera</p>}

        {!loadingCarrera && !errorGetingCarrera && carrera && 
            <DetailCard
                titulo={`${carrera.codigo} - Detalles`}
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

                {/* --- Lista de Planes --- HACERLO UN COMPONENTE */}
                <DetailList label="Planes" scrollable={false}>
                    {carrera.plan_de_estudio && carrera.plan_de_estudio.length > 0 ? (
                        carrera.plan_de_estudio.map((plan) => (
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
                    

                <Accordion type="single" collapsible className="mt-6">
                <AccordionItem value="docentes">
                    <AccordionTrigger className="text-lg font-semibold text-foreground">
                    Docentes a Cargo
                    </AccordionTrigger>

                    <AccordionContent>
                    {docente && docente.length > 0 ? (
                        <ul className="space-y-2">
                        {docente.map((d) => (
                            <li
                            key={d.id}
                            onClick={() => handleVerDocente(d.usuario.id)}
                            className="
                                border 
                                rounded-lg 
                                p-3 
                                shadow-sm 
                                cursor-pointer 
                                transition
                                bg-card 
                                hover:bg-accent
                                text-foreground
                            "
                            >
                            <p className="font-medium text-foreground">
                                {d.usuario.first_name} {d.usuario.last_name}
                            </p>

                            <p className="text-sm text-muted-foreground">
                                {d.usuario.email}
                            </p>
                            </li>
                        ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                        No hay docentes asignados a esta carrera.
                        </p>
                    )}
                    </AccordionContent>
                </AccordionItem>
                </Accordion>
            </DetailCard>
        }
    </PageBase>
  );
}