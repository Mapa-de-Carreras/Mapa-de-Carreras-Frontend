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

  designaciones: {
    actuales: IDesignacion[];
    historicas: IDesignacion[];
  };
}

export interface IDesignacion {
  id: number;
  fecha_inicio: string;
  fecha_fin: string | null;
  tipo_designacion: string;

  docente: {
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
  };

  comision: {
    id: number;
    nombre: string;
    turno: string;
    promocionable: boolean;
    activo: boolean;
    asignatura: number;
    asignatura_nombre: string;
  };

  regimen: string | null;

  cargo: {
    id: number;
    nombre: string;
    created_at: string;
    updated_at: string;
  };

  observacion: string;
  documento: string | null;
  creado_por: number | null;
  created_at: string;
  updated_at: string;
  activo: boolean;
}
