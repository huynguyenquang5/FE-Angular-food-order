import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerProductComponent } from './viewer-product.component';

describe('AdminProductComponent', () => {
  let component: ViewerProductComponent;
  let fixture: ComponentFixture<ViewerProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewerProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewerProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
