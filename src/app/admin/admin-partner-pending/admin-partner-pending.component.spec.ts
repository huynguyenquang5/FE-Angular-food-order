import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPartnerPendingComponent } from './admin-partner-pending.component';

describe('AdminPartnerPendingComponent', () => {
  let component: AdminPartnerPendingComponent;
  let fixture: ComponentFixture<AdminPartnerPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPartnerPendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPartnerPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
