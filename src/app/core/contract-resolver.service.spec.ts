import { TestBed } from '@angular/core/testing';

import { ContractResolverService } from './contract-resolver.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TransferState } from '@angular/platform-browser';

describe('ContractResolverService', () => {
  let service: ContractResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [TransferState],
    });
    service = TestBed.inject(ContractResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
