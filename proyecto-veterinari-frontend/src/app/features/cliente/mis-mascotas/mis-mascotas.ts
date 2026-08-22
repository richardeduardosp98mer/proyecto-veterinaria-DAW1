import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MascotaService } from '../../../services/mascota';
import { MascotaRequest, MascotaResponse } from '../../../models/mascota';
import { AuthService } from '../../../core/services/auth.service';
import { GestionTabs } from '../../../shared/gestion-tabs/gestion-tabs';

@Component({
  selector: 'app-mis-mascotas',
  standalone: true,
  imports: [CommonModule, FormsModule, GestionTabs],
  templateUrl: './mis-mascotas.html',
})
export class MisMascotasComponent implements OnInit {
  mascotas: MascotaResponse[] = [];
  mascotasFiltradas: MascotaResponse[] = [];
  mostrarForm = false;

  // catálogo Especie tal como está sembrado en el script SQL
  especies = [
    { id: 1, nombre: 'Perro' },
    { id: 2, nombre: 'Gato' },
    { id: 3, nombre: 'Ave' },
    { id: 4, nombre: 'Conejo' },
    { id: 5, nombre: 'Otro' },
  ];

  // filtros
  texto = '';
  estadoFiltro = 'Todos los estados';
  especieFiltro = 'Todas';

  // paginación
  paginaActual = 1;
  tamPagina = 4;

  form: Omit<MascotaRequest, 'idCliente'> = {
    idEspecie: 1,
    nombreMascota: '',
    raza: '',
    fechaNacimiento: '',
    sexo: 'M',
    peso: 0,
    observaciones: '',
  };

  constructor(
    private mascotaService: MascotaService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    const idCliente = this.authService.obtenerIdPerfil();
    this.mascotaService.listar().subscribe((data) => {
      this.mascotas = data.filter((m) => m.idCliente === idCliente);
      this.aplicarFiltros();
    });
  }

  aplicarFiltros(): void {
    const texto = this.texto.trim().toLowerCase();
    this.mascotasFiltradas = this.mascotas.filter((m) => {
      const coincideTexto =
        !texto ||
        m.nombreMascota.toLowerCase().includes(texto) ||
        m.raza.toLowerCase().includes(texto);
      const coincideEstado =
        this.estadoFiltro === 'Todos los estados' || m.estado === this.estadoFiltro;
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

  guardar(): void {
    const idCliente = this.authService.obtenerIdPerfil();
    if (!idCliente) {
      alert('No se pudo identificar tu perfil de cliente. Vuelve a iniciar sesión.');
      return;
    }

    const request: MascotaRequest = { idCliente, ...this.form };

    this.mascotaService.crear(request).subscribe(() => {
      this.mostrarForm = false;
      this.form = {
        idEspecie: 1,
        nombreMascota: '',
        raza: '',
        fechaNacimiento: '',
        sexo: 'M',
        peso: 0,
        observaciones: '',
      };
      this.cargar();
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Eliminar esta mascota?')) return;
    this.mascotaService.eliminar(id).subscribe(() => this.cargar());
  }
}
