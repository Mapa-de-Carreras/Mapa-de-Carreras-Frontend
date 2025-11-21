import { ICargo } from "./cargos";
import { IModalidad } from "./modalidades";
import { ICaracter } from "./caracter";
import { IDedicacion } from "./dedicaciones";
import { IComision } from "./comisiones";

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
  caracter: ICaracter
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