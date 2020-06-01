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
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { AppStoreService } from './app-store.service';
import { formatDate } from '../utils';
import { contractCollectionMock2 } from '../mocks/contract-collection.mock';

@Injectable({
  providedIn: 'root',
})
export class ContractResolverService implements Resolve<AppState> {
  constructor(
    private boeService: BoeService,
    @Inject(PLATFORM_ID) private platformId,
    private transferState: TransferState,
    private appStore: AppStoreService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<AppState> {
    let appState: AppState = {
      contractCollection: contractCollectionMock2,
      dateStart: '',
    };
    return of(appState);
    // return this.appStore.isTransferStateBlocked()
    //   ? of(this.appStore.getState())
    //   : this.getAppStateFromTransferState();
  }

  // Retrieves the data from the transfer state service
  private getAppStateFromTransferState(): Observable<AppState> {
    const stateTransferKey = makeStateKey(formatDate(new Date()));

    if (this.transferState.hasKey(stateTransferKey)) {
      return this.getAndClearFromTransferState(stateTransferKey);
    } else {
      // 1st time as SSR
      return this.saveAppStateToTransferState(stateTransferKey);
    }
  }

  // This runs only in SPA once, retrieves the data stored in the transferState service and then clears it
  // Also blockTransferState to prevent further calls in the future
  private getAndClearFromTransferState(stateTransferKey): Observable<AppState> {
    const appTransferState = this.transferState.get<AppState>(
      stateTransferKey,
      null
    );
    this.transferState.remove(stateTransferKey);
    this.appStore.setState(appTransferState);

    if (isPlatformBrowser(this.platformId)) {
      this.appStore.blockTransferState();
    }

    return of(appTransferState);
  }

  // This runs only in SSR, and stores the data retrieved from the service in the transferState service
  private saveAppStateToTransferState(stateTransferKey): Observable<AppState> {
    const today = new Date(2020, 4, 29);

    return this.boeService.getAds(today).pipe(
      map<Contract[], AppState>((contractCollection) => {
        return {
          dateStart: formatDate(today),
          contractCollection,
        };
      }),
      tap((appTransferState) => {
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(stateTransferKey, appTransferState);
        }
      })
    );
  }
}
