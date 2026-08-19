import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../services/usuario';
import { Servicio } from '../../../services/servicio';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-admin.html'
})
export class DashboardAdmin implements OnInit {
  totalUsuarios = 0;
  totalServicios = 0;

  constructor(
    private usuarioService: Usuario,
    private servicioService: Servicio,
  ) {}

  ngOnInit(): void {
    this.usuarioService.listar().subscribe((u) => (this.totalUsuarios = u.length));
    this.servicioService.listar().subscribe((s) => (this.totalServicios = s.length));
  }
}
