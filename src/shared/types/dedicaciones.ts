export type Dedicacion = {
	id: number;
	nombre: string;
	created_at: Date;
	updated_at: Date;
}

export type DedicacionResponse = Dedicacion;

export type DedicacionPostPayload = {
	nombre: string
}

export type DedicacionPutPayload = {
	nombre: string
};