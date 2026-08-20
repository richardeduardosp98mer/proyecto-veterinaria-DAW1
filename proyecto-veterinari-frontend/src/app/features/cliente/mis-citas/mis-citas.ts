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

@Component({
  selector: 'app-mis-citas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mis-citas.component.html'
})
export class MisCitasComponent implements OnInit {
  citas: CitaResponse[] = [];
  misMascotas: MascotaResponse[] = [];
  veterinarios: VeterinarioResponse[] = [];
  mostrarForm = false;

  form: CitaRequest = { idMascota: 0, idVeterinario: 0, fechaHora: '', observaciones: '' };

  constructor(
    private citaService: Cita,
    private mascotaService: MascotaService,
    private veterinarioService: VeterinarioService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const idCliente = this.authService.obtenerIdPerfil();

    this.mascotaService.listar().subscribe(mascotas => {
      this.misMascotas = mascotas.filter(m => m.idCliente === idCliente);
    });

    this.veterinarioService.listar().subscribe(data => this.veterinarios = data);

    this.cargarCitas();
  }

  cargarCitas(): void {
    const idCliente = this.authService.obtenerIdPerfil();
    this.citaService.listar().subscribe(citas => {
      this.mascotaService.listar().subscribe(mascotas => {
        const idsPropias = mascotas.filter(m => m.idCliente === idCliente).map(m => m.idMascota);
        this.citas = citas
          .filter(c => idsPropias.includes(c.idMascota))
          .sort((a, b) => b.fechaHora.localeCompare(a.fechaHora));
      });
    });
  }

  badgeClass(estado: string): string {
    return 'badge badge-' + estado.toLowerCase();
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
