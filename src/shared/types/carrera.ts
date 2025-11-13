import { Instituto } from './instituto'
import { Coordinador } from './coordinador'
import { Plan } from './plandeestudio'

export type Nivel = 'TECNICATURA' | 'DIPLOMATURA' | 'PREGRADO' | 'GRADO' | 'POSGRADO' | 'MAESTRIA'

export type GetCarreras = {
	id: number
	codigo: string
	nombre: string
	nivel: Nivel
	activo: boolean
	created_at: string
	updated_at: string
	instituto: Instituto
	coordinador_actual: Coordinador
}

export type PostCarrera = {
	id: number
	nombre: string
	nivel: Nivel
	instituto: number
}

export type GetCarrera = {
	id: number
	codigo: string
	nombre: string
	nivel: Nivel
	esta_vigente: boolean
	coordinador_actual: Coordinador
	coordinadores_historial: Coordinador[]
	instituto: Instituto
    planes: Plan[]
    created_at: string,
    updated_at: string
}

export type PutCarrera = {
    id: number
	codigo: string
	nombre: string
	nivel: Nivel
	activo: boolean
	created_at: string
	updated_at: string
	instituto: Instituto
	coordinador_actual: Coordinador
}
