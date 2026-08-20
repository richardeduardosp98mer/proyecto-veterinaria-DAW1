import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HistorialMedicoRequest, HistorialMedicoResponse } from '../models/historial-medico';

@Injectable({ providedIn: 'root' })
export class HistorialMedico {
  private baseUrl = `${environment.apiUrl}/historial-medico`;

  constructor(private http: HttpClient) {}

  listarPorMascota(idMascota: number): Observable<HistorialMedicoResponse[]> {
    return this.http.get<HistorialMedicoResponse[]>(`${this.baseUrl}/mascota/${idMascota}`);
  }

  obtenerPorId(id: number): Observable<HistorialMedicoResponse> {
    return this.http.get<HistorialMedicoResponse>(`${this.baseUrl}/${id}`);
  }

  crear(historial: HistorialMedicoRequest): Observable<HistorialMedicoResponse> {
    return this.http.post<HistorialMedicoResponse>(this.baseUrl, historial);
  }

  actualizar(id: number, historial: HistorialMedicoRequest): Observable<HistorialMedicoResponse> {
    return this.http.put<HistorialMedicoResponse>(`${this.baseUrl}/${id}`, historial);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
