import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoeContentComponent } from './boe-content.component';
import {
  AnuncioComponent,
  LabelValueComponent,
  DescriptionComponent,
  DisplayListComponent,
  PoderAdjudicadorComponent,
  AdjudicatariosOfertasComponent,
} from '../';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { TituloPipe } from 'src/app/pipes/titulo.pipe';
import { defaultDocumento } from 'src/app/models';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NoContentCardComponent } from '../no-content-card/no-content-card.component';

describe('BoeContentComponent', () => {
  let component: BoeContentComponent;
  let fixture: ComponentFixture<BoeContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BoeContentComponent,
        AnuncioComponent,
        LabelValueComponent,
        DescriptionComponent,
        DisplayListComponent,
        PoderAdjudicadorComponent,
        AdjudicatariosOfertasComponent,
        NoContentCardComponent,
        TituloPipe,
      ],
      imports: [MatCardModule, MatDividerModule, MatButtonModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 1 anuncio', () => {
    component.ads$ = of([defaultDocumento()]);
    fixture.detectChanges();

    const anuncioComponent = fixture.debugElement
      .queryAll(By.css('app-anuncio'))
      .map((c) => c.nativeElement);

    expect(anuncioComponent).toHaveLength(1);
  });

  it('should render N anuncios', () => {
    component.ads$ = of([defaultDocumento(), defaultDocumento()]);
    fixture.detectChanges();

    const anuncioComponent = fixture.debugElement
      .queryAll(By.css('app-anuncio'))
      .map((c) => c.nativeElement);

    expect(anuncioComponent).toHaveLength(2);
  });
});
