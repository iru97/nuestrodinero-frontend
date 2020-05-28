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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss'],
})
export class ContractsComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  subscription: Subscription;
  isLoadingObserver: PartialObserver<any[]>;
  contractsCollection: Contract[] = [];
  isBrowser: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.initMetatags();

    this.contractsCollection = this.activatedRoute.snapshot.data['contratos'];

    /*this.subscription = this.activatedRoute.data.subscribe(
      this.handleNext.bind(this),
      this.handleError.bind(this),
      this.handleOnComplete.bind(this)
    );*/
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

  handleNext({ contractsCollection }): void {
    console.log('succ');
    this.contractsCollection = contractsCollection;
  }

  handleOnComplete(): void {
    this.isLoading = false;
    console.log('completed');
  }

  handleError(err): void {
    console.warn('err', err);
    this.contractsCollection = [];
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
