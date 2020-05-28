import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BoeService } from './boe.service';
import { of, Observable } from 'rxjs';
import {
  emptyContract,
  Contract,
} from '../contracts/components/contract/contract.model';

describe('BoeService', () => {
  let service: BoeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BoeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of anuncios', (done) => {
    const ads$: Observable<Contract[]> = of([emptyContract()]);

    const callApiSpy = jest.spyOn(service, 'getAds').mockReturnValue(ads$);
    service.getAds('20200520');

    ads$.subscribe((document) => {
      expect(document).toHaveLength(1);
      done();
    });

    expect(callApiSpy).toHaveBeenCalled();
  });
});
