export interface HistorialMedico {}

export interface HistorialMedicoRequest {
  idMascota: number;
  idVeterinario: number;
  idCita?: number;
  diagnostico: string;
  tratamiento: string;
  peso: number;
  temperatura: number;
  observaciones: string;
}

export interface HistorialMedicoResponse {
  idHistorial: number;
  idMascota: number;
  nombreMascota: string;
  idVeterinario: number;
  nombreVeterinario: string;
  idCita: number | null;
  fechaConsulta: string;
  diagnostico: string;
  tratamiento: string;
  peso: number;
  temperatura: number;
  observaciones: string;
}
