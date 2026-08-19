import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MascotaRequest, MascotaResponse } from '../models/mascota';

@Injectable({ providedIn: 'root' })
export class MascotaService {
  private baseUrl = `${environment.apiUrl}/mascotas`;

  constructor(private http: HttpClient) {}

  listar(): Observable<MascotaResponse[]> {
    return this.http.get<MascotaResponse[]>(this.baseUrl);
  }

  obtenerPorId(id: number): Observable<MascotaResponse> {
    return this.http.get<MascotaResponse>(`${this.baseUrl}/${id}`);
  }

  crear(mascota: MascotaRequest): Observable<MascotaResponse> {
    return this.http.post<MascotaResponse>(this.baseUrl, mascota);
  }

  actualizar(id: number, mascota: MascotaRequest): Observable<MascotaResponse> {
    return this.http.put<MascotaResponse>(`${this.baseUrl}/${id}`, mascota);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
