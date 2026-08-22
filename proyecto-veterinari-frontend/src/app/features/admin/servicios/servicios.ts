import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Servicio } from '../../../services/servicio';
import { ServicioRequest, ServicioResponse } from '../../../models/servicio';
import { GestionTabs } from '../../../shared/gestion-tabs/gestion-tabs';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule, GestionTabs],
  templateUrl: './servicios.html',
})
export class Servicios implements OnInit {
  servicios: ServicioResponse[] = [];
  mostrarForm = false;
  editandoId: number | null = null;

  form: ServicioRequest = { nombreServicio: '', descripcion: '', precio: 0, duracionMinutos: 30 };

  constructor(private servicioService: Servicio) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.servicioService.listar().subscribe((data) => (this.servicios = data));
  }

  nuevo(): void {
    this.editandoId = null;
    this.form = { nombreServicio: '', descripcion: '', precio: 0, duracionMinutos: 30 };
    this.mostrarForm = true;
  }

  editar(s: ServicioResponse): void {
    this.editandoId = s.idServicio;
    this.form = {
      nombreServicio: s.nombreServicio,
      descripcion: s.descripcion,
      precio: s.precio,
      duracionMinutos: s.duracionMinutos,
    };
    this.mostrarForm = true;
  }

  guardar(): void {
    const obs = this.editandoId
      ? this.servicioService.actualizar(this.editandoId, this.form)
      : this.servicioService.crear(this.form);

    obs.subscribe(() => {
      this.mostrarForm = false;
      this.cargar();
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Eliminar este servicio?')) return;
    this.servicioService.eliminar(id).subscribe(() => this.cargar());
  }
}
