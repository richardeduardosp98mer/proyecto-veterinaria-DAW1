export interface Pago {}

export interface PagoRequest {
  idCita: number;
  idMetodoPago: number;
  monto: number;
  referencia: string;
}

export interface PagoResponse {
  idPago: number;
  idCita: number;
  nombreMascota: string;
  nombreCliente: string;
  metodoPago: string;
  monto: number;
  fechaPago: string;
  referencia: string;
}
