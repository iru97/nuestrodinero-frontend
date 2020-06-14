import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, PartialObserver } from 'rxjs';
import { AppStoreService, BoeService } from 'src/app/core';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
})
export class DateRangeComponent implements OnInit, OnDestroy {
  readonly MIN_DATE: Date = new Date(2018, 2, 13);
  readonly MAX_DATE: Date = new Date();

  testDate: Date = new Date();

  form: FormGroup;

  private subscription: Subscription;
  private observer: PartialObserver<Date>;

  constructor(private boeService: BoeService) {
    this.form = new FormGroup({
      startDate: new FormControl(
        { value: new Date(), disabled: true },
        Validators.required
      ),
      endDate: new FormControl({ value: new Date(), disabled: true }),
    });
  }

  ngOnInit(): void {
    this.observer = this.initObserver();
    this.subscription = this.form.controls.startDate.valueChanges.subscribe(
      this.observer
    );
  }

  initObserver(): PartialObserver<Date> {
    return {
      next: this.onDateStartChangeHandler.bind(this),
    };
  }

  onDateStartChangeHandler(value: Date): void {
    this.form.get('endDate').setValue(value);
    this.testDate = value;
  }

  doSearch(): void {
    let { startDate, endDate } = this.form.getRawValue();
    this.boeService.getAds(startDate, endDate).toPromise();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
