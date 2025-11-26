type CARRERAS_COORDINADAS = {
    id: number;
    carrera: string;
    coordinador: string;
    fecha_inicio: string;
    fecha_fin: string | null;
    activo: boolean;
    creado_por: string | null;
}[]

export type GET_TYPE_COORDINADORES = {
  id: number;
  carreras_coordinadas: CARRERAS_COORDINADAS;
  usuario_id: number;
}[]

export type GET_TYPE_COORDINADOR = {
  id:number;
  carrera: string;
  carrera_id: number;
  coordinador: string;
  coordinador_id: number;
  fecha_inicio: string;
  fecha_fin: string;
  activo: boolean;
  creado_por: string;
  creado_por_id: number
}

export interface ICoordinador {
  id: number;               
  carreras_coordinadas: string; 
  usuario_id: number;         
}
export type PUT_TYPE_COORDINADOR = {
  carreras_asignadas_ids: number[]
}

export type PATCH_TYPE_COORDINADOR = {
  carreras_asignadas_ids: number[]
}

//POST no se que paso