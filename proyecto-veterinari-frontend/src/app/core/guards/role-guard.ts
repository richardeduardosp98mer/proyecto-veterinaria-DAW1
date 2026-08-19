import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Rol } from '../../models/auth';

// Uso en las rutas: { path: 'admin', canActivate: [roleGuard], data: { roles: ['Admin'] }, ... }

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.estaLogueado()) {
    router.navigate(['/login']);
    return false;
  }

  const rolesPermitidos = route.data['roles'] as Rol[] | undefined;

  if (!rolesPermitidos || auth.tieneRol(...rolesPermitidos)) {
    return true;
  }

  // logueado pero con el rol equivocado para esta sección -> lo manda a su propio home
  router.navigate([auth.rutaHomePorRol()]);
  return false;

};
