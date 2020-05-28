import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { Subscription, PartialObserver } from 'rxjs';
import { Contract } from './components/contract/contract.model';
import { BoeService } from '../core';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss'],
})
export class ContractsComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  loadingSubscription: Subscription;
  isLoadingObserver: PartialObserver<any[]>;
  contractsCollection: Contract[] = [];
  isBrowser: boolean;

  constructor(
    private boeService: BoeService,
    private title: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) platformId: any
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.initMetatags();

    if (this.isBrowser) {
      let today = this.getDateFormat();

      this.loadingSubscription = this.boeService
        .getAds(today)
        .subscribe(this.initObserver());
    }
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
        content: '/contratos',
      },
      {
        name: 'og:image',
        content: `${environment.serverUrl}/assets/images/nuestrodinero_icon.png`,
      },
    ]);
  }

  initObserver(): PartialObserver<any[]> {
    return {
      next: this.handleNext.bind(this),
      complete: this.handleOnComplete.bind(this),
    };
  }

  handleNext(contracts: Contract[]): void {
    this.contractsCollection = [...contracts];
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
