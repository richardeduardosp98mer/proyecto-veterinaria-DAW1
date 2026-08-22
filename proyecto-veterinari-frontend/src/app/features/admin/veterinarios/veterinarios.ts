import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VeterinarioService } from '../../../services/veterinario';
import { VeterinarioResponse, RegistroVeterinarioRequest } from '../../../models/veterinario';
import { GestionTabs } from '../../../shared/gestion-tabs/gestion-tabs';

@Component({
  selector: 'app-veterinarios',
  standalone: true,
  imports: [CommonModule, FormsModule, GestionTabs],
  templateUrl: './veterinarios.html',
  styleUrl: './veterinarios.css',
})
export class Veterinarios implements OnInit {
  veterinarios: VeterinarioResponse[] = [];
  mostrarForm = false;

  nuevoVeterinario: RegistroVeterinarioRequest = {
    nombre: '',
    apellido: '',
    correo: '',
    clave: '',
    celular: '',
    especialidad: '',
    numeroColegiatura: '',
  };

  constructor(private veterinarioService: VeterinarioService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.veterinarioService.listar().subscribe((data) => (this.veterinarios = data));
  }

  guardar(): void {
    this.veterinarioService.registrar(this.nuevoVeterinario).subscribe(() => {
      this.mostrarForm = false;
      this.nuevoVeterinario = {
        nombre: '',
        apellido: '',
        correo: '',
        clave: '',
        celular: '',
        especialidad: '',
        numeroColegiatura: '',
      };
      this.cargar();
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Eliminar este veterinario?')) return;
    this.veterinarioService.eliminar(id).subscribe(() => this.cargar());
  }
}
