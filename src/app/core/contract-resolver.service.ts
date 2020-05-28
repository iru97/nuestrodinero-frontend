import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AppState } from './app.state';
import { Observable, of } from 'rxjs';
import { BoeService } from './boe.service';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { map, tap } from 'rxjs/operators';
import { Contract } from '../contracts/components/contract/contract.model';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ContractResolverService implements Resolve<Contract[]> {
  constructor(
    private boeService: BoeService,
    @Inject(PLATFORM_ID) private platformId,
    private transferState: TransferState
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Contract[]> {
    let formattedDate = this.boeService.setDateFormat(new Date());
    const datakey = makeStateKey(formattedDate);

    if (this.transferState.hasKey(datakey)) {
      const contractCollection = this.transferState.get<Contract[]>(
        datakey,
        null
      );

      this.transferState.remove(datakey);

      return of(contractCollection);
    } else {
      let today = new Date();

      return this.boeService.getAds(today).pipe(
        tap((contractCollection) => {
          if (isPlatformServer(this.platformId)) {
            this.transferState.set(datakey, contractCollection);
          }
        })
      );
    }
  }
}
