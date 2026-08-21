export interface DetalleServicio {}

export interface DetalleServicioRequest {
  idCita: number;
  idServicio: number;
  cantidad: number;
  observaciones: string;
}

export interface DetalleServicioResponse {
  idDetalleServicio: number;
  idCita: number;
  nombreServicio: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  observaciones: string;
}


