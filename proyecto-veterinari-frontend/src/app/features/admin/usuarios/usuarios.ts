import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../services/usuario';
import { UsuarioResponse, UsuarioRegistroRequest } from '../../../models/auth';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit {
  usuarios: UsuarioResponse[] = [];
  mostrarForm = false;

  nuevoUsuario: UsuarioRegistroRequest = {
    nombre: '',
    apellido: '',
    correo: '',
    clave: '',
    celular: '',
    idRol: 3,
  };

  constructor(private usuarioService: Usuario) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.usuarioService.listar().subscribe((data) => (this.usuarios = data));
  }

  guardar(): void {
    this.usuarioService.registrar(this.nuevoUsuario).subscribe(() => {
      this.mostrarForm = false;
      this.nuevoUsuario = {
        nombre: '',
        apellido: '',
        correo: '',
        clave: '',
        celular: '',
        idRol: 3,
      };
      this.cargar();
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Eliminar este usuario?')) return;
    this.usuarioService.eliminar(id).subscribe(() => this.cargar());
  }
}
