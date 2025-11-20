import { Rol } from "./rol"

export type Usuario = {
	id: number
	username: string
	first_name?: string | null
	last_name?: string | null
	email?: string | null
	is_active: boolean
	password: string
	password2: string
	legajo: string
	fecha_nacimiento: string | null
	celular?: string | null
	roles: Rol[]
}

/**
 * Type para la respuesta del GET (Listado de todas las carreras)
 */
export type UsuarioListItem = Pick<
  Usuario,
  'id' | 'first_name' | 'last_name' | 'roles' | 'is_active'
>
