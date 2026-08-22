import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cita } from '../../../services/cita';
import { MascotaService } from '../../../services/mascota';
import { ClienteService } from '../../../services/cliente';
import { CitaResponse } from '../../../models/cita';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.css',
})
export class DashboardAdmin implements OnInit {
  citasHoy = 0;
  totalMascotas = 0;
  totalClientes = 0;

  citasRecientes: CitaResponse[] = [];
  resumenEstados: { estado: string; cantidad: number; clase: string }[] = [];

  constructor(
    private citaService: Cita,
    private mascotaService: MascotaService,
    private clienteService: ClienteService,
  ) {}

  ngOnInit(): void {
    this.mascotaService.listar().subscribe((data) => (this.totalMascotas = data.length));
    this.clienteService.listar().subscribe((data) => (this.totalClientes = data.length));

    this.citaService.listar().subscribe((data) => {
      const hoy = new Date().toDateString();
      this.citasHoy = data.filter((c) => new Date(c.fechaHora).toDateString() === hoy).length;

      this.citasRecientes = [...data]
        .sort((a, b) => b.fechaHora.localeCompare(a.fechaHora))
        .slice(0, 5);

      const conteo: Record<string, number> = {};
      data.forEach((c) => (conteo[c.estadoCita] = (conteo[c.estadoCita] ?? 0) + 1));

      this.resumenEstados = Object.entries(conteo).map(([estado, cantidad]) => ({
        estado,
        cantidad,
        clase: 'badge-' + estado.toLowerCase(),
      }));
    });
  }
}
