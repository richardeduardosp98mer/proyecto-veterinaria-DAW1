import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cita } from '../../../services/cita';
import { MascotaService } from '../../../services/mascota';
import { VeterinarioService } from '../../../services/veterinario';
import { CitaRequest, CitaResponse } from '../../../models/cita';
import { MascotaResponse } from '../../../models/mascota';
import { VeterinarioResponse } from '../../../models/veterinario';
import { AuthService } from '../../../core/services/auth.service';
import { GestionTabs } from '../../../shared/gestion-tabs/gestion-tabs';

@Component({
  selector: 'app-mis-citas',
  standalone: true,
  imports: [CommonModule, FormsModule, GestionTabs],
  templateUrl: './mis-citas.html',
})
export class MisCitasComponent implements OnInit {
  citas: CitaResponse[] = [];
  citasFiltradas: CitaResponse[] = [];
  misMascotas: MascotaResponse[] = [];
  veterinarios: VeterinarioResponse[] = [];
  mostrarForm = false;

  private mascotasPorId = new Map<number, MascotaResponse>();

  // filtros
  texto = '';
  estadoFiltro = 'Todos los estados';
  veterinarioFiltro = 'Todos';
  estados = ['Todos los estados', 'Pendiente', 'Confirmada', 'Atendida', 'Cancelada'];

  // paginación
  paginaActual = 1;
  tamPagina = 4;

  form: CitaRequest = { idMascota: 0, idVeterinario: 0, fechaHora: '', observaciones: '' };

  constructor(
    private citaService: Cita,
    private mascotaService: MascotaService,
    private veterinarioService: VeterinarioService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const idCliente = this.authService.obtenerIdPerfil();

    this.mascotaService.listar().subscribe((mascotas) => {
      this.misMascotas = mascotas.filter((m) => m.idCliente === idCliente);
      this.misMascotas.forEach((m) => this.mascotasPorId.set(m.idMascota, m));
    });

    this.veterinarioService.listar().subscribe((data) => (this.veterinarios = data));

    this.cargarCitas();
  }

  cargarCitas(): void {
    const idCliente = this.authService.obtenerIdPerfil();
    this.citaService.listar().subscribe((citas) => {
      this.mascotaService.listar().subscribe((mascotas) => {
        const idsPropias = mascotas
          .filter((m) => m.idCliente === idCliente)
          .map((m) => m.idMascota);
        this.citas = citas
          .filter((c) => idsPropias.includes(c.idMascota))
          .sort((a, b) => b.fechaHora.localeCompare(a.fechaHora));
        this.aplicarFiltros();
      });
    });
  }

  aplicarFiltros(): void {
    const texto = this.texto.trim().toLowerCase();
    this.citasFiltradas = this.citas.filter((c) => {
      const coincideTexto =
        !texto ||
        c.nombreMascota.toLowerCase().includes(texto) ||
        c.nombreVeterinario.toLowerCase().includes(texto);
      const coincideEstado =
        this.estadoFiltro === 'Todos los estados' || c.estadoCita === this.estadoFiltro;
      const coincideVet =
        this.veterinarioFiltro === 'Todos' || c.nombreVeterinario === this.veterinarioFiltro;
      return coincideTexto && coincideEstado && coincideVet;
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

  agendar(): void {
    if (!this.form.idMascota || !this.form.idVeterinario || !this.form.fechaHora) {
      alert('Completa mascota, veterinario y fecha/hora.');
      return;
    }

    this.citaService.crear(this.form).subscribe(() => {
      this.mostrarForm = false;
      this.form = { idMascota: 0, idVeterinario: 0, fechaHora: '', observaciones: '' };
      this.cargarCitas();
    });
  }

  cancelar(id: number): void {
    if (!confirm('¿Cancelar esta cita?')) return;
    this.citaService.cancelar(id).subscribe(() => this.cargarCitas());
  }
}
