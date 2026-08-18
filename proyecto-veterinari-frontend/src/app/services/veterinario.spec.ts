import { TestBed } from '@angular/core/testing';

import { Veterinario } from './veterinario';

describe('Veterinario', () => {
  let service: Veterinario;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Veterinario);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
