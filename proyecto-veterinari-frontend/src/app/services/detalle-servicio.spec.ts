import { TestBed } from '@angular/core/testing';

import { DetalleServicio } from './detalle-servicio';

describe('DetalleServicio', () => {
  let service: DetalleServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
