import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mascotas } from './mascotas';

describe('Mascotas', () => {
  let component: Mascotas;
  let fixture: ComponentFixture<Mascotas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mascotas],
    }).compileComponents();

    fixture = TestBed.createComponent(Mascotas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
