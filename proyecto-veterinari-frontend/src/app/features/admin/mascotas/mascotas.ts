import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MascotaService } from '../../../services/mascota';
import { MascotaResponse } from '../../../models/mascota';
import { GestionTabs } from '../../../shared/gestion-tabs/gestion-tabs';

@Component({
  selector: 'app-mascotas',
  standalone: true,
  imports: [CommonModule, GestionTabs],
  templateUrl: './mascotas.html',
  styleUrl: './mascotas.css',
})
export class Mascotas implements OnInit {
  mascotas: MascotaResponse[] = [];

  constructor(private mascotaService: MascotaService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.mascotaService.listar().subscribe((data) => (this.mascotas = data));
  }

  eliminar(id: number): void {
    if (!confirm('¿Eliminar esta mascota?')) return;
    this.mascotaService.eliminar(id).subscribe(() => this.cargar());
  }
}
