import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MetodoPagoRequest, MetodoPagoResponse } from '../models/metodo-pago';

@Injectable({ providedIn: 'root' })
export class MetodoPago {
  private baseUrl = `${environment.apiUrl}/metodos-pago`;

  constructor(private http: HttpClient) {}

  listar(): Observable<MetodoPagoResponse[]> {
    return this.http.get<MetodoPagoResponse[]>(this.baseUrl);
  }

  obtenerPorId(id: number): Observable<MetodoPagoResponse> {
    return this.http.get<MetodoPagoResponse>(`${this.baseUrl}/${id}`);
  }

  crear(metodoPago: MetodoPagoRequest): Observable<MetodoPagoResponse> {
    return this.http.post<MetodoPagoResponse>(this.baseUrl, metodoPago);
  }

  actualizar(id: number, metodoPago: MetodoPagoRequest): Observable<MetodoPagoResponse> {
    return this.http.put<MetodoPagoResponse>(`${this.baseUrl}/${id}`, metodoPago);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
