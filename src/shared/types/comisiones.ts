export type Comision = {
	id: number;
	nombre: string;
	turno: string;
	promocionable: boolean;
	activo: boolean;
	plan_asignatura_id: number;
	plan_asignatura_str:string;
}

export type ComisionPostPayload = {
	nombre: string;
	turno: string;
	promocionable: boolean;
	activo: boolean;
	plan_asignatura: number;
}

export type ComisionPatchPayload = {
	nombre: string;
	turno: string;
	promocionable: boolean;
	activo: boolean;
}