type Asignatura = {
	id?: number
	codigo: string
	nombre: string
	activo?: boolean
	cuatrimestre: number
	tipo_asignatura: 'OBLIGATORIA' | 'OPTATIVA'
	tipo_duracion: 'ANUAL' | 'CUATRIMESTRAL'
	horas_teoria: number
	horas_practica: number
	horas_semanales: number
	horas_totales?: number
	created_at?: string
	updated_at?: string
}

export default Asignatura
