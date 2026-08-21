import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
  },

  // ---- ADMIN ----
  {
    path: 'admin',
    canActivate: [roleGuard],
    data: { roles: ['Admin'] },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/admin/dashboard-admin/dashboard-admin').then((m) => m.DashboardAdmin),
      },
      {
        path: 'usuarios',
        loadComponent: () => import('./features/admin/usuarios/usuarios').then((m) => m.Usuarios),
      },
      {
        path: 'servicios',
        loadComponent: () =>
          import('./features/admin/servicios/servicios').then((m) => m.Servicios),
      },
      {
        path: 'metodos-pago',
        loadComponent: () =>
          import('./features/admin/metodos-pagos/metodos-pagos').then((m) => m.MetodosPagos),
      },
      {
        path: 'veterinarios',
        loadComponent: () =>
          import('./features/admin/veterinarios/veterinarios').then((m) => m.Veterinarios),
      },
    ],
  },

  // ---- VETERINARIO ----
  {
    path: 'veterinario',
    canActivate: [roleGuard],
    data: { roles: ['Veterinario'] },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/veterinario/dashboard-vet/dashboard-vet').then(
            (m) => m.DashboardVetComponent,
          ),
      },
      {
        path: 'citas',
        loadComponent: () =>
          import('./features/veterinario/citas-vet/citas-vet').then((m) => m.CitasVetComponent),
      },
      {
        path: 'citas/:id/atender',
        loadComponent: () =>
          import('./features/veterinario/atender-cita/atender-cita').then(
            (m) => m.AtenderCita,
          ),
      },
      {
        path: 'historial-medico',
        loadComponent: () =>
          import('./features/veterinario/historial-medico/historial-medico').then(
            (m) => m.HistorialMedicoComponent,
          ),
      },
    ],
  },

  // ---- CLIENTE ----
  {
    path: 'cliente',
    canActivate: [roleGuard],
    data: { roles: ['Cliente'] },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/cliente/dashboard-cliente/dashboard-cliente').then(
            (m) => m.DashboardClienteComponent,
          ),
      },
      {
        path: 'mis-mascotas',
        loadComponent: () =>
          import('./features/cliente/mis-mascotas/mis-mascotas').then(
            (m) => m.MisMascotasComponent,
          ),
      },
      {
        path: 'mis-citas',
        loadComponent: () =>
          import('./features/cliente/mis-citas/mis-citas').then((m) => m.MisCitasComponent),
      },
    ],
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
