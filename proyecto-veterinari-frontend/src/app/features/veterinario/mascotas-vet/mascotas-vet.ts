import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MascotaService } from '../../../services/mascota';
import { MascotaResponse } from '../../../models/mascota';
import { GestionTabs } from '../../../shared/gestion-tabs/gestion-tabs';

@Component({
  selector: 'app-mascotas-vet',
  standalone: true,
  imports: [CommonModule, FormsModule, GestionTabs],
  templateUrl: './mascotas-vet.html',
})
export class MascotasVetComponent implements OnInit {
  mascotas: MascotaResponse[] = [];
  mascotasFiltradas: MascotaResponse[] = [];

  // filtros
  texto = '';
  estadoFiltro = 'Todos los estados';
  especieFiltro = 'Todas';

  // paginación
  paginaActual = 1;
  tamPagina = 4;

  constructor(
    private mascotaService: MascotaService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.mascotaService.listar().subscribe((data) => {
      this.mascotas = data;
      this.aplicarFiltros();
    });
  }

  get especies(): string[] {
    return Array.from(new Set(this.mascotas.map((m) => m.especie))).sort();
  }

  aplicarFiltros(): void {
    const texto = this.texto.trim().toLowerCase();
    this.mascotasFiltradas = this.mascotas.filter((m) => {
      const coincideTexto =
        !texto ||
        m.nombreMascota.toLowerCase().includes(texto) ||
        m.nombreCliente.toLowerCase().includes(texto);
      const coincideEstado = this.estadoFiltro === 'Todos los estados' || m.estado === this.estadoFiltro;
      const coincideEspecie = this.especieFiltro === 'Todas' || m.especie === this.especieFiltro;
      return coincideTexto && coincideEstado && coincideEspecie;
    });
    this.paginaActual = 1;
  }

  get mascotasPagina(): MascotaResponse[] {
    const inicio = (this.paginaActual - 1) * this.tamPagina;
    return this.mascotasFiltradas.slice(inicio, inicio + this.tamPagina);
  }

  get totalPaginas(): number {
    return Math.max(1, Math.ceil(this.mascotasFiltradas.length / this.tamPagina));
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  get rangoTexto(): string {
    if (this.mascotasFiltradas.length === 0) return 'Mostrando 0 de 0';
    const inicio = (this.paginaActual - 1) * this.tamPagina + 1;
    const fin = Math.min(this.paginaActual * this.tamPagina, this.mascotasFiltradas.length);
    return `Mostrando ${inicio}–${fin} de ${this.mascotasFiltradas.length}`;
  }

  irAPagina(p: number): void {
    if (p < 1 || p > this.totalPaginas) return;
    this.paginaActual = p;
  }

  edad(fechaNacimiento: string): string {
    if (!fechaNacimiento) return '';
    const nacimiento = new Date(fechaNacimiento);
    const años = Math.floor((Date.now() - nacimiento.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
    return años <= 0 ? 'menos de 1 año' : años + (años === 1 ? ' año' : ' años');
  }

  badgeClass(estado: string): string {
    return 'badge badge-' + estado.toLowerCase();
  }

  inicial(especie: string): string {
    return especie?.charAt(0)?.toUpperCase() ?? '?';
  }

  verHistorial(idMascota: number): void {
    this.router.navigate(['/veterinario/historial-medico'], { queryParams: { idMascota } });
  }
}
