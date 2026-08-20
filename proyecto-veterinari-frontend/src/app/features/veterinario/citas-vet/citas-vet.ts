import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cita} from '../../../services/cita';
import { CitaRequest, CitaResponse } from '../../../models/cita';

@Component({
  selector: 'app-citas-vet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './citas-vet.component.html',
})
export class CitasVetComponent implements OnInit {
  citas: CitaResponse[] = [];

  // catálogo EstadoCita tal como está sembrado en el script SQL
  estados = [
    { id: 1, nombre: 'Pendiente' },
    { id: 2, nombre: 'Confirmada' },
    { id: 3, nombre: 'Atendida' },
    { id: 4, nombre: 'Cancelada' },
  ];

  constructor(private citaService: Cita) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.citaService.listar().subscribe((data) => {
      // más próximas primero
      this.citas = data.sort((a, b) => a.fechaHora.localeCompare(b.fechaHora));
    });
  }

  badgeClass(estado: string): string {
    return 'badge badge-' + estado.toLowerCase();
  }

  cambiarEstado(cita: CitaResponse, idEstadoCita: number): void {
    const request: CitaRequest = {
      idMascota: cita.idMascota,
      idVeterinario: cita.idVeterinario,
      fechaHora: cita.fechaHora,
      observaciones: cita.observaciones,
      idEstadoCita,
    };
    this.citaService.actualizar(cita.idCita, request).subscribe(() => this.cargar());
  }

  cancelar(id: number): void {
    if (!confirm('¿Cancelar esta cita?')) return;
    this.citaService.cancelar(id).subscribe(() => this.cargar());
  }
}
