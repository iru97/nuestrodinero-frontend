import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contract } from '../contracts/components/contract/contract.model';

@Injectable({
  providedIn: 'root',
})
export class BoeService {
  private url = environment.serverUrl;

  constructor(private http: HttpClient) {}

  getAds(date: Date): Observable<Contract[]> {
    let formattedDate = this.setDateFormat(date);
    return this.http
      .get<Contract[]>(`${this.url}/api/boe?id=BOE-S-${formattedDate}`)
      .pipe(catchError(this.adErrHandler));
  }

  adErrHandler(err): Observable<Contract[]> {
    console.warn('BoeService warning -> ', err);

    return of([]);
  }

  setDateFormat(date: Date): string {
    let isoDateTime: string = date.toISOString();
    let tIndex: number = isoDateTime.indexOf('T');
    let isoDate: string = isoDateTime.substring(0, tIndex);

    return isoDate.replace(/-/g, '');
  }
}
