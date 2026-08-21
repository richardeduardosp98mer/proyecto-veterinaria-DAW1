import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ClienteService } from '../../../services/cliente';
import { RegistroClienteRequest } from '../../../models/cliente';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  form: RegistroClienteRequest = {
    nombre: '',
    apellido: '',
    correo: '',
    clave: '',
    celular: '',
    dni: '',
    direccion: '',
  };

  cargando = false;
  error = '';

  constructor(
    private clienteService: ClienteService,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.error = '';
    this.cargando = true;

    this.clienteService.registrar(this.form).subscribe({
      next: () => {
        this.cargando = false;
        alert('Cuenta creada. Ya puedes iniciar sesión.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.cargando = false;
        this.error = err?.error ?? 'No se pudo completar el registro. Verifica los datos.';
      },
    });
  }
}
