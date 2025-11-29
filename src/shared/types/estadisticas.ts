export interface DatoEstadistico {
    dedicacion?: string;
    modalidad?: string;
    total_docentes: number;
    porcentaje: number;
}

export interface RespuestaEstadisticaDocentes {
    total_docentes: number;
    data: DatoEstadistico[];
}

export interface HorasDocente {
    docente_id: number;
    docente: string;
    dedicacion: string | null;
    modalidad: string | null;
    total_horas_frente_alumnos: number;
    asignaturas: number;
    estado_carga: "SIN_REGIMEN" | "INSUFICIENTE" | "DENTRO_DEL_REGIMEN" | "EXCEDIDO";
}

export interface DesignacionCarrera {
    asignatura: string;
    docente: string;
    dedicacion: string | null;
    modalidad: string | null;
    periodo: string;
    anio: number;
    estado_comision: "ACTIVA" | "INACTIVA";
}