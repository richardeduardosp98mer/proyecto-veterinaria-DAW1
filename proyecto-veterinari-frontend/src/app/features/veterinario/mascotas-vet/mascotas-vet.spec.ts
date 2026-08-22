import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasVet } from './mascotas-vet';

describe('MascotasVet', () => {
  let component: MascotasVet;
  let fixture: ComponentFixture<MascotasVet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotasVet],
    }).compileComponents();

    fixture = TestBed.createComponent(MascotasVet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
