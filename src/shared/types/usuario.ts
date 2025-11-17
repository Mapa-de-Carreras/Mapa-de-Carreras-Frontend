export type Usuario = {
	id: number
	username: string
	first_name?: string | null
	last_name?: string | null
	email?: string | null
	is_staff: boolean
	is_active: boolean
	password: string
	password2: string
	legajo: string
	fecha_nacimiento: string | null
	celular?: string | null
	roles: string[]
}

/**
 * Type para la respuesta del GET (Listado de todas las carreras)
 */
export type UsuarioListItem = {
	id: number
	first_name?: string | null
	last_name?: string | null
	roles: string[]
	is_staff: boolean
	is_active: boolean
}
