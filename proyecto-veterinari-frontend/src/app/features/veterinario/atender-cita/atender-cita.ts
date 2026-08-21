import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleServicio as DetalleServicioService } from '../../../services/detalle-servicio';
import { Servicio as ServicioService } from '../../../services/servicio';
import { Pago as PagoService } from '../../../services/pago';
import { MetodoPago as MetodoPagoService } from '../../../services/metodo-pago';
import { Cita as CitaService } from '../../../services/cita';
import { DetalleServicioResponse } from '../../../models/detalle-servicio';
import { ServicioResponse } from '../../../models/servicio';
import { MetodoPagoResponse } from '../../../models/metodo-pago';
import { CitaResponse } from '../../../models/cita';

@Component({
  selector: 'app-atender-cita',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './atender-cita.html',
})
export class AtenderCita implements OnInit {
  idCita = 0;

  servicios: ServicioResponse[] = [];
  metodosPago: MetodoPagoResponse[] = [];
  detalles: DetalleServicioResponse[] = [];
  citaActual: CitaResponse | null = null;

  idServicioSeleccionado = 0;
  cantidad = 1;

  idMetodoPagoSeleccionado = 0;
  monto = 0;
  referencia = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private detalleServicioService: DetalleServicioService,
    private servicioService: ServicioService,
    private pagoService: PagoService,
    private metodoPagoService: MetodoPagoService,
    private citaService: CitaService,
  ) {}

  ngOnInit(): void {
    this.idCita = Number(this.route.snapshot.paramMap.get('id'));

    this.citaService.obtenerPorId(this.idCita).subscribe((cita) => {
      this.citaActual = cita;
    });

    this.servicioService.listar().subscribe((data) => (this.servicios = data));
    this.metodoPagoService.listar().subscribe((data) => (this.metodosPago = data));
    this.cargarDetalles();
  }

  cargarDetalles(): void {
    this.detalleServicioService.listarPorCita(this.idCita).subscribe((data) => {
      this.detalles = data;
      // el monto sugerido de pago = suma de subtotales
      this.monto = data.reduce((acc, d) => acc + d.subtotal, 0);
    });
  }

  agregarServicio(): void {
    if (!this.idServicioSeleccionado) return;

    this.detalleServicioService
      .agregar({
        idCita: this.idCita,
        idServicio: this.idServicioSeleccionado,
        cantidad: this.cantidad,
        observaciones: '',
      })
      .subscribe(() => {
        this.idServicioSeleccionado = 0;
        this.cantidad = 1;
        this.cargarDetalles();
      });
  }

  eliminarDetalle(id: number): void {
    this.detalleServicioService.eliminar(id).subscribe(() => this.cargarDetalles());
  }

  registrarPago(): void {
    if (!this.idMetodoPagoSeleccionado || this.monto <= 0) {
      alert('Selecciona un método de pago y un monto válido.');
      return;
    }

    this.pagoService
      .registrar({
        idCita: this.idCita,
        idMetodoPago: this.idMetodoPagoSeleccionado,
        monto: this.monto,
        referencia: this.referencia,
      })
      .subscribe(() => {
        alert('Pago registrado.');
      });
  }

  finalizarAtencion(): void {
    if (!this.citaActual) {
      alert('Todavía no se cargó la información de la cita.');
      return;
    }

    this.citaService
      .actualizar(this.idCita, {
        idMascota: this.citaActual.idMascota,
        idVeterinario: this.citaActual.idVeterinario,
        fechaHora: this.citaActual.fechaHora,
        observaciones: this.citaActual.observaciones,
        idEstadoCita: 3, // Atendida
      })
      .subscribe(() => {
        this.router.navigate(['/veterinario/citas']);
      });
  }
}
