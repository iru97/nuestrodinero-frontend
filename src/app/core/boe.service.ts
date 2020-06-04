import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contract } from '../contracts/components/contract/contract.model';
import { formatDate } from '../utils';
import { contractCollectionMock2 } from '../mocks/contract-collection.mock';

@Injectable({
  providedIn: 'root',
})
export class BoeService {
  private url = environment.serverUrl;

  constructor(private http: HttpClient) {}

  getAds(date: Date): Observable<Contract[]> {
    let formattedDate = formatDate(date);
    // temporary until backend is online
    return of(contractCollectionMock2);
    // return this.http
    //   .get<Contract[]>(`${this.url}/api/boe?id=BOE-S-${formattedDate}`)
    //   .pipe(catchError(this.adErrHandler));
  }

  adErrHandler(err): Observable<Contract[]> {
    console.warn('BoeService warning -> ', err);

    return of([]);
  }
}
