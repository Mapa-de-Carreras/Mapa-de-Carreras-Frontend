export type Nivel = 
  | 'TECNICATURA' 
  | 'DIPLOMATURA' 
  | 'PREGRADO' 
  | 'GRADO' 
  | 'POSGRADO' 
  | 'MAESTRIA';

 type INSTITUTO = {
  id: number;
  codigo: string;
  nombre: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

type COORDINADOR_ACTUAL = {
  id: number;
  username: string;
  nombre_completo: string;
  email: string;
  fecha_inicio: string;
}
 

type DOCUMENTO = {
  id: number,
  tipo: string,
  emisor: string,
  numero: string,
  anio: number,
  archivo: null,
  created_at: string
}

type PLAN_DE_ESTUDIO = {
  id: number;
  fecha_inicio: string;
  esta_vigente: boolean;
  creado_por: string | null;
  documento: DOCUMENTO
  created_at: string,
  updated_at: string
  
}[]

export type GET_TYPE_CARRERAS = {
  id: number;
  codigo: string;
  nombre: string;
  nivel: Nivel;
  esta_vigente: boolean;
  created_at: string;
  updated_at: string;
  instituto: INSTITUTO;
  coordinador_actual: COORDINADOR_ACTUAL | null;
}

export type GET_TYPE_CARRERAS_LIST = GET_TYPE_CARRERAS[]

export type GET_TYPE_CARRERA = {
  id: number;
  codigo: string;
  nombre: string;
  nivel: Nivel;
  esta_vigente: boolean;
  coordinador_actual: COORDINADOR_ACTUAL | null;
  coordinadores_historial: COORDINADOR_ACTUAL[];
  planes: PLAN_DE_ESTUDIO;
  instituto: INSTITUTO;
  created_at: string;
  updated_at: string;
}

export type POST_TYPE_CARRERA = {
  codigo: string;
  nombre: string;
  nivel: Nivel;
  instituto_id: number; 
}

export type PUT_TYPE_CARRERA = {
  codigo: string;
  nombre: string;
  nivel: Nivel;
  instituto_id: number; 
}

export type PATHC_TYPE_CARRERA = {
esta_vigente: boolean
}






