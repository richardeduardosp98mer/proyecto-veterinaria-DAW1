import { TestBed } from '@angular/core/testing';

import { MetodoPago } from './metodo-pago';

describe('MetodoPago', () => {
  let service: MetodoPago;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetodoPago);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
