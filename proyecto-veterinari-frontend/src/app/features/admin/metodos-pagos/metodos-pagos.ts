import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MetodoPago } from '../../../services/metodo-pago';
import { MetodoPagoResponse } from '../../../models/metodo-pago';
import { GestionTabs } from '../../../shared/gestion-tabs/gestion-tabs';

@Component({
  selector: 'app-metodos-pagos',
  standalone: true,
  imports: [CommonModule, FormsModule, GestionTabs],
  templateUrl: './metodos-pagos.html',
})
export class MetodosPagos {
  metodos: MetodoPagoResponse[] = [];
  nuevoNombre = '';

  constructor(private metodoPagoService: MetodoPago) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.metodoPagoService.listar().subscribe((data) => (this.metodos = data));
  }

  agregar(): void {
    if (!this.nuevoNombre.trim()) return;
    this.metodoPagoService.crear({ nombreMetodoPago: this.nuevoNombre }).subscribe(() => {
      this.nuevoNombre = '';
      this.cargar();
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Eliminar este método de pago?')) return;
    this.metodoPagoService.eliminar(id).subscribe(() => this.cargar());
  }
}
