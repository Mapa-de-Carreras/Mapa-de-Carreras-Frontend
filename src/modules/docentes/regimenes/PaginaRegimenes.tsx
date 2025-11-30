import useGetRegimenes from "@apis/regimenes";
import ComponenteCarga from "@components/ComponenteCarga/Componentecarga";
import Listado from "@components/Lista/Listado";
import MensajeError from "@components/Mensajes/MensajeError";
import PageBase from "@components/PageBase/PageBase";
import { Tabla } from "@components/Tabla/Tabla";
import Titulo from "@components/Tipografia/Titulo";
import { Card } from "@components/ui/card";
import { Regimen } from "@globalTypes/regimenes";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router";

import BotonDetalle from "@components/Botones/BotonDetalle";
import Subtitulo from "@components/Tipografia/Subtitulo";
import useRol from "@hooks/useRol";

export default function PaginaRegimenes() {
    // Permisos
    const esAdmin = useRol("Administrador");

    // Ventana y Navegación
	const navigate = useNavigate()

    // Obtiene los datos de los Regímenes
    const {
        data: regimenes,
        isError: isErrorRegimenes,
        isLoading: isLoadingRegimenes,
    } = useGetRegimenes()

    const handleAgregar = () => {
		navigate(`/docentes/parametros/agregar`)
	}

    const handleVerDetalle = (row: Regimen) => {
        navigate(`/docentes/parametros/detalle/${row.id}`)
    }

    const columnas: ColumnDef<Regimen>[] = [
        { accessorKey: 'dedicacion.nombre', header: 'Dedicacion', size: 3 },
        { accessorKey: 'modalidad.nombre', header: 'Modalidad', size: 2 },
        { accessorKey: 'activo', header: 'Activo', size: 1, cell: ({row}) => row.original.activo ? 'Activo' : 'Inactivo' },
        { id: 'actions', header: 'Acciones', size: 1 },
    ]

    return (
        <PageBase titulo="Parámetros de Régimen">
            {isLoadingRegimenes ? (
                <ComponenteCarga mensaje="Obteniendo los parámtros de régimen" />
            ) : isErrorRegimenes ? (
                <MensajeError titulo="Error" descripcion="No se pudo obtener los parámtros de régimen" />
            ) : (
                <div className="w-full">
                    <div className="hidden sm:block">
						<Tabla
							columnas={columnas}
							data={regimenes || []}
							columnasFijas={false}
							funcionAgregado={esAdmin ? handleAgregar : undefined}
                            handleAccion={handleVerDetalle}
						/>
					</div>
					<div className="sm:hidden">
						<Listado
							data={regimenes || []}
							dataRender={(regimen) => {
								return (
									<Card key={regimen.id} className="flex flex-row justify-between items-center p-2">
                                        <div>
                                            <Titulo>Modalidad: {regimen.modalidad.nombre}</Titulo>
                                            <Subtitulo>Dedicacion: {regimen.dedicacion.nombre}</Subtitulo>
                                            <Subtitulo>Activo: {regimen.activo ? 'Activo' : 'Inactivo'}</Subtitulo>
                                        </div>
                                        <div className="flex justify-end">
                                            <BotonDetalle onClick={() => handleVerDetalle(regimen)} />
                                        </div>
									</Card>
								)
							}}
							onClick={esAdmin ? handleAgregar : undefined}
							mensajeSinDatos="No hay parámetros de régimen cargados"
						/>
					</div>
                </div>
            )}



        </PageBase>
    );
}