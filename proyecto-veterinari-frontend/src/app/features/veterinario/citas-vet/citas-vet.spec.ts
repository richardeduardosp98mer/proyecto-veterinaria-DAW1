import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasVetComponent } from './citas-vet';

describe('CitasVet', () => {
  let component: CitasVetComponent;
  let fixture: ComponentFixture<CitasVetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitasVetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CitasVetComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
