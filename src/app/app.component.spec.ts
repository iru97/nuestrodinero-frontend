import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  HeaderComponent,
  FooterComponent,
  BoeContentComponent,
  GoogleAdComponent,
  AdjudicatariosOfertasComponent,
  AnuncioComponent,
  DescriptionComponent,
  DisplayListComponent,
  LabelValueComponent,
  ContractingAuthorityComponent,
  LoadingOverlayComponent,
  NoContentCardComponent,
} from './components';
import { By } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TituloPipe } from './pipes/titulo.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        BoeContentComponent,
        GoogleAdComponent,
        AdjudicatariosOfertasComponent,
        AnuncioComponent,
        DescriptionComponent,
        DisplayListComponent,
        LabelValueComponent,
        ContractingAuthorityComponent,
        LoadingOverlayComponent,
        NoContentCardComponent,
        TituloPipe,
      ],
      imports: [
        HttpClientTestingModule,
        MatToolbarModule,
        MatDividerModule,
        MatButtonModule,
        MatCardModule,
        MatProgressSpinnerModule,
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

  it('should render loading symbol when loading', () => {
    const element = fixture.debugElement.query(By.css('app-loading-overlay'));
    expect(element).toBeTruthy();
  });

  it('should not render loading symbol when loading is not loading', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('app-loading-overlay'));
    expect(element).toBeFalsy();
  });

  it('should render boe-content when loading finishes', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('app-boe-content'));
    expect(element).toBeTruthy();
  });
});
