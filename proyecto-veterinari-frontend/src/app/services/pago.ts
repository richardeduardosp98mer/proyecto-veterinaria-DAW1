import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PagoRequest, PagoResponse } from '../models/pago';

@Injectable({ providedIn: 'root' })
export class Pago {
  private baseUrl = `${environment.apiUrl}/pagos`;

  constructor(private http: HttpClient) {}

  listarPorCita(idCita: number): Observable<PagoResponse[]> {
    return this.http.get<PagoResponse[]>(`${this.baseUrl}/cita/${idCita}`);
  }

  obtenerPorId(id: number): Observable<PagoResponse> {
    return this.http.get<PagoResponse>(`${this.baseUrl}/${id}`);
  }

  registrar(pago: PagoRequest): Observable<PagoResponse> {
    return this.http.post<PagoResponse>(this.baseUrl, pago);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
