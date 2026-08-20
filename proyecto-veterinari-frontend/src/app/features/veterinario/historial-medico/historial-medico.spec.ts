import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialMedicoComponent } from './historial-medico';

describe('HistorialMedico', () => {
  let component: HistorialMedicoComponent;
  let fixture: ComponentFixture<HistorialMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialMedicoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialMedicoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
