import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DetalleServicioRequest, DetalleServicioResponse } from '../models/detalle-servicio';

@Injectable({ providedIn: 'root' })
export class DetalleServicio {
  private baseUrl = `${environment.apiUrl}/detalle-servicios`;

  constructor(private http: HttpClient) {}

  listarPorCita(idCita: number): Observable<DetalleServicioResponse[]> {
    return this.http.get<DetalleServicioResponse[]>(`${this.baseUrl}/cita/${idCita}`);
  }

  agregar(detalle: DetalleServicioRequest): Observable<DetalleServicioResponse> {
    return this.http.post<DetalleServicioResponse>(this.baseUrl, detalle);
  }

  actualizar(id: number, detalle: DetalleServicioRequest): Observable<DetalleServicioResponse> {
    return this.http.put<DetalleServicioResponse>(`${this.baseUrl}/${id}`, detalle);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
