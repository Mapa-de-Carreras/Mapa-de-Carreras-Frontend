export interface IUsuario {
  id: number;
  username: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  is_staff: boolean;
  is_active: boolean;
  password: string;
  password2: string;
  legajo: string;
  fecha_nacimiento: string | null;
  celular?: string | null;
  roles: string[];
}