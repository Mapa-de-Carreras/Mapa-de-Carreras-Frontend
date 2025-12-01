export interface IPlanAsignatura {
  id: number;                   
  plan_de_estudio_id: number;    
  asignatura_id: number;         
  asignatura_nombre: string;
  anio: number | null;            
  horas_teoria: number | null;    
  horas_practica: number | null; 
  horas_semanales: number | null; 
  horas_totales: number;         
  created_at: string;            
  updated_at: string;            
  descripcion: string;            
}