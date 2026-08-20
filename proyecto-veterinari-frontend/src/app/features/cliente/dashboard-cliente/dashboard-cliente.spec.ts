import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardClienteComponent } from './dashboard-cliente';

describe('DashboardCliente', () => {
  let component: DashboardClienteComponent;
  let fixture: ComponentFixture<DashboardClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardClienteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardClienteComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
