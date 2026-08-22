import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HistorialMedico } from '../../../services/historial-medico';
import { MascotaService } from '../../../services/mascota';
import {
  HistorialMedicoRequest,
  HistorialMedicoResponse,
} from '../../../models/historial-medico';
import { MascotaResponse } from '../../../models/mascota';
import { AuthService } from '../../../core/services/auth.service';
import { GestionTabs } from '../../../shared/gestion-tabs/gestion-tabs';

@Component({
  selector: 'app-historial-medico',
  standalone: true,
  imports: [CommonModule, FormsModule, GestionTabs],
  templateUrl: './historial-medico.html',
})
export class HistorialMedicoComponent implements OnInit {
  mascotas: MascotaResponse[] = [];
  historial: HistorialMedicoResponse[] = [];
  historialFiltrado: HistorialMedicoResponse[] = [];
  cargando = true;
  mostrarForm = false;

  // filtros
  texto = '';
  mascotaFiltro = 0;

  // paginación
  paginaActual = 1;
  tamPagina = 4;

  form: Omit<HistorialMedicoRequest, 'idVeterinario'> = {
    idMascota: 0,
    diagnostico: '',
    tratamiento: '',
    peso: 0,
    temperatura: 0,
    observaciones: '',
  };

  constructor(
    private historialService: HistorialMedico,
    private mascotaService: MascotaService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const idMascotaParam = Number(this.route.snapshot.queryParamMap.get('idMascota'));

    this.mascotaService.listar().subscribe((mascotas) => {
      this.mascotas = mascotas;
      if (idMascotaParam) {
        this.form.idMascota = idMascotaParam;
        this.mascotaFiltro = idMascotaParam;
        this.mostrarForm = true;
      }
      this.cargarHistorial();
    });
  }

  cargarHistorial(): void {
    this.cargando = true;

    if (this.mascotas.length === 0) {
      this.historial = [];
      this.aplicarFiltros();
      this.cargando = false;
      return;
    }

    forkJoin(
      this.mascotas.map((m) =>
        this.historialService.listarPorMascota(m.idMascota).pipe(catchError(() => of([]))),
      ),
    ).subscribe((listas) => {
      this.historial = listas
        .flat()
        .sort((a, b) => b.fechaConsulta.localeCompare(a.fechaConsulta));
      this.aplicarFiltros();
      this.cargando = false;
    });
  }

  aplicarFiltros(): void {
    const texto = this.texto.trim().toLowerCase();
    this.historialFiltrado = this.historial.filter((h) => {
      const coincideTexto =
        !texto ||
        h.nombreMascota.toLowerCase().includes(texto) ||
        h.diagnostico.toLowerCase().includes(texto);
      const coincideMascota = !this.mascotaFiltro || h.idMascota === this.mascotaFiltro;
      return coincideTexto && coincideMascota;
    });
    this.paginaActual = 1;
  }

  get historialPagina(): HistorialMedicoResponse[] {
    const inicio = (this.paginaActual - 1) * this.tamPagina;
    return this.historialFiltrado.slice(inicio, inicio + this.tamPagina);
  }

  get totalPaginas(): number {
    return Math.max(1, Math.ceil(this.historialFiltrado.length / this.tamPagina));
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  get rangoTexto(): string {
    if (this.historialFiltrado.length === 0) return 'Mostrando 0 de 0';
    const inicio = (this.paginaActual - 1) * this.tamPagina + 1;
    const fin = Math.min(this.paginaActual * this.tamPagina, this.historialFiltrado.length);
    return `Mostrando ${inicio}–${fin} de ${this.historialFiltrado.length}`;
  }

  irAPagina(p: number): void {
    if (p < 1 || p > this.totalPaginas) return;
    this.paginaActual = p;
  }

  inicial(nombre: string): string {
    return nombre?.charAt(0)?.toUpperCase() ?? '?';
  }

  guardar(): void {
    if (!this.form.idMascota) {
      alert('Selecciona una mascota.');
      return;
    }

    const idVeterinario = this.authService.obtenerIdPerfil();
    if (!idVeterinario) {
      alert('No se pudo identificar tu perfil de veterinario. Vuelve a iniciar sesión.');
      return;
    }

    const request: HistorialMedicoRequest = { idVeterinario, ...this.form };

    this.historialService.crear(request).subscribe(() => {
      this.mostrarForm = false;
      this.form = {
        idMascota: 0,
        diagnostico: '',
        tratamiento: '',
        peso: 0,
        temperatura: 0,
        observaciones: '',
      };
      this.cargarHistorial();
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Eliminar este registro del historial?')) return;
    this.historialService.eliminar(id).subscribe(() => this.cargarHistorial());
  }
}
