import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  //  placeholder para cuando agregues autenticación con token
  return next(req);
};

