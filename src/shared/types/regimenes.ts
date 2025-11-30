import { Dedicacion } from "./dedicaciones";
import { Modalidad } from "./modalidades";

export type Regimen = {
    id: number;
    modalidad: Modalidad;
    dedicacion: Dedicacion;
    modalidad_id: number;
    dedicacion_id: number;
    horas_max_frente_alumnos: number;
    horas_min_frente_alumnos: number;
    horas_max_anual: number;
    horas_min_anual: number;
    activo: boolean;
    max_asignaturas: number;
};

export type RegimenResponse = Regimen;

export type RegimenPostPayload = {
    modalidad: {
        nombre: string;
    };
    dedicacion: {
        nombre: string;
    };
    modalidad_id: number;
    dedicacion_id: number;
    horas_max_frente_alumnos: number;
    horas_min_frente_alumnos: number;
    horas_max_anual: number;
    horas_min_anual: number;
    activo: boolean;
    max_asignaturas: number;
};

export type RegimenPutPayload = {
    id: number;
    modalidad: {
        nombre: string;
    };
    dedicacion: {
        nombre: string;
    };
    modalidad_id: number;
    dedicacion_id: number;
    horas_max_frente_alumnos: number;
    horas_min_frente_alumnos: number;
    horas_max_anual: number;
    horas_min_anual: number;
    activo: boolean;
    max_asignaturas: number;
};

export type RegimenCreateForm = {
    modalidad: Modalidad;
    dedicacion: Dedicacion;
    horas_max_frente_alumnos: number;
    horas_min_frente_alumnos: number;
    horas_max_anual: number;
    horas_min_anual: number;
    max_asignaturas: number;
};

export type RegimenEditForm = {
    modalidad: Modalidad;
    dedicacion: Dedicacion;
    horas_max_frente_alumnos: number;
    horas_min_frente_alumnos: number;
    horas_max_anual: number;
    horas_min_anual: number;
    max_asignaturas: number;
};