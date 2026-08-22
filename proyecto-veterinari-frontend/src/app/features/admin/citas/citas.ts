import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cita } from '../../../services/cita';
import { CitaResponse } from '../../../models/cita';
import { GestionTabs } from '../../../shared/gestion-tabs/gestion-tabs';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, GestionTabs],
  templateUrl: './citas.html',
  styleUrl: './citas.css',
})
export class Citas implements OnInit {
  citas: CitaResponse[] = [];

  constructor(private citaService: Cita) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.citaService.listar().subscribe((data) => {
      this.citas = data.sort((a, b) => b.fechaHora.localeCompare(a.fechaHora));
    });
  }

  badgeClass(estado: string): string {
    return 'badge badge-' + estado.toLowerCase();
  }

  cancelar(id: number): void {
    if (!confirm('¿Cancelar esta cita?')) return;
    this.citaService.cancelar(id).subscribe(() => this.cargar());
  }
}
