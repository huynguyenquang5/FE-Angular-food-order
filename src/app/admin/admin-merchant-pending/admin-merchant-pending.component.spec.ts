import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMerchantPendingComponent } from './admin-merchant-pending.component';

describe('AdminMerchantPendingComponent', () => {
  let component: AdminMerchantPendingComponent;
  let fixture: ComponentFixture<AdminMerchantPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMerchantPendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMerchantPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
