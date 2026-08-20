import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCliente } from './dashboard-cliente';

describe('DashboardCliente', () => {
  let component: DashboardCliente;
  let fixture: ComponentFixture<DashboardCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCliente],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardCliente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
