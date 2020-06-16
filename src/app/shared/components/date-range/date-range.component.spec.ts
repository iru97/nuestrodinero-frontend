import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangeComponent } from './date-range.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BoeService } from 'src/app/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('DateRangeComponent', () => {
  let component: DateRangeComponent;
  let fixture: ComponentFixture<DateRangeComponent>;
  let service: BoeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateRangeComponent],
      imports: [
        MatFormFieldModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatIconModule,
        HttpClientTestingModule,
        MatNativeDateModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangeComponent);
    service = TestBed.inject(BoeService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 2 calendars', () => {
    // Arrange
    let startCalendar = fixture.debugElement.query(
      By.css('[data-testid="startCalendar"]')
    );
    let endCalendar = fixture.debugElement.query(
      By.css('[data-testid="endCalendar"]')
    );
    // Act
    // Assert
    expect(startCalendar.nativeElement).toBeTruthy();
    expect(endCalendar.nativeElement).toBeTruthy();
  });

  it('should call service when search button is clicked', (done) => {
    // Arrange
    const boeServicesStub = jest
      .spyOn(service, 'getAds')
      .mockReturnValue(of([]));

    const searchButton: HTMLButtonElement = fixture.debugElement.query(
      By.css('button')
    ).nativeElement;

    // Act
    searchButton.click();

    const subscription = service
      .getAds(new Date(), new Date())
      .subscribe((contracts) => {
        done();
      });

    // Assert
    expect(boeServicesStub).toHaveBeenCalled();
    subscription.unsubscribe();
  });

  it('should call service when search button is clicked with the given dates', (done) => {
    // Arrange
    let startDate = new Date(2020, 1, 2);
    let endDate = new Date(2020, 1, 4);

    const boeServicesStub = jest
      .spyOn(service, 'getAds')
      .mockReturnValue(of([]));

    const searchButton: HTMLButtonElement = fixture.debugElement.query(
      By.css('button')
    ).nativeElement;

    // Act
    searchButton.click();

    const subscription = service
      .getAds(startDate, endDate)
      .subscribe((contracts) => {
        done();
      });

    // Assert
    expect(boeServicesStub).toHaveBeenCalled();
    expect(boeServicesStub).toHaveBeenCalledWith(startDate, endDate);
    subscription.unsubscribe();
  });
});
