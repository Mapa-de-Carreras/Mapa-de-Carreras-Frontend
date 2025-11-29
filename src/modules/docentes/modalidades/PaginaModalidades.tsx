import useGetModalidades, { useDeleteModalidad } from "@apis/modalidades";
import BotonBase from "@components/Botones/BotonBase";
import ComponenteCarga from "@components/ComponenteCarga/Componentecarga";
import Listado from "@components/Lista/Listado";
import MensajeError from "@components/Mensajes/MensajeError";
import PageBase from "@components/PageBase/PageBase";
import { useVentana } from "@components/Providers/VentanaProvider";
import { Tabla } from "@components/Tabla/Tabla";
import Titulo from "@components/Tipografia/Titulo";
import { Card } from "@components/ui/card";
import { Modalidad } from "@globalTypes/modalidades";
import { extraerMensajeDeError } from "@lib/errores";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router";

export default function PaginaModalidades() {
    // Ventana y Navegación
	const { abrirVentana, cerrarVentana } = useVentana();
	const navigate = useNavigate();

    // Obtiene los datos de las Modalidades
    const {
        data: modalidades,
        isError: isErrorModalidades,
        isLoading: isLoadingModalidades,
    } = useGetModalidades();

    // Configuación para eliminar una Modalidad
    const {
        mutate: eliminarModalidad,
        isPending: isLoadingEliminar,
    } = useDeleteModalidad({ queriesToInvalidate: ['useGetModalidades'] })

    const onConfirmDelete = (modalidad: Modalidad) => {
        eliminarModalidad(
            { params: { id: modalidad.id } },
            {
                onError: (error: Error) =>
                    abrirVentana({
                        tipoVentana: 'error',
                        onClose: cerrarVentana,
                        onConfirm: cerrarVentana,
                        titulo: '¡Error!',
                        descripcion: extraerMensajeDeError(error),
                    }),
                onSuccess: () =>
                    abrirVentana({
                        tipoVentana: 'exito',
                        onClose: cerrarVentana,
                        onConfirm: cerrarVentana,
                        titulo: '¡Completado!',
                        descripcion: `La modalidad ${modalidad.nombre} se eliminó con éxito`,
                    }),
            }
        )
    }

    // Funciones de manejo de eventos
    const handleEliminar = (modalidad: Modalidad) => {
        abrirVentana({
            tipoVentana: 'eliminar',
            onClose: cerrarVentana,
            onConfirm: () => onConfirmDelete(modalidad),
            cargando: isLoadingEliminar,
            titulo: 'Eliminar Modalidad',
            descripcion: `¿Está seguro de que desea eliminar la modalidad ${modalidad.nombre}?`,
        });
    }

    const handleEditar = (id: number) => {
        navigate(`/docentes/modalidades/editar/${id}`)
    }

    const handleAgregar = () => {
        navigate('/docentes/modalidades/agregar')
    }

    // Columnas de la tabla
    const columnas: ColumnDef<Modalidad>[] = [
        { accessorKey: 'id', header: 'Codigo', size: 1 },
        { accessorKey: 'nombre', header: 'Nombre', size: 4 },
        {
            id: 'Acciones',
            header: 'Acciones',
            cell: ({ row }) => (
                <div className="flex flex-row gap-2">
                    <BotonBase variant="eliminar" onClick={() => handleEliminar(row.original)} />
                    <BotonBase variant="editar" onClick={() => handleEditar(row.original.id)} />
                </div>
            ),
            size: 2,
        },
    ]

    return (
        <PageBase
            titulo="Modalidades del Docente"
        >
            {isLoadingModalidades ? (
                <ComponenteCarga mensaje="Obteniendo las modalidades" />
            ) : isErrorModalidades ? (
                <MensajeError titulo="Error" descripcion="No se pudo obtener las modalidades" />
            ) : (
                <div className="w-full">
					<div className="hidden sm:block">
						<Tabla
							columnas={columnas}
							data={modalidades || []}
							columnasFijas={false}
							funcionAgregado={handleAgregar}
						/>
					</div>
					<div className="sm:hidden">
						<Listado
							data={modalidades || []}
							dataRender={(modalidad) => {
								return (
									<Card key={modalidad.id} className="justify-between px-2">
										<Titulo>{modalidad.nombre}</Titulo>
										<div className="flex flex-row gap-2">
											<BotonBase
												variant="eliminar"
												onClick={() => handleEliminar(modalidad)}
											/>
											<BotonBase variant="editar" onClick={() => handleEditar(modalidad.id)} />
										</div>
									</Card>
								)
							}}
							onClick={handleAgregar}
							mensajeSinDatos="No hay modalidades cargadas"
						/>
					</div>
				</div>
            )}  
        </PageBase>
    );
}