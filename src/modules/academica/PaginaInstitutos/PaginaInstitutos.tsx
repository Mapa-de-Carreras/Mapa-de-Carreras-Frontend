import { useGetInstitutos } from "@apis/intitutos";
import BotonDetalle from "@components/Botones/BotonDetalle";
import ComponenteCarga from "@components/ComponenteCarga/Componentecarga";
import Listado from "@components/Lista/Listado";
import MensajeError from "@components/Mensajes/MensajeError";
import PageBase from "@components/PageBase/PageBase";
import { Tabla } from "@components/Tabla/Tabla";
import FeedCard from "@components/Tarjetas/FeedCard";
import { Instituto } from "@globalTypes/instituto";
import useRol from "@hooks/useRol";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router";

export default function PaginaInstitutos() {
    const navigate = useNavigate();
    const { data: institutos, isLoading: isLoadingInstitutos, isError: isErrorInstitutos } = useGetInstitutos();

    const isAdmin = useRol('Administrador')

    const handleAgregar = () => {
        navigate("/academica/institutos/agregar");
    };

    const handleVerDetalle = (instituto: Instituto) => {
		navigate(`/academica/institutos/detalle/${instituto.id}`)
	}

    const columns: ColumnDef<Instituto>[] = [
        { id: 'nombre', accessorKey: 'nombre', header: "Nombre", size: 3},
        { id: 'codigo', accessorKey: 'codigo', header: "Código", size: 1},
        { id: 'actions', header: 'Acciones', size: 1 },
    ]

    return (
        <PageBase titulo="Listado de Institutos" volver={true}>
            {isLoadingInstitutos ? (
                <ComponenteCarga />
            ) : isErrorInstitutos ? (
                <MensajeError titulo="Error del servidor" descripcion="No se pudo obtener los datos" />
            ) : (
                institutos && (
                    <div>
                        <div className="hidden sm:block">
                            <Tabla
                                columnas={columns}
                                data={institutos}
                                habilitarBuscador={true}
                                habilitarPaginado={true}
                                funcionAgregado={isAdmin? handleAgregar : undefined}
                                handleAccion={handleVerDetalle}
                                columnasFijas={false}
                            />
                        </div>
                        <div className="block sm:hidden">
                            {institutos && (
                                <Listado
                                    data={institutos}
                                    dataRender={(instituto) => (
                                        <FeedCard
                                            key={instituto.id}
                                            titulo={instituto.nombre}
                                            descripcion={instituto.codigo}
                                            actions={
                                                <BotonDetalle
                                                    onClick={() => handleVerDetalle(instituto)}
                                                />
                                            }
                                        />
                                    )}
                                    onClick={isAdmin? handleAgregar : undefined}
                                />
                            )}
                        </div>
                    </div>
                )
            )}
        </PageBase>
    );
}