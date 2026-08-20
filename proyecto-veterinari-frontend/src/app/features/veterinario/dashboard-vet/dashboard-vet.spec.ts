import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVetComponent } from './dashboard-vet';

describe('DashboardVet', () => {
  let component: DashboardVetComponent;
  let fixture: ComponentFixture<DashboardVetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardVetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardVetComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
