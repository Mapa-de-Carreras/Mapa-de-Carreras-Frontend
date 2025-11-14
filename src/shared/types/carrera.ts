// Importa los types que acabamos de definir
import { Instituto } from './instituto';
import { CoordinadorActual, CoordinadorHistorial } from './coordinador';
import { PlanDeEstudio } from './plandeestudio';

// El Enum para los niveles (basado en tus ejemplos)
export type Nivel = 
  | 'TECNICATURA' 
  | 'DIPLOMATURA' 
  | 'PREGRADO' 
  | 'GRADO' 
  | 'POSGRADO' 
  | 'MAESTRIA';

// --- Types de RESPUESTA (Lo que recibes del GET) ---

/**
 * Type para la respuesta del GET (Listado de todas las carreras)
 * Basado en tu JSON de GET.
 */
export type CarreraListItem = {
  id: number;
  codigo: string;
  nombre: string;
  nivel: Nivel;
  esta_vigente: boolean;
  created_at: string;
  updated_at: string;
  instituto: Instituto;
  // 'coordinador_actual' no está en tu JSON de lista, lo cual es normal.
};

/**
 * Type para la respuesta del GET por ID (Detalle de una carrera)
 * Basado en tu JSON de GET por ID. Es el más completo.
 */
export type CarreraDetail = {
  id: number;
  codigo: string;
  nombre: string;
  nivel: Nivel;
  esta_vigente: boolean;
  coordinador_actual: CoordinadorActual;
  coordinadores_historial: CoordinadorHistorial[];
  instituto: Instituto;
  planes: PlanDeEstudio[];
  created_at: string;
  updated_at: string;
};

// --- Types de PAYLOAD (Lo que envías al POST/PUT) ---

/**
 * Type para el PAYLOAD de un POST (Crear una carrera)
 * Basado en tu JSON de POST.
 */
export type CarreraPostPayload = {
  codigo: string;
  nombre: string;
  nivel: Nivel;
  instituto_id: number; // Envías solo el ID
};

/**
 * Type para el PAYLOAD de un PUT (Actualizar una carrera)
 * Basado en tu JSON de PUT. (Es idéntico al POST)
 */
export type CarreraPutPayload = {
  codigo: string;
  nombre: string;
  nivel: Nivel;
  instituto_id: number;
};