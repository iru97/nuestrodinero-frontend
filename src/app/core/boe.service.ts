import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Contract } from '../contracts/components/contract/contract.model';
import { AppStoreService } from './app-store.service';
import { AppState } from './app.state';

@Injectable({
  providedIn: 'root',
})
export class BoeService {
  private url = environment.serverUrl;

  constructor(private http: HttpClient, private appStore: AppStoreService) {}

  getAds(start: Date, end: Date = new Date()): Observable<Contract[]> {
    return this.http
      .get<Contract[]>(
        `${
          this.url
        }/contracts?dateStart=${start.getTime()}&dateEnd=${end.getTime()}`
      )
      .pipe(
        tap((contractCollection) => {
          this.saveContractsToState(contractCollection, start, end);
        }),
        catchError(this.adErrHandler)
      );
  }

  private saveContractsToState(
    contracts: Contract[],
    start: Date,
    end: Date
  ): void {
    let state: AppState = {
      contractCollection: contracts,
      dateStart: start,
      dateEnd: end,
    };

    this.appStore.setState(state);
  }

  adErrHandler(err): Observable<Contract[]> {
    console.warn('BoeService warning -> ', err);

    return of([]);
  }
}
