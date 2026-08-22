import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cita } from '../../../services/cita';
import { Pago as PagoService } from '../../../services/pago';
import { CitaResponse } from '../../../models/cita';
import { PagoResponse } from '../../../models/pago';
import { GestionTabs } from '../../../shared/gestion-tabs/gestion-tabs';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule, FormsModule, GestionTabs],
  templateUrl: './pagos.html',
  styleUrl: './pagos.css',
})
export class Pagos implements OnInit {
  citas: CitaResponse[] = [];
  idCitaSeleccionada: number | null = null;
  pagos: PagoResponse[] = [];

  constructor(
    private citaService: Cita,
    private pagoService: PagoService,
  ) {}

  ngOnInit(): void {
    // Pago se consulta por cita (no hay un "listar todos" en el backend),
    // así que primero se elige la cita y luego se traen sus pagos.
    this.citaService.listar().subscribe((data) => (this.citas = data));
  }

  buscar(): void {
    if (!this.idCitaSeleccionada) return;
    this.pagoService
      .listarPorCita(this.idCitaSeleccionada)
      .subscribe((data) => (this.pagos = data));
  }

  eliminar(id: number): void {
    if (!confirm('¿Eliminar este pago?')) return;
    this.pagoService.eliminar(id).subscribe(() => this.buscar());
  }
}
