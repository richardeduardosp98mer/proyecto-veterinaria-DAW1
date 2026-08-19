export interface ClienteResponse {
  idCliente: number;
  nombre: string;
  apellido: string;
  correo: string;
  celular: string;
  dni: string;
  direccion: string;
}

export interface RegistroClienteRequest {
  nombre: string;
  apellido: string;
  correo: string;
  clave: string;
  celular: string;
  dni: string;
  direccion: string;
}

export interface ActualizarClienteRequest {
  nombre: string;
  apellido: string;
  celular: string;
  direccion: string;
}
