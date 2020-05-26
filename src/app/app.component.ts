import { Observable, Subscription, PartialObserver } from 'rxjs';
import { Documento } from './models';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BoeService } from './services/boe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  loadingSubscription: Subscription;
  isLoadingObserver: PartialObserver<any[]>;
  ads$: Observable<Documento[]>;

  constructor(private boeService: BoeService) {}

  ngOnInit(): void {
    let today = this.getDateFormat();
    this.ads$ = this.boeService.getAds(today);
    this.loadingSubscription = this.ads$.subscribe(this.initObserver());
  }

  initObserver(): PartialObserver<any[]> {
    return {
      complete: this.handleOnComplete.bind(this),
    };
  }

  handleOnComplete(): void {
    this.isLoading = false;
  }

  getDateFormat(): string {
    let isoDateTime: string = new Date().toISOString();
    let tIndex: number = isoDateTime.indexOf('T');
    let isoDate: string = isoDateTime.substring(0, tIndex);

    return isoDate.replace(/-/g, '');
  }

  ngOnDestroy(): void {
    if (this.loadingSubscription) this.loadingSubscription.unsubscribe();
  }
}
