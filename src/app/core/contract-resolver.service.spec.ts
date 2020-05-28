import { TestBed } from '@angular/core/testing';

import { ContractResolverService } from './contract-resolver.service';

describe('ContractResolverService', () => {
  let service: ContractResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
