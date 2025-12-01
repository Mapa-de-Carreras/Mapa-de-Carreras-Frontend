import { useGetComisiones } from "@apis/comisiones";
import BotonDetalle from "@components/Botones/BotonDetalle";
import ComponenteCarga from "@components/ComponenteCarga/Componentecarga";
import Listado from "@components/Lista/Listado";
import MensajeError from "@components/Mensajes/MensajeError";
import PageBase from "@components/PageBase/PageBase";
import { Tabla } from "@components/Tabla/Tabla";
import FeedCard from "@components/Tarjetas/FeedCard";
import { Comision } from "@globalTypes/comisiones";
import useRol from "@hooks/useRol";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router";

export default function PaginaComisiones() {
    // Roles de Usuario
	const esAdmin = useRol('Administrador');
	const esCoordinador = useRol('Coordinador');

	// Navegación
	const navigate = useNavigate();

	// Obtiene los datos de las Comisiones
	const {
		data: comisiones,
		isError: isErrorComisiones,
		isLoading: isLoadingComisiones,
	} = useGetComisiones()

	const columnas: ColumnDef<Comision>[] = [
		{
			accessorKey: "nombre",
			header: "Nombre",
			size: 2,
		},
		{
			accessorKey: "plan_asignatura_str",
			header: "Plan / Asignatura",
			size: 4,
		},
		{
			accessorKey: "turno",
			header: "Turno",
			size: 1,
		},
		{ id: "actions", header: "Acciones", size: 1 },
	];

	// Funciones de manejo de eventos
	const handleAgregar = () => {
		navigate(`/designaciones/comisiones/agregar`);
	};

	const handleVer = (id: number) => {
		navigate(`/designaciones/comisiones/detalle/${id}`);
	};

	console.log("Rol: ", esAdmin);
	

	return (
		<PageBase titulo="Listado de Comisiones">
			{isLoadingComisiones ? (
				<ComponenteCarga mensaje="Obteniendo las comisiones" />
			) : isErrorComisiones ? (
				<MensajeError titulo="Error" descripcion="No se pudo obtener las comisiones" />
			) : (
				<div className="w-full">
					<div className="hidden sm:block">
						<Tabla
							columnas={columnas}
							data={comisiones || []}
							columnasFijas={false}
							funcionAgregado={esAdmin || esCoordinador ? handleAgregar : undefined}
							handleAccion={(row) => handleVer(row.id)}
						/>
					</div>
					<div className="sm:hidden">
						<Listado
							data={comisiones || []}
							dataRender={(c) => (
							<FeedCard
								key={c.id}
								titulo={c.nombre}
								descripcion={`Turno: ${c.turno} · Activo: ${
								c.activo ? "Sí" : "No"
								}`}
								actions={<BotonDetalle onClick={() => handleVer(c.id)} />}
							/>
							)}
							onClick={esAdmin || esCoordinador ? handleAgregar : undefined}
							enableSearch={true}
							searchFields={["nombre", "plan_asignatura_str"]}
							searchPlaceholder="Buscar comisiones por nombre o por plan / asignatura"
							mensajeSinDatos="No hay comisiones cargadas"
						/>
					</div>
				</div>
			)}
		</PageBase>
	)
}