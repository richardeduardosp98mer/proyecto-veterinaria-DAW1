import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cita } from '../../../services/cita';
import { MascotaService } from '../../../services/mascota';
import { CitaResponse } from '../../../models/cita';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-cliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-cliente.component.html'
})
export class DashboardClienteComponent implements OnInit {
  totalMascotas = 0;
  proximasCitas: CitaResponse[] = [];

  constructor(
    private citaService: Cita,
    private mascotaService: MascotaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const idCliente = this.authService.obtenerIdPerfil();

    this.mascotaService.listar().subscribe(mascotas => {
      this.totalMascotas = mascotas.filter(m => m.idCliente === idCliente).length;
    });

    this.citaService.listar().subscribe(citas => {
      // el backend no filtra citas por cliente directo; filtramos por las mascotas propias
      this.mascotaService.listar().subscribe(mascotas => {
        const idsMascotasPropias = mascotas.filter(m => m.idCliente === idCliente).map(m => m.idMascota);
        this.proximasCitas = citas
          .filter(c => idsMascotasPropias.includes(c.idMascota) && c.estadoCita !== 'Cancelada')
          .sort((a, b) => a.fechaHora.localeCompare(b.fechaHora))
          .slice(0, 5);
      });
    });
  }
}
