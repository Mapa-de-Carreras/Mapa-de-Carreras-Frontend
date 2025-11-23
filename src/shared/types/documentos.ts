export interface IDocumento {
  id?: number;          
  tipo?: string | null;  
  emisor?: string | null; 
  numero?: string | null; 
  anio?: number | null;   
  created_at?: string;   
}