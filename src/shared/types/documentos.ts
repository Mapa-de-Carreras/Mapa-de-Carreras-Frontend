export interface IDocumento {
  id?: number;          
  tipo?: string | null;  
  emisor?: string | null; 
  numero?: string | null; 
  anio?: number | null;   
  created_at?: string;   
}

export interface IDocumentoDetalle {
  id: number;
  tipo: string;
  emisor: string;
  numero: string;
  anio: number;
  archivo: string;       
  archivo_url: string;  
  created_at: string;   
}