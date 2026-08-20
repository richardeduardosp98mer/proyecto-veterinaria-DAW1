import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisCitasComponent } from './mis-citas';

describe('MisCitas', () => {
  let component: MisCitasComponent;
  let fixture: ComponentFixture<MisCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisCitasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MisCitasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
