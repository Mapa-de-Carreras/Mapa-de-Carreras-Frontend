// Type para el objeto 'coordinador_actual'
export type CoordinadorActual = {
  id: number;
  username: string;
  nombre_completo: string;
  email: string;
  fecha_inicio: string;
};

// Type para los objetos DENTRO del array 'coordinadores_historial'
export type CoordinadorHistorial = {
  id: number;
  username: string;
  nombre_completo: string;
  email: string;
  fecha_inicio: string;
  fecha_fin: string | null;
  activo: boolean;
};