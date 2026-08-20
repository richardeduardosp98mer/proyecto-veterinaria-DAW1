import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ActualizarVeterinarioRequest, RegistroVeterinarioRequest, VeterinarioResponse } from '../models/veterinario';

@Injectable({ providedIn: 'root' })
export class VeterinarioService {
  private baseUrl = `${environment.apiUrl}/veterinarios`;

  constructor(private http: HttpClient) {}

  registrar(veterinario: RegistroVeterinarioRequest): Observable<VeterinarioResponse> {
    return this.http.post<VeterinarioResponse>(`${this.baseUrl}/registro`, veterinario);
  }

  listar(): Observable<VeterinarioResponse[]> {
    return this.http.get<VeterinarioResponse[]>(this.baseUrl);
  }

  obtenerPorId(id: number): Observable<VeterinarioResponse> {
    return this.http.get<VeterinarioResponse>(`${this.baseUrl}/${id}`);
  }

  buscarPorEspecialidad(especialidad: string): Observable<VeterinarioResponse[]> {
    return this.http.get<VeterinarioResponse[]>(`${this.baseUrl}/buscar`, { params: { especialidad } });
  }

  buscarPorColegiatura(numeroColegiatura: string): Observable<VeterinarioResponse> {
    return this.http.get<VeterinarioResponse>(`${this.baseUrl}/colegiatura/${numeroColegiatura}`);
  }

  actualizar(id: number, veterinario: ActualizarVeterinarioRequest): Observable<VeterinarioResponse> {
    return this.http.put<VeterinarioResponse>(`${this.baseUrl}/${id}`, veterinario);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
