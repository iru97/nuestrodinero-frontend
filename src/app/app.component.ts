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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewChecked {
  isLoading: boolean = true;
  loadingSubscription: Subscription;
  isLoadingObserver: PartialObserver<any[]>;
  ads$: Observable<Documento[]>;
  @ViewChild('#bmc-wbtn', { static: false }) imgElement;

  constructor(private boeService: BoeService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.changeBMCIcon();
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

  changeBMCIcon(): void {
    //this.renderer.selectRootElement();
  }

  ngAfterViewChecked(): void {
    // let item = document.querySelector('#bmc-wbtn');
    // console.log(item);
  }

  ngOnDestroy(): void {
    if (this.loadingSubscription) this.loadingSubscription.unsubscribe();
  }
}
