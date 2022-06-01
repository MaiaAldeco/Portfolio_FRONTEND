import { TestBed } from '@angular/core/testing';

import { ServiceScrollrevealService } from './service-scrollreveal.service';

describe('ServiceScrollrevealService', () => {
  let service: ServiceScrollrevealService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceScrollrevealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
