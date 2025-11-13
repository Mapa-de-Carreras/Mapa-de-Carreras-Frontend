export type TipoAsignatura = "OBLIGATORIA" | "OPTATIVA";
export type TipoDuracion = "ANUAL" | "CUATRIMESTRAL";

export type Asignatura = {
  id: number;
  codigo: string;
  nombre: string;
  activo: boolean;
  cuatrimestre: number;
  tipo_asignatura: TipoAsignatura;
  tipo_duracion: TipoDuracion;
  horas_teoria: number;
  horas_practica: number;
  horas_semanales: number;
  horas_totales: number; 
  created_at: string;    
  updated_at: string;  
}

export type AsignaturaPayload = {
  codigo: string;
  nombre: string;
  tipo_asignatura: TipoAsignatura;
  tipo_duracion: TipoDuracion;
  cuatrimestre?: number;
  horas_teoria?: number;
  horas_practica?: number;
  horas_semanales?: number;
}
