export interface Cita {}

export interface CitaRequest {
  idMascota: number;
  idVeterinario: number;
  fechaHora: string; // ISO 8601: "2026-08-15T10:30:00"
  observaciones?: string;
  idEstadoCita?: number; // 1=Pendiente, 2=Confirmada, 3=Atendida, 4=Cancelada
}

export interface CitaResponse {
  idCita: number;
  idMascota: number;
  nombreMascota: string;
  idVeterinario: number;
  nombreVeterinario: string;
  fechaHora: string;
  estadoCita: string;
  observaciones: string;
  fechaRegistro: string;
}
