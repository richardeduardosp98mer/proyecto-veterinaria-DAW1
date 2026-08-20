// Roles tal como los devuelve el backend en LoginResponse.rol / UsuarioResponse.rol
export type Rol = 'Admin' | 'Veterinario' | 'Cliente';

export interface Auth {}

export interface LoginRequest {
  correo: string;
  clave: string;
}

export interface LoginResponse {
  idUsuario: number;
  nombre: string;
  apellido: string;
  correo: string;
  rol: Rol;
}

export interface UsuarioResponse {
  idUsuario: number;
  nombre: string;
  apellido: string;
  correo: string;
  celular: string;
  rol: string;
  estado: string;
}

export interface UsuarioRegistroRequest {
  nombre: string;
  apellido: string;
  correo: string;
  clave: string;
  celular: string;
  idRol: number; // 1=Admin, 2=Veterinario, 3=Cliente
}

export interface ActualizarUsuarioRequest {
  nombre: string;
  apellido: string;
  celular: string;
}

export interface CambiarClaveRequest {
  claveActual: string;
  claveNueva: string;
}


