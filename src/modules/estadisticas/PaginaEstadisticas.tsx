import React, { useState } from "react";
import PageBase from "@components/PageBase/PageBase";

// 1. Importamos componentes de UI existentes
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert"; // <--- NUEVO IMPORT

import ComponenteCarga from "@components/ComponenteCarga/Componentecarga";
import { Tabla } from "@components/Tabla/Tabla";
import { createColumnHelper } from "@tanstack/react-table";
import { AlertCircle } from "lucide-react"; 

import  useGetCarreras  from "@apis/carreras";
import { 
    useGetDocentesPorDedicacion, 
    useGetDocentesPorModalidad, 
    useGetHorasPorDocente 
} from "@apis/estadisticas";
import { DatoEstadistico, HorasDocente } from "@globalTypes/estadisticas";

// --- Subcomponente para Gráfico de Barras ---
const SimpleBarChart = ({ data, labelKey }: { data: DatoEstadistico[], labelKey: 'dedicacion' | 'modalidad' }) => {
    return (
        <div className="space-y-4">
            {data.map((item, index) => (
                <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                        <span className="font-medium">{String(item[labelKey])}</span>
                        <span className="text-gray-500">{item.total_docentes} ({item.porcentaje}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div 
                            className="bg-primary h-2.5 rounded-full transition-all duration-500" 
                            style={{ width: `${item.porcentaje}%` }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// --- Subcomponente de Mensaje de Permisos (REFACTORIZADO) ---
// Ahora usa el componente <Alert> de tu UI Kit en lugar de divs con estilos manuales
const AccesoDenegadoCard = ({ mensaje }: { mensaje?: string }) => (
    <div className="mt-6">
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Acceso Restringido</AlertTitle>
            <AlertDescription>
                {mensaje || "No tienes permisos para visualizar la información de esta carrera."}
            </AlertDescription>
        </Alert>
    </div>
);

// --- Columnas de Tabla ---
const columnHelperHoras = createColumnHelper<HorasDocente>();
const columnasHoras = [
    columnHelperHoras.accessor("docente", {
        header: "Docente",
        cell: info => info.getValue(),
    }),
    columnHelperHoras.accessor("dedicacion", {
        header: "Dedicación",
        cell: info => info.getValue() || "-",
    }),
    columnHelperHoras.accessor("total_horas_frente_alumnos", {
        header: "Hs Frente Alumno",
        cell: info => <span className="font-bold">{info.getValue()}</span>,
    }),
    columnHelperHoras.accessor("estado_carga", {
        header: "Estado",
        cell: info => {
            const estado = info.getValue();
            let color = "bg-gray-100 text-gray-800";
            if (estado === "INSUFICIENTE") {
                color = "bg-red-100 text-red-800"; // Rojo
            } else if (estado === "DENTRO_DEL_REGIMEN") {
                color = "bg-green-100 text-green-800"; // Verde
            } else if (estado === "EXCEDIDO") {
                color = "bg-yellow-100 text-yellow-800"; // Amarillo/Naranja de alerta
            }
            return (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>
                    {estado ? estado.replace(/_/g, " ") : "SIN ESTADO"}
                </span>
            );
        },
    }),
];

export default function PaginaEstadisticas() {
    const [carreraId, setCarreraId] = useState<string>("todos");
    
    // Filtros
    const filtrosApi = carreraId && carreraId !== "todos" ? { carrera_id: carreraId } : undefined;

    // Queries
    const { data: carreras } = useGetCarreras();
    
    const { 
        data: dataDedicacion, 
        isLoading: loadingDedicacion,
        isError: errorDedicacion,
        error: errObjDedicacion
    } = useGetDocentesPorDedicacion(filtrosApi);

    const { 
        data: dataModalidad, 
        isLoading: loadingModalidad,
        isError: errorModalidad
    } = useGetDocentesPorModalidad(filtrosApi);

    const { 
        data: dataHoras, 
        isLoading: loadingHoras,
        isError: errorHoras
    } = useGetHorasPorDocente(filtrosApi);

    const isLoadingGeneral = loadingDedicacion || loadingModalidad || loadingHoras;
    
    // Detectamos si hubo error de permisos
    const hayErrorPermisos = [errorDedicacion, errorModalidad, errorHoras].some(Boolean);
    
    // Extraemos el mensaje del backend si existe
    const mensajeErrorBackend = (errObjDedicacion as any)?.response?.data?.detail;

    return (
        <PageBase 
            titulo="Estadísticas Académicas" 
            subtitulo="Visualización general de docentes, dedicaciones y cargas horarias."
        >
            <div className="space-y-6">
                
                {/* --- Filtros --- */}
                <div className="bg-card p-4 rounded-lg border shadow-sm w-full md:w-1/3">
                    <label className="block text-sm font-medium mb-2">Filtrar por Carrera</label>
                    <Select value={carreraId} onValueChange={setCarreraId}>
                        <SelectTrigger className="w-full overflow-hidden">
                            <span className="truncate block text-left pr-2">
                                <SelectValue placeholder="Todas las carreras" />
                            </span>
                        </SelectTrigger>
                        <SelectContent className="max-w-[400px]">
                            <SelectItem value="todos">Todas las carreras</SelectItem>
                            {carreras?.map((c) => (
                                <SelectItem key={c.id} value={String(c.id)}>
                                    <span className="truncate block">
                                        {c.nombre || `Carrera ${c.id}`}
                                    </span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* --- Contenido --- */}
                {isLoadingGeneral ? (
                    <ComponenteCarga />
                ) : hayErrorPermisos ? (
                    // Aquí se renderiza la nueva Alerta usando componentes de UI
                    <AccesoDenegadoCard mensaje={mensajeErrorBackend} />
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Card Dedicación */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Docentes por Dedicación</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {dataDedicacion?.data && dataDedicacion.data.length > 0 ? (
                                        <SimpleBarChart data={dataDedicacion.data} labelKey="dedicacion" />
                                    ) : (
                                        <p className="text-muted-foreground text-sm">No hay datos disponibles.</p>
                                    )}
                                    <div className="mt-4 pt-4 border-t flex justify-between text-sm font-bold">
                                        <span>Total Docentes</span>
                                        <span>{dataDedicacion?.total_docentes || 0}</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Card Modalidad */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Docentes por Modalidad</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {dataModalidad?.data && dataModalidad.data.length > 0 ? (
                                        <SimpleBarChart data={dataModalidad.data} labelKey="modalidad" />
                                    ) : (
                                        <p className="text-muted-foreground text-sm">No hay datos disponibles.</p>
                                    )}
                                    <div className="mt-4 pt-4 border-t flex justify-between text-sm font-bold">
                                        <span>Total Docentes</span>
                                        <span>{dataModalidad?.total_docentes || 0}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Tabla de Horas */}
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-4">Detalle de Carga Horaria por Docente</h3>
                            {dataHoras && dataHoras.length > 0 ? (
                                <Tabla 
                                    data={dataHoras} 
                                    columnas={columnasHoras as any} 
                                    habilitarBuscador={true}
                                    habilitarPaginado={true}
                                />
                            ) : (
                                <div className="p-8 text-center border rounded-lg bg-gray-50 text-gray-500">
                                    No se encontraron registros de horas para los filtros seleccionados.
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </PageBase>
    );
}