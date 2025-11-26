import { Rol } from "./rol"

// --- 1. MODELO BASE (USUARIO) ---
/**
 * Tipo base del objeto Usuario devuelto por la API.
 */
export type Usuario = {
    id: number
    legajo: string
    username: string
    email: string
    first_name: string
    last_name: string
    is_active: boolean
    password?: string | null
    password2?: string | null
    fecha_nacimiento: string | null
    celular: string | null
    roles: Rol[]
}

// --- 2. VARIANTES DE USO (Utility Types) ---

/**
 * Tipo para la lista de usuarios
 */
export type UsuarioListItem = {
    id: number
    first_name: string
    last_name: string
    roles: Rol[]
    is_active: boolean
    email: string
}

/**
 * Tipo para el formulario de Creación
 */
export type UsuarioCreateForm = {
    legajo: string
    username: string
    email: string
    first_name: string
    last_name: string
    password: string
    password2: string
    fecha_nacimiento: string
    celular: string | null
    roles: Rol[]
};

/**
 * Tipo para el formulario de Edición
 */
export type UsuarioEditForm = {
    legajo: string,
    username: string
    email: string
    first_name: string
    last_name: string
    fecha_nacimiento: string
    celular: string | null
};

// --- 3. VARIANTES DE RESPUESTA (Response Types) ---

/**
 * Tipo para la respuesta de un solo usuario (GET / POST / PUT / PATCH)
 */
export type UsuarioResponse = Usuario

// --- 4. VARIANTES DE PAYLOAD (Payload Types) ---

/**
 * Tipo para el payload de creación (POST).
 */
export type UsuarioPostPayload = {
    legajo: string
    username: string
    email: string
    first_name: string
    last_name: string
    password: string
    password2: string
    fecha_nacimiento: string | null
    celular: string | null
    roles_ids: number[] // Reemplaza 'roles: Rol[]'
}

/**
 * Tipo para el payload de edición (PUT).
 */
export type UsuarioPutPayload = {
    legajo: string
    username: string
    email: string
    first_name: string
    last_name: string
    fecha_nacimiento: string | null
    celular: string | null
    // Opcionalmente puedes agregar 'roles_ids' si PUT permite reasignar roles
    // roles_ids?: number[]
}

/**
 * Tipo para el payload de actualización (PATCH).
 */
export type UsuarioPatchPayload = {
    is_active: boolean
}