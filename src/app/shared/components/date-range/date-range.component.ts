import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, PartialObserver } from 'rxjs';
import { Observable } from 'rxjs';
import { BoeService } from 'src/app/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
})
export class DateRangeComponent implements OnInit, OnDestroy {
  readonly MIN_DATE: Date = new Date(2018, 2, 13);
  readonly MAX_DATE: Date = new Date();

  minEndDate: Date;
  searchDisabeld$: Observable<boolean>;
  form: FormGroup;

  private subscription: Subscription;
  private observer: PartialObserver<Date>;

  constructor(private boeService: BoeService, private location: Location, private activatedRoute: ActivatedRoute) {
    this.verifyRouteParams();
    this.searchDisabeld$ = this.boeService.isSearchDisabled$;
    this.minEndDate = new Date();
    this.form = new FormGroup({
      startDate: new FormControl({ value: new Date(), disabled: true }, Validators.required),
      endDate: new FormControl({ value: new Date(), disabled: true }),
    });
  }

  ngOnInit(): void {
    this.observer = this.initObserver();
    this.subscription = this.form.controls.startDate.valueChanges.subscribe(this.observer);
  }

  initObserver(): PartialObserver<Date> {
    return {
      next: this.onDateStartChangeHandler.bind(this),
    };
  }

  onDateStartChangeHandler(value: Date): void {
    this.form.get('endDate').setValue(value);
    this.minEndDate = value;
  }

  doSearch(): void {
    let { startDate, endDate } = this.form.getRawValue();
    this.updateUrl(startDate, endDate);
    this.boeService.getAds(startDate, endDate).toPromise();
  }

  private updateUrl(startDate: Date, endDate: Date): void {
    // Format for url
    let start = startDate.toISOString().substr(0, startDate.toISOString().indexOf('T'));
    let end = endDate.toISOString().substr(0, endDate.toISOString().indexOf('T'));
    let queryIndex = this.location.path().indexOf('?');

    if (queryIndex !== -1) {
      let path = this.location.path().substr(0, queryIndex);
      this.location.replaceState(path, `?fechaInicio=${start}&fechaFinal=${end}`);
    } else {
      this.location.go(this.location.path(), `?fechaInicio=${start}&fechaFinal=${end}`);
    }
  }

  private verifyRouteParams(): void {
    this.activatedRoute.queryParams.subscribe(({ fechaInicio, fechaFinal }) => {
      if (fechaInicio && fechaFinal) {
        this.form.patchValue({ startDate: new Date(fechaInicio), endDate: new Date(fechaFinal) });
        this.doSearch();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
