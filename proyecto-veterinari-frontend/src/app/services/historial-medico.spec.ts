import { TestBed } from '@angular/core/testing';

import { HistorialMedico } from './historial-medico';

describe('HistorialMedico', () => {
  let service: HistorialMedico;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialMedico);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
