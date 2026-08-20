import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  correo = '';
  clave = '';
  cargando = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.error = '';
    this.cargando = true;

    this.authService.login({ correo: this.correo, clave: this.clave }).subscribe({
      next: () => {
        this.cargando = false;
        this.router.navigate([this.authService.rutaHomePorRol()]);
      },
      error: () => {
        this.cargando = false;
        this.error = 'Correo o clave incorrectos.';
      },
    });
  }
}
