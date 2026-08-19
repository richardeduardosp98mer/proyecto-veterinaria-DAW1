export interface MascotaRequest {
  idCliente: number;
  idEspecie: number;
  nombreMascota: string;
  raza: string;
  fechaNacimiento: string; // ISO date "yyyy-MM-dd"
  sexo: 'M' | 'H';
  peso: number;
  observaciones: string;
}

export interface MascotaResponse {
  idMascota: number;
  nombreMascota: string;
  especie: string;
  raza: string;
  fechaNacimiento: string;
  sexo: string;
  peso: number;
  observaciones: string;
  estado: string;
  idCliente: number;
  nombreCliente: string;
}
