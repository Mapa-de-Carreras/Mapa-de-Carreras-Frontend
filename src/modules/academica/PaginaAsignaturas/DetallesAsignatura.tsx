import PageBase from "@components/PageBase/PageBase";
import { useModal } from "@components/Providers/ModalProvider"; 
import { useNavigate, useParams } from "react-router";
import { useDeleteAsignatura, useGetAsignatura } from "@apis/asignaturas";
import ComponenteCarga from "@components/ComponenteCarga/Componentecarga";
import BotonBase from "@components/Botones/BotonBase";
import { DetailCard } from "@components/CardDetalles/DetailCard";
import Icon from "@components/const/icons";
import { DetailField } from "@components/CardDetalles/DetailField";
import useRol from "@hooks/useRol";

export default function DetallesAsignatura() { 
    const id = Number(useParams<{id:string}>().id);
    const navigate = useNavigate();
    const { showModal } = useModal();

    const { data: asignatura, isLoading: isLoadingAsignatura, error: errorGetingAsignatura } = useGetAsignatura(id);
    const { mutate: deleteAsignatura } = useDeleteAsignatura();

    const isAdmin = useRol('Administrador')
    const isCoordinador = useRol('Coordinador')

    const handlelClickEditar = () => {
        navigate(`/academica/asignaturas/editar/${id}`);
    }
    

    const handleClickModalEliminar = () => {
        showModal({
            title: 'Eliminar Asignatura',
            description: '¿Está seguro que desea eliminar esta asignatura?',
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
    }

    const handleConfirmDelete = () => {
        if (!id) return;

        showModal({
            isLoading: true,
            msg: 'Eliminando Asignatura...',
        });

        deleteAsignatura({ params: { id : id}}, {
            onSuccess: () => {
                showModal({
                    title: 'Éxito',
                    description: 'La asignatura se ha eliminado correctamente.',
                    buttons: [{ variant: 'aceptar', onClick: () => navigate(-1) }],
                    isLoading: false,
                });
            },
            onError: (err) => {
                showModal({
                    title: 'Error',
                    description: err.message || 'No se pudo eliminar la asignatura.',
                    buttons: [{ variant: 'error', onClick: () => {} }],
                    isLoading: false,
                });
            },
        });
    }

        

    return (
        <PageBase titulo='Detalles'>
             <div className="mb-4">
                <BotonBase
                    variant="regresar"
                    onClick={() => navigate(-1)}
                />
            </div>

            {isLoadingAsignatura && <ComponenteCarga/>}
            {errorGetingAsignatura && <p>{errorGetingAsignatura.message}</p>}

            {!isLoadingAsignatura && !errorGetingAsignatura && asignatura && (
                <DetailCard
                    icono={<Icon type="instituosIcon" className="text-5xl" />}
                    titulo={asignatura.nombre}
                    descripcion={asignatura.codigo}
                    actions={ 
                        <>
                            {(isAdmin || isCoordinador) && (
                                <BotonBase
                                    variant="editar"
                                    onClick={handlelClickEditar}
                                />
                            )}
                            
                            {(isAdmin || isCoordinador) && (
                                <BotonBase
                                    variant="eliminar"
                                    onClick={handleClickModalEliminar}
                                />
                            )}
                        </>
                    }
                >
                <DetailField label="Tipo de Asignatura">
                    {asignatura.tipo_asignatura}
                </DetailField>
                <DetailField label="Tipo de Duracion">
                    {asignatura.tipo_duracion}
                </DetailField>
                {
                    asignatura.tipo_duracion === 'CUATRIMESTRAL' && (
                        <DetailField label="Cuatrimestre">
                            {asignatura.cuatrimestre}
                        </DetailField>
                    )
                }
                </DetailCard>
            )}
            
        </PageBase>
    )
}