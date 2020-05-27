import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription, PartialObserver } from 'rxjs';
import { Contract } from './components/contract/contract.model';
import { BoeService } from '../core';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss'],
})
export class ContractsComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  loadingSubscription: Subscription;
  isLoadingObserver: PartialObserver<any[]>;
  contractsCollection$: Observable<Contract[]>;

  constructor(
    private boeService: BoeService,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.initMetatags();

    let today = this.getDateFormat();
    this.contractsCollection$ = this.boeService.getAds(today);
    this.loadingSubscription = this.contractsCollection$.subscribe(
      this.initObserver()
    );
  }

  initMetatags(): void {
    this.title.setTitle('Contratos públicos');
    this.meta.addTags([
      {
        name: 'twitter:card',
        content: 'summary',
      },
      {
        name: 'og:title',
        content: 'Contratos públicos',
      },
      {
        name: 'og:description',
        content:
          'Queremos mostrar cuánto dinero público va destinado a las empresas y por qué.',
      },
      {
        name: 'og:url',
        content: '/',
      },
      {
        name: 'og:image',
        content: `${environment.serverUrl}/assets/images/nuestrodinero_icon.png`,
      },
    ]);
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
