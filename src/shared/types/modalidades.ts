export type Modalidad = {
	id: number
	nombre: string
	created_at: Date
	updated_at: Date
}

export type ModalidadResponse = Modalidad;

export type ModalidadPostPayload = {
	nombre: string
}

export type ModalidadPutPayload = {
	nombre: string
};