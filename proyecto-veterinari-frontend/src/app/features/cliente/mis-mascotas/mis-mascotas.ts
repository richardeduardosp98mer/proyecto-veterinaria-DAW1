import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MascotaService } from '../../../services/mascota';
import { MascotaRequest, MascotaResponse } from '../../../models/mascota';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-mis-mascotas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mis-mascotas.component.html'
})
export class MisMascotasComponent implements OnInit {
  mascotas: MascotaResponse[] = [];
  mostrarForm = false;

  // catálogo Especie tal como está sembrado en el script SQL
  especies = [
    { id: 1, nombre: 'Perro' },
    { id: 2, nombre: 'Gato' },
    { id: 3, nombre: 'Ave' },
    { id: 4, nombre: 'Conejo' },
    { id: 5, nombre: 'Otro' }
  ];

  form: Omit<MascotaRequest, 'idCliente'> = {
    idEspecie: 1, nombreMascota: '', raza: '', fechaNacimiento: '', sexo: 'M', peso: 0, observaciones: ''
  };

  constructor(private mascotaService: MascotaService, private authService: AuthService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    const idCliente = this.authService.obtenerIdPerfil();
    this.mascotaService.listar().subscribe(data => {
      this.mascotas = data.filter(m => m.idCliente === idCliente);
    });
  }

  guardar(): void {
    const idCliente = this.authService.obtenerIdPerfil();
    if (!idCliente) {
      alert('No se pudo identificar tu perfil de cliente. Vuelve a iniciar sesión.');
      return;
    }

    const request: MascotaRequest = { idCliente, ...this.form };

    this.mascotaService.crear(request).subscribe(() => {
      this.mostrarForm = false;
      this.form = { idEspecie: 1, nombreMascota: '', raza: '', fechaNacimiento: '', sexo: 'M', peso: 0, observaciones: '' };
      this.cargar();
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Eliminar esta mascota?')) return;
    this.mascotaService.eliminar(id).subscribe(() => this.cargar());
  }
}
