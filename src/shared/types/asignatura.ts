import { IPlanAsignatura } from "./planasignatura"

export type GET_TYPE_ASINGATURAS = {
	id: number
	codigo: string
	nombre: string
	activo: boolean
	cuatrimestre: number
	tipo_asignatura: 'OBLIGATORIA' | 'OPTATIVA'
	tipo_duracion: 'ANUAL' | 'CUATRIMESTRAL'
	created_at: string
	updated_at: string
}

export type GET_TYPE_ASIGNATURAS_LISTA = GET_TYPE_ASINGATURAS[]

export type POST_TYPE_ASIGNATURA = {
	codigo: string
	nombre: string
	cuatrimestre: number
	tipo_asignatura: 'OBLIGATORIA' | 'OPTATIVA'
	tipo_duracion: 'ANUAL' | 'CUATRIMESTRAL'
}

export type GET_TYPE_ASIGNATURA = {
	id: number
	codigo: string
	nombre: string
	activo: boolean
	cuatrimestre: number
	tipo_asignatura: 'OBLIGATORIA' | 'OPTATIVA'
	tipo_duracion: 'ANUAL' | 'CUATRIMESTRAL'
	created_at: string
	updated_at: string
	planes_asignatura?:IPlanAsignatura[]
}

export type PUT_TYPE_ASIGNATURA = {
	codigo: string
	nombre: string
	cuatrimestre: number
	tipo_asignatura: 'OBLIGATORIA' | 'OPTATIVA'
	tipo_duracion: 'ANUAL' | 'CUATRIMESTRAL'
}


export type TYPE_CORRELATIVA = {
	id: number
	codigo: string
	nombre: string
	activo: boolean
	cuatrimestre: number
	tipo_asignatura: 'OBLIGATORIA' | 'OPTATIVA'
	tipo_duracion: 'ANUAL' | 'CUATRIMESTRAL'
	created_at: string
	updated_at: string
}

export type GET_TYPE_CORRELATIVAS_ASIGNATURA = {
	id: number
	codigo: string
	nombre: string
	activo: boolean
	cuatrimestre: number
	tipo_asignatura: 'OBLIGATORIA' | 'OPTATIVA'
	tipo_duracion: 'ANUAL' | 'CUATRIMESTRAL'
	created_at: string
	updated_at: string
	correlativas: TYPE_CORRELATIVA[]
}


