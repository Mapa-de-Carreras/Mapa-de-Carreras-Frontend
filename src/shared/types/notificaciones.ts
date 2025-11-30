export type NotificacionDetalle = {
    id: number;
    titulo: string;
    mensaje: string;
    tipo: 'INFO' | 'ALERTA' | 'ADVERTENCIA' | 'SISTEMA';
    fecha_creacion: string;
}

export type UsuarioNotificacion = {
    id: number;                 
    titulo: string;             
    mensaje: string;            
    tipo: 'INFO' | 'ALERTA' | 'ADVERTENCIA' | 'SISTEMA';
    emitido_por: string;        
    fecha_emision: string;      
    leida: boolean;
    fecha_recordatorio: string | null;
}

export type NotificacionesResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: UsuarioNotificacion[];
}

