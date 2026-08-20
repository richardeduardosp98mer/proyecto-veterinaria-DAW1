import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CitaRequest, CitaResponse } from '../models/cita';

@Injectable({ providedIn: 'root' })
export class Cita {
  private baseUrl = `${environment.apiUrl}/citas`;

  constructor(private http: HttpClient) {}

  listar(): Observable<CitaResponse[]> {
    return this.http.get<CitaResponse[]>(this.baseUrl);
  }

  obtenerPorId(id: number): Observable<CitaResponse> {
    return this.http.get<CitaResponse>(`${this.baseUrl}/${id}`);
  }

  crear(cita: CitaRequest): Observable<CitaResponse> {
    return this.http.post<CitaResponse>(this.baseUrl, cita);
  }

  actualizar(id: number, cita: CitaRequest): Observable<CitaResponse> {
    return this.http.put<CitaResponse>(`${this.baseUrl}/${id}`, cita);
  }

  cancelar(id: number): Observable<CitaResponse> {
    return this.http.delete<CitaResponse>(`${this.baseUrl}/${id}`);
  }
}
