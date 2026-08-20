import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisMascotas } from './mis-mascotas';

describe('MisMascotas', () => {
  let component: MisMascotas;
  let fixture: ComponentFixture<MisMascotas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisMascotas],
    }).compileComponents();

    fixture = TestBed.createComponent(MisMascotas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
