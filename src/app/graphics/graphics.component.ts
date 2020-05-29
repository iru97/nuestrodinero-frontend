import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contract } from '../contracts/components/contract/contract.model';
import { AppState } from '../core/app.state';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss'],
})
export class GraphicsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  contractsCollection: Contract[] = [];
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    let appState: AppState = this.activatedRoute.snapshot.data['estadisticas'];

    this.contractsCollection = appState.contractCollection;
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
