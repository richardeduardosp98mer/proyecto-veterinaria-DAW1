import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MascotaService } from '../../../services/mascota';
import { Cita } from '../../../services/cita';
import { VeterinarioService } from '../../../services/veterinario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  correo = '';
  clave = '';
  cargando = false;
  error = '';
  mostrarClave = false;
  recordarme = true;

  // estadísticas cosméticas del panel izquierdo
  totalMascotas = 0;
  totalCitasMes = 0;
  totalVeterinarios = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private mascotaService: MascotaService,
    private citaService: Cita,
    private veterinarioService: VeterinarioService,
  ) {}

  ngOnInit(): void {
    this.mascotaService.listar().subscribe({
      next: (data) => (this.totalMascotas = data.length),
      error: () => {},
    });

    this.veterinarioService.listar().subscribe({
      next: (data) => (this.totalVeterinarios = data.length),
      error: () => {},
    });

    this.citaService.listar().subscribe({
      next: (data) => {
        const inicioMes = new Date();
        inicioMes.setDate(1);
        inicioMes.setHours(0, 0, 0, 0);
        this.totalCitasMes = data.filter((c) => new Date(c.fechaHora) >= inicioMes).length;
      },
      error: () => {},
    });
  }

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
