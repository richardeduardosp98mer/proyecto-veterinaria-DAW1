import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cita } from '../../../services/cita';
import { CitaResponse } from '../../../models/cita';

@Component({
  selector: 'app-dashboard-vet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-vet.html',
})
export class DashboardVetComponent implements OnInit {
  citasHoy: CitaResponse[] = [];
  totalPendientes = 0;

  constructor(private citaService: Cita) {}

  ngOnInit(): void {
    this.citaService.listar().subscribe((citas) => {
      const hoy = new Date().toDateString();
      this.citasHoy = citas.filter((c) => new Date(c.fechaHora).toDateString() === hoy);
      this.totalPendientes = citas.filter((c) => c.estadoCita === 'Pendiente').length;
    });
  }
}
