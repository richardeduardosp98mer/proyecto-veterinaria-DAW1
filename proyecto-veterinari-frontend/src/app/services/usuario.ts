import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {ActualizarUsuarioRequest, UsuarioRegistroRequest, UsuarioResponse } from '../models/auth';


@Injectable({ providedIn: 'root' })
export class Usuario {
  private baseUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  registrar(usuario: UsuarioRegistroRequest): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(`${this.baseUrl}/registro`, usuario);
  }

  listar(): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(this.baseUrl);
  }

  obtenerPorId(id: number): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(`${this.baseUrl}/${id}`);
  }

  actualizar(id: number, usuario: ActualizarUsuarioRequest): Observable<UsuarioResponse> {
    return this.http.put<UsuarioResponse>(`${this.baseUrl}/${id}`, usuario);
  }

  cambiarClave(id: number, claveActual: string, claveNueva: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/clave`, { claveActual, claveNueva });
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
