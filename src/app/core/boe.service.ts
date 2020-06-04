import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contract } from '../contracts/components/contract/contract.model';
import { contractCollectionMock2 } from '../mocks/contract-collection.mock';

@Injectable({
  providedIn: 'root',
})
export class BoeService {
  private url = environment.serverUrl;

  constructor(private http: HttpClient) {}

  getAds(date: string): Observable<Contract[]> {
    return of(contractCollectionMock2);
  }

  // getAds(date: string): Observable<Contract[]> {
  //   return this.http
  //     .get<Contract[]>(`${this.url}/api/boe?id=BOE-S-${date}`)
  //     .pipe(catchError(this.adErrHandler));
  // }

  adErrHandler(err): Observable<Contract[]> {
    console.warn('BoeService warning -> ', err);

    return of([]);
  }
}
