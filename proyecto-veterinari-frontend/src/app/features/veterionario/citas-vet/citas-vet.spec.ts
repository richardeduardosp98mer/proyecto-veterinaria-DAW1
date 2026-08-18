import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasVet } from './citas-vet';

describe('CitasVet', () => {
  let component: CitasVet;
  let fixture: ComponentFixture<CitasVet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitasVet],
    }).compileComponents();

    fixture = TestBed.createComponent(CitasVet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
