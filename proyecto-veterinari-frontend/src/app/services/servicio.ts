import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ServicioRequest, ServicioResponse } from '../models/servicio';

@Injectable({ providedIn: 'root' })
export class Servicio {
  private baseUrl = `${environment.apiUrl}/servicios`;

  constructor(private http: HttpClient) {}

  listar(): Observable<ServicioResponse[]> {
    return this.http.get<ServicioResponse[]>(this.baseUrl);
  }

  obtenerPorId(id: number): Observable<ServicioResponse> {
    return this.http.get<ServicioResponse>(`${this.baseUrl}/${id}`);
  }

  crear(servicio: ServicioRequest): Observable<ServicioResponse> {
    return this.http.post<ServicioResponse>(this.baseUrl, servicio);
  }

  actualizar(id: number, servicio: ServicioRequest): Observable<ServicioResponse> {
    return this.http.put<ServicioResponse>(`${this.baseUrl}/${id}`, servicio);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
