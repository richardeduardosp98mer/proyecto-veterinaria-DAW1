import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Cita } from '../../../services/cita';
import { MascotaService } from '../../../services/mascota';
import { CitaRequest, CitaResponse } from '../../../models/cita';
import { MascotaResponse } from '../../../models/mascota';
import { GestionTabs } from '../../../shared/gestion-tabs/gestion-tabs';

@Component({
  selector: 'app-citas-vet',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, GestionTabs],
  templateUrl: './citas-vet.html',
})
export class CitasVetComponent implements OnInit {
  citas: CitaResponse[] = [];
  citasFiltradas: CitaResponse[] = [];

  private mascotasPorId = new Map<number, MascotaResponse>();

  // catálogo EstadoCita tal como está sembrado en el script SQL
  estados = [
    { id: 1, nombre: 'Pendiente' },
    { id: 2, nombre: 'Confirmada' },
    { id: 3, nombre: 'Atendida' },
    { id: 4, nombre: 'Cancelada' },
  ];

  // filtros
  texto = '';
  estadoFiltro = 'Todos los estados';

  // paginación
  paginaActual = 1;
  tamPagina = 4;

  constructor(
    private citaService: Cita,
    private mascotaService: MascotaService,
  ) {}

  ngOnInit(): void {
    this.mascotaService.listar().subscribe((mascotas) => {
      mascotas.forEach((m) => this.mascotasPorId.set(m.idMascota, m));
    });
    this.cargar();
  }

  cargar(): void {
    this.citaService.listar().subscribe((data) => {
      // más próximas primero
      this.citas = data.sort((a, b) => a.fechaHora.localeCompare(b.fechaHora));
      this.aplicarFiltros();
    });
  }

  aplicarFiltros(): void {
    const texto = this.texto.trim().toLowerCase();
    this.citasFiltradas = this.citas.filter((c) => {
      const coincideTexto = !texto || c.nombreMascota.toLowerCase().includes(texto);
      const coincideEstado =
        this.estadoFiltro === 'Todos los estados' || c.estadoCita === this.estadoFiltro;
      return coincideTexto && coincideEstado;
    });
    this.paginaActual = 1;
  }

  get citasPagina(): CitaResponse[] {
    const inicio = (this.paginaActual - 1) * this.tamPagina;
    return this.citasFiltradas.slice(inicio, inicio + this.tamPagina);
  }

  get totalPaginas(): number {
    return Math.max(1, Math.ceil(this.citasFiltradas.length / this.tamPagina));
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  get rangoTexto(): string {
    if (this.citasFiltradas.length === 0) return 'Mostrando 0 de 0';
    const inicio = (this.paginaActual - 1) * this.tamPagina + 1;
    const fin = Math.min(this.paginaActual * this.tamPagina, this.citasFiltradas.length);
    return `Mostrando ${inicio}–${fin} de ${this.citasFiltradas.length}`;
  }

  irAPagina(p: number): void {
    if (p < 1 || p > this.totalPaginas) return;
    this.paginaActual = p;
  }

  razaDe(idMascota: number): string {
    return this.mascotasPorId.get(idMascota)?.raza ?? '';
  }

  badgeClass(estado: string): string {
    return 'badge badge-' + estado.toLowerCase();
  }

  inicial(nombre: string): string {
    return nombre?.charAt(0)?.toUpperCase() ?? '?';
  }

  cambiarEstado(cita: CitaResponse, idEstadoCita: number): void {
    const request: CitaRequest = {
      idMascota: cita.idMascota,
      idVeterinario: cita.idVeterinario,
      fechaHora: cita.fechaHora,
      observaciones: cita.observaciones,
      idEstadoCita,
    };
    this.citaService.actualizar(cita.idCita, request).subscribe(() => this.cargar());
  }

  cancelar(id: number): void {
    if (!confirm('¿Cancelar esta cita?')) return;
    this.citaService.cancelar(id).subscribe(() => this.cargar());
  }
}
