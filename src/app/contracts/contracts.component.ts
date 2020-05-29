import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, PartialObserver } from 'rxjs';
import { Contract } from './components/contract/contract.model';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../core/app.state';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss'],
})
export class ContractsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  contractsCollection: Contract[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.initMetatags();

    let appState: AppState = this.activatedRoute.snapshot.data['contratos'];

    this.contractsCollection = appState.contractCollection;
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
