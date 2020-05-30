import {
  Component,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contract } from '../contracts/components/contract/contract.model';
import { AppState } from '../core/app.state';
import { contractParser } from '../parsers';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss'],
})
export class GraphicsComponent implements OnInit {
  contractsCollection: Contract[] = [];
  isBrowser = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    let appState: AppState = this.activatedRoute.snapshot.data['estadisticas'];

    this.contractsCollection = appState.contractCollection;
    if (this.isBrowser) {
    }
  }
}
