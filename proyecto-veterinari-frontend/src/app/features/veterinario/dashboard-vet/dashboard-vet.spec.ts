import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVet } from './dashboard-vet';

describe('DashboardVet', () => {
  let component: DashboardVet;
  let fixture: ComponentFixture<DashboardVet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardVet],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardVet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
