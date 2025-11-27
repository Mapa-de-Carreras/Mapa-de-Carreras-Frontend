import { ICargo } from "./cargos";
import { IModalidad } from "./modalidades";
import { IDedicacion } from "./dedicaciones";
import { IComision } from "./comisiones";
import { Caracter } from "./caracter";

//No queria modificar el Idocente del archivo docentes
export interface IDocente {
  id: number;

  usuario: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    legajo: string;
    celular: string;
  };
  modalidad: IModalidad;
  caracter: Caracter
  dedicacion:IDedicacion;
  cantidad_materias: number;
  activo: boolean;

  carreras: {
    id: number;
    nombre: string;
  }[];
}

export interface IDesignacion {
  id: number;
  fecha_inicio: string;
  fecha_fin: string | null;
  tipo_designacion: string;
  docente: IDocente;
  comision: IComision | null;
  cargo: ICargo;
  observacion: string | null;
  documento: number | null;
  creado_por: number;
  created_at: string;
  updated_at: string;
  activo: boolean;
}

export type POST_TYPE_DESIGNACION = {
  fecha_inicio: string;       
  fecha_fin?: string | null;   
  tipo_designacion: string;    
  docente_id: number;          
  comision_id?: number | null; 
  cargo_id: number;            
  observacion?: string | null; 
  documento_id?: number | null;
  dedicacion_id?: number | null;
};