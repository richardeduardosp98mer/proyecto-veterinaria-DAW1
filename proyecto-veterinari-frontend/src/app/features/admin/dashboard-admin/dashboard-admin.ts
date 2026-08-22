import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { Cita } from '../../../services/cita';
import { MascotaService } from '../../../services/mascota';
import { ClienteService } from '../../../services/cliente';
import { CitaResponse } from '../../../models/cita';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.css',
})
export class DashboardAdmin implements OnInit, AfterViewInit {
  @ViewChild('barChart') barChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('donutChart') donutChartRef!: ElementRef<HTMLCanvasElement>;

  citasHoy = 0;
  totalMascotas = 0;
  totalClientes = 0;
  citasRecientes: CitaResponse[] = [];

  private citas: CitaResponse[] = [];
  private barChartInstance?: Chart;
  private donutChartInstance?: Chart;

  constructor(
    private citaService: Cita,
    private mascotaService: MascotaService,
    private clienteService: ClienteService,
  ) {}

  ngOnInit(): void {
    this.mascotaService.listar().subscribe((data) => (this.totalMascotas = data.length));
    this.clienteService.listar().subscribe((data) => (this.totalClientes = data.length));

    this.citaService.listar().subscribe((data) => {
      this.citas = data;

      const hoy = new Date().toDateString();
      this.citasHoy = data.filter((c) => new Date(c.fechaHora).toDateString() === hoy).length;

      this.citasRecientes = [...data]
        .sort((a, b) => b.fechaHora.localeCompare(a.fechaHora))
        .slice(0, 5);

      this.dibujarBarChart();
      this.dibujarDonutChart();
    });
  }

  ngAfterViewInit(): void {
    // si los datos ya llegaron antes de que el canvas exista, dibuja apenas esté listo
    if (this.citas.length > 0) {
      this.dibujarBarChart();
      this.dibujarDonutChart();
    }
  }

  private dibujarBarChart(): void {
    if (!this.barChartRef) return;

    const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const conteoPorDia = [0, 0, 0, 0, 0, 0, 0];

    this.citas.forEach((c) => {
      const dia = new Date(c.fechaHora).getDay(); // 0=domingo
      conteoPorDia[dia]++;
    });

    // reordena para que empiece en Lunes, como en el diseño de referencia
    const ordenLunPrimero = [1, 2, 3, 4, 5, 6, 0];
    const labels = ordenLunPrimero.map((i) => dias[i]);
    const valores = ordenLunPrimero.map((i) => conteoPorDia[i]);

    this.barChartInstance?.destroy();

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            data: valores,
            backgroundColor: '#1f4d3d',
            borderRadius: 4,
            maxBarThickness: 32,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { precision: 0 } },
        },
      },
    };

    this.barChartInstance = new Chart(this.barChartRef.nativeElement, config);
  }

  private dibujarDonutChart(): void {
    if (!this.donutChartRef) return;

    const conteo: Record<string, number> = {};
    this.citas.forEach((c) => (conteo[c.estadoCita] = (conteo[c.estadoCita] ?? 0) + 1));

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
      data: {
        labels,
        datasets: [{ data: valores, backgroundColor: colores, borderWidth: 0 }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'right', labels: { boxWidth: 10, font: { size: 11 } } },
        },
      },
    };

    this.donutChartInstance = new Chart(this.donutChartRef.nativeElement, config);
  }
}
