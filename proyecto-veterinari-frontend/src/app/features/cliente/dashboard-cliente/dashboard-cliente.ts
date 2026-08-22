import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { Cita } from '../../../services/cita';
import { MascotaService } from '../../../services/mascota';
import { CitaResponse } from '../../../models/cita';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-cliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-cliente.html',
})
export class DashboardClienteComponent implements OnInit, AfterViewInit {
  @ViewChild('barChart') barChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('donutChart') donutChartRef!: ElementRef<HTMLCanvasElement>;

  totalMascotas = 0;
  citasHoy = 0;
  proximasCitas: CitaResponse[] = [];
  hoyTexto = new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'long' });

  private misCitas: CitaResponse[] = [];
  private barChartInstance?: Chart;
  private donutChartInstance?: Chart;

  constructor(
    private citaService: Cita,
    private mascotaService: MascotaService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const idCliente = this.authService.obtenerIdPerfil();

    this.mascotaService.listar().subscribe((mascotas) => {
      this.totalMascotas = mascotas.filter((m) => m.idCliente === idCliente).length;
      const idsPropias = mascotas.filter((m) => m.idCliente === idCliente).map((m) => m.idMascota);

      this.citaService.listar().subscribe((citas) => {
        this.misCitas = citas.filter((c) => idsPropias.includes(c.idMascota));

        const hoy = new Date().toDateString();
        this.citasHoy = this.misCitas.filter(
          (c) => new Date(c.fechaHora).toDateString() === hoy,
        ).length;

        this.proximasCitas = [...this.misCitas]
          .sort((a, b) => b.fechaHora.localeCompare(a.fechaHora))
          .slice(0, 5);

        this.dibujarBarChart();
        this.dibujarDonutChart();
      });
    });
  }

  ngAfterViewInit(): void {
    if (this.misCitas.length > 0) {
      this.dibujarBarChart();
      this.dibujarDonutChart();
    }
  }

  badgeClass(estado: string): string {
    return 'badge badge-' + estado.toLowerCase();
  }

  inicial(nombre: string): string {
    return nombre?.charAt(0)?.toUpperCase() ?? '?';
  }

  private dibujarBarChart(): void {
    if (!this.barChartRef) return;

    const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const conteoPorDia = [0, 0, 0, 0, 0, 0, 0];
    this.misCitas.forEach((c) => conteoPorDia[new Date(c.fechaHora).getDay()]++);

    const ordenLunPrimero = [1, 2, 3, 4, 5, 6, 0];
    const labels = ordenLunPrimero.map((i) => dias[i]);
    const valores = ordenLunPrimero.map((i) => conteoPorDia[i]);

    this.barChartInstance?.destroy();

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { data: valores, backgroundColor: '#1f4d3d', borderRadius: 4, maxBarThickness: 32 },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
      },
    };

    this.barChartInstance = new Chart(this.barChartRef.nativeElement, config);
  }

  private dibujarDonutChart(): void {
    if (!this.donutChartRef) return;

    const conteo: Record<string, number> = {};
    this.misCitas.forEach((c) => (conteo[c.estadoCita] = (conteo[c.estadoCita] ?? 0) + 1));

    const coloresPorEstado: Record<string, string> = {
      Pendiente: '#f2a65a',
      Confirmada: '#3b82f6',
      Atendida: '#1f4d3d',
      Cancelada: '#a11',
    };

    const labels = Object.keys(conteo);
    const valores = Object.values(conteo);
    const colores = labels.map((l) => coloresPorEstado[l] ?? '#999');

    this.donutChartInstance?.destroy();

    const config: ChartConfiguration = {
      type: 'doughnut',
      data: { labels, datasets: [{ data: valores, backgroundColor: colores, borderWidth: 0 }] },
      options: {
        responsive: true,
        plugins: { legend: { position: 'right', labels: { boxWidth: 10, font: { size: 11 } } } },
      },
    };

    this.donutChartInstance = new Chart(this.donutChartRef.nativeElement, config);
  }
}
