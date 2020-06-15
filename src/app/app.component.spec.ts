import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        HttpClientTestingModule,
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render header', () => {
    const element = fixture.debugElement.query(By.css('app-header'));
    expect(element).toBeTruthy();
  });

  it('should render footer', () => {
    const element = fixture.debugElement.query(By.css('app-footer'));
    expect(element).toBeTruthy();
  });

  it('should render google-ads components', () => {
    const element = fixture.debugElement.query(By.css('app-google-ad'));
    expect(element).toBeTruthy();
  });

  it('should render loading overlay when requesting data', () => {
    if (component.isLoading) {
      const element = fixture.debugElement.query(By.css('app-loading-overlay'));
      expect(element).toBeTruthy();
    }
  });
});
