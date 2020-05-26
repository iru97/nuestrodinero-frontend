import { Observable, Subscription, PartialObserver } from 'rxjs';
import { Documento } from './models';
import {
  Component,
  OnInit,
  OnDestroy,
  Renderer2,
  ViewChild,
  AfterViewChecked,
} from '@angular/core';
import { BoeService } from './services/boe.service';
import { Title, Meta } from '@angular/platform-browser';

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

  constructor(
    private boeService: BoeService,
    private title: Title,
    private meta: Meta
  ) {
    this.initMetatags();
  }

  ngOnInit(): void {
    let today = this.getDateFormat();
    this.ads$ = this.boeService.getAds(today);
    this.loadingSubscription = this.ads$.subscribe(this.initObserver());
  }

  initMetatags(): void {
    this.title.setTitle('Contratos públicos');
    this.meta.addTags([
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
        content: '/assets/images/nuestrodinero_icon.png',
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
