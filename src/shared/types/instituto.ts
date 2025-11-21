export type GET_TYPE_INSTITUTOS = {
  id: number;
  codigo: string;
  nombre: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
}[]

export type POST_TYPE_INSTITUTO = {
  codigo: string;
  nombre: string;
}

export type GET_TYPE_INSTITUTO = {
  id: number;
  codigo: string;
  nombre: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export type PUT_TYPE_INSTITUTO = {
  codigo: string;
  nombre: string;
}

