import { TestBed, inject } from '@angular/core/testing';

import { TokenInterceptor } from './interceptor.service';

describe('TokenInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenInterceptor]
    });
  });

  it('should be created', inject([TokenInterceptor], (service: TokenInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
