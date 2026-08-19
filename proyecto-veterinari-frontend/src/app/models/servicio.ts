export interface Servicio {}

export interface ServicioRequest {
  nombreServicio: string;
  descripcion: string;
  precio: number;
  duracionMinutos: number;
}

export interface ServicioResponse {
  idServicio: number;
  nombreServicio: string;
  descripcion: string;
  precio: number;
  duracionMinutos: number;
  estado: string;
}
