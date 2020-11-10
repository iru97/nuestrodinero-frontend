import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Contract } from './components/contract/contract.model';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { AppState, defaultState } from '../core/app.state';
import { AppStoreService } from '../core';
import { isPlatformBrowser } from '@angular/common';
import { sample } from './components/contract/mocked';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss'],
})
export class ContractsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  contractsCollection: Contract[] = [];
  contract = sample;

  constructor(
    private activatedRoute: ActivatedRoute,
    private appStore: AppStoreService,
    @Inject(PLATFORM_ID) private platformId,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.initMetatags();

    if (isPlatformBrowser(this.platformId)) {
      // SPA data
      this.subscription = this.appStore.appState$.subscribe((appState) => {
        this.contractsCollection = appState.contractCollection;
      });
    } else {
      // SSR data
      let appState: AppState = this.activatedRoute.snapshot.data['appState'];

      if (!appState) {
        appState = defaultState();
      }

      this.contractsCollection = appState.contractCollection;
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

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
