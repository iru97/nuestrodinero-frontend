import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Documento, defaultDocumento } from '../models';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BoeService {
  private url = environment.serverUrl;

  constructor(private http: HttpClient) {}

  getAds(date: string): Observable<Documento[]> {
    return this.http
      .get<Documento[]>(`${this.url}/api/boe?id=BOE-S-${date}`)
      .pipe(catchError(this.adErrHandler));
  }

  adErrHandler(err): Observable<Documento[]> {
    console.warn('BoeService warning -> ', err);

    return of([]);
  }
}
