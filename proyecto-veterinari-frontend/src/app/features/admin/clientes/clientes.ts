import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../../services/cliente';
import { ClienteResponse } from '../../../models/cliente';
import { GestionTabs } from '../../../shared/gestion-tabs/gestion-tabs';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, GestionTabs],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
})
export class Clientes implements OnInit {
  clientes: ClienteResponse[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.clienteService.listar().subscribe((data) => (this.clientes = data));
  }

  eliminar(id: number): void {
    if (!confirm('¿Eliminar este cliente?')) return;
    this.clienteService.eliminar(id).subscribe(() => this.cargar());
  }
}
