import { GET_TYPE_CARRERA } from "./carrera";

export interface IAsignatura {
  id: number;
  codigo: string;
  nombre: string;
  activo: boolean;
  correlativas: {
    id: number;
    nombre: string;
  }[];
}

export interface IDocumento {
  id: number;
  tipo: string;
  emisor: string;
  numero: string;
  anio: number;
  archivo: string | null;
  created_at: string;
}

export interface IPlan {
  id: number;
  fecha_inicio: string;
  esta_vigente: boolean;
  creado_por: string | null;
  created_at: string;
  updated_at: string;
  documento?: IDocumento;
  carrera_nombre: string;
  carrera_id: number;
}

export interface IPlanEstudioDetalle {
  id: number;
  fecha_inicio: string;
  esta_vigente: boolean;
  documento: IDocumento | null;
  carrera: GET_TYPE_CARRERA
  asignaturas: IAsignatura[];
  planes: IPlan[];
}

export interface IPlanEstudio {
  id: number;
  fecha_inicio: string;
  esta_vigente: boolean;
  creado_por?: string;
  created_at?: string;
  updated_at?: string;
  documento: IDocumento | null;
  carrera_nombre: string,
  carrera_id: number,
}