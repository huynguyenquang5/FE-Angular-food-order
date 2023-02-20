import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantNavComponent } from './merchant-nav.component';

describe('MerchantNavComponent', () => {
  let component: MerchantNavComponent;
  let fixture: ComponentFixture<MerchantNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
