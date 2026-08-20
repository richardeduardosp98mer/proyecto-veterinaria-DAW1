import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistorialMedico } from '../../../services/historial-medico';
import {
  HistorialMedicoRequest,
  HistorialMedicoResponse,
} from '../../../models/historial-medico';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-historial-medico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historial-medico.html',
})
export class HistorialMedicoComponent {
  idMascotaBuscar: number | null = null;
  historial: HistorialMedicoResponse[] = [];
  mostrarForm = false;
  buscado = false;

  form: Omit<HistorialMedicoRequest, 'idVeterinario' | 'idMascota'> = {
    diagnostico: '',
    tratamiento: '',
    peso: 0,
    temperatura: 0,
    observaciones: '',
  };

  constructor(
    private historialService: HistorialMedico,
    private authService: AuthService,
  ) {}

  buscar(): void {
    if (!this.idMascotaBuscar) return;
    this.buscado = true;
    this.historialService
      .listarPorMascota(this.idMascotaBuscar)
      .subscribe((data) => (this.historial = data));
  }

  guardar(): void {
    if (!this.idMascotaBuscar) return;

    const idVeterinario = this.authService.obtenerIdPerfil();
    if (!idVeterinario) {
      alert('No se pudo identificar tu perfil de veterinario. Vuelve a iniciar sesión.');
      return;
    }

    const request: HistorialMedicoRequest = {
      idMascota: this.idMascotaBuscar,
      idVeterinario,
      ...this.form,
    };

    this.historialService.crear(request).subscribe(() => {
      this.mostrarForm = false;
      this.form = { diagnostico: '', tratamiento: '', peso: 0, temperatura: 0, observaciones: '' };
      this.buscar();
    });
  }
}
