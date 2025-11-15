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
  modalidad: string | null;
  caracter: string | null;
  dedicacion: string | null;
  cantidad_materias: number;
  activo: boolean;
  carreras: {
    id: number;
    nombre: string;
  }[];
}
