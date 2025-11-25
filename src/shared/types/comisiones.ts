export interface IComision {
  id: number;
  nombre: string;
  turno: string;
  promocionable: boolean;
  activo: boolean;
  plan_asignatura_id: number;
  plan_asignatura_str:string;
}