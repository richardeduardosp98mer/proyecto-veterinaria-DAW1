import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, tap, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse, Rol } from '../../models/auth';
import { ClienteService } from '../../services/cliente';
import { Veterinario } from '../../services/veterinario';

const STORAGE_KEY = 'usuario';
const PERFIL_KEY = 'idPerfil';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient,
    private clienteService: ClienteService,
    private veterinarioService: Veterinario
  ) {}

  login(credenciales: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credenciales).pipe(
      tap(res => localStorage.setItem(STORAGE_KEY, JSON.stringify(res))),
      switchMap(res => this.resolverIdPerfil(res).pipe(switchMap(() => of(res))))
    );
  }

  private resolverIdPerfil(res: LoginResponse): Observable<void> {
    if (res.rol === 'Cliente') {
      return new Observable<void>(observer => {
        this.clienteService.listar().subscribe(clientes => {
          const propio = clientes.find(c => c.correo === res.correo);
          if (propio) localStorage.setItem(PERFIL_KEY, String(propio.idCliente));
          observer.next();
          observer.complete();
        });
      });
    }

    if (res.rol === 'Veterinario') {
      return new Observable<void>(observer => {
        this.veterinarioService.listar().subscribe(veterinarios => {
          const propio = veterinarios.find(v => v.correo === res.correo);
          if (propio) localStorage.setItem(PERFIL_KEY, String(propio.idVeterinario));
          observer.next();
          observer.complete();
        });
      });
    }

    return of(undefined);
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PERFIL_KEY);
  }

  estaLogueado(): boolean {
    return !!localStorage.getItem(STORAGE_KEY);
  }

  obtenerUsuario(): LoginResponse | null {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) as LoginResponse : null;
  }

  // idCliente si el rol es Cliente, idVeterinario si el rol es Veterinario, null si es Admin o no resuelto aún
  obtenerIdPerfil(): number | null {
    const data = localStorage.getItem(PERFIL_KEY);
    return data ? Number(data) : null;
  }

  obtenerRol(): Rol | null {
    return this.obtenerUsuario()?.rol ?? null;
  }

  tieneRol(...roles: Rol[]): boolean {
    const rolActual = this.obtenerRol();
    return rolActual !== null && roles.includes(rolActual);
  }

  // ruta de inicio según el rol, usada tras el login y por el guard de rol
  rutaHomePorRol(): string {
    switch (this.obtenerRol()) {
      case 'Admin': return '/admin';
      case 'Veterinario': return '/veterinario';
      case 'Cliente': return '/cliente';
      default: return '/login';
    }
  }

}
