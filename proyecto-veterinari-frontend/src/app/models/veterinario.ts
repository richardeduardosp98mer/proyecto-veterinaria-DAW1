export interface VeterinarioResponse {
  idVeterinario: number;
  nombre: string;
  apellido: string;
  correo: string;
  celular: string;
  especialidad: string;
  numeroColegiatura: string;
}

export interface RegistroVeterinarioRequest {
  nombre: string;
  apellido: string;
  correo: string;
  clave: string;
  celular: string;
  especialidad: string;
  numeroColegiatura: string;
}

export interface ActualizarVeterinarioRequest {
  nombre: string;
  apellido: string;
  celular: string;
}
