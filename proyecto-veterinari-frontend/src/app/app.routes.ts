import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then((m) => m.Login),
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
          import('./features/admin/dashboard-admin/dashboard-admin').then(
            (m) => m.DashboardAdmin,
          ),
      },
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./features/admin/usuarios/usuarios').then((m) => m.Usuarios),
      },
      {
        path: 'servicios',
        loadComponent: () =>
          import('./features/admin/servicios/servicios').then(
            (m) => m.Servicios,
          ),
      },
      {
        path: 'metodos-pago',
        loadComponent: () =>
          import('./features/admin/metodos-pagos/metodos-pagos').then(
            (m) => m.MetodosPagos,
          ),
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
            (m) => m.DashboardVet,
          ),
      },
      {
        path: 'citas',
        loadComponent: () =>
          import('./features/veterinario/citas-vet/citas-vet').then(
            (m) => m.CitasVet,
          ),
      },
      {
        path: 'historial-medico',
        loadComponent: () =>
          import('./features/veterinario/historial-medico/historial-medico').then(
            (m) => m.HistorialMedico,
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
            (m) => m.DashboardCliente,
          ),
      },
      {
        path: 'mis-mascotas',
        loadComponent: () =>
          import('./features/cliente/mis-mascotas/mis-mascotas').then(
            (m) => m.MisMascotas,
          ),
      },
      {
        path: 'mis-citas',
        loadComponent: () =>
          import('./features/cliente/mis-citas/mis-citas').then(
            (m) => m.MisCitas,
          ),
      },
    ],
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
