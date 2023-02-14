import { TestBed } from '@angular/core/testing';

import { ProductMethodService } from './product-method.service';

describe('ProductMethodService', () => {
  let service: ProductMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
