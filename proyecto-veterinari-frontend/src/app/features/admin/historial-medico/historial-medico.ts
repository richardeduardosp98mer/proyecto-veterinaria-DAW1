import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MascotaService } from '../../../services/mascota';
import { HistorialMedico as HistorialMedicoService } from '../../../services/historial-medico';
import { MascotaResponse } from '../../../models/mascota';
import { HistorialMedicoResponse } from '../../../models/historial-medico';
import { GestionTabs } from '../../../shared/gestion-tabs/gestion-tabs';

@Component({
  selector: 'app-historial-medico',
  standalone: true,
  imports: [CommonModule, FormsModule, GestionTabs],
  templateUrl: './historial-medico.html',
  styleUrl: './historial-medico.css',
})
export class HistorialMedico {
  mascotas: MascotaResponse[] = [];
  idMascotaSeleccionada: number | null = null;
  historial: HistorialMedicoResponse[] = [];

  constructor(
    private mascotaService: MascotaService,
    private historialService: HistorialMedicoService,
  ) {
    this.mascotaService.listar().subscribe((data) => (this.mascotas = data));
  }

  buscar(): void {
    if (!this.idMascotaSeleccionada) return;
    this.historialService
      .listarPorMascota(this.idMascotaSeleccionada)
      .subscribe((data) => (this.historial = data));
  }
}
