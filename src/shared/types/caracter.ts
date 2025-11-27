export type Caracter = {
	id: number
	nombre: string
	created_at: Date
	updated_at: Date
}

export type CaracterResponse = Caracter;

export type CaracterPostPayload = {
	nombre: string
}

export type CaracterPutPayload = {
	nombre: string
};