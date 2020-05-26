import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AnuncioComponent } from './anuncio.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { TituloPipe } from 'src/app/pipes/titulo.pipe';
import {
  DescriptionComponent,
  DisplayListComponent,
  AdjudicatariosOfertasComponent,
  PoderAdjudicadorComponent,
  LabelValueComponent,
} from '..';
import { defaultDocumento } from 'src/app/models';
import { By } from '@angular/platform-browser';

describe('AnuncioComponent', () => {
  let component: AnuncioComponent;
  let fixture: ComponentFixture<AnuncioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TituloPipe,
        AnuncioComponent,
        DescriptionComponent,
        DisplayListComponent,
        AdjudicatariosOfertasComponent,
        PoderAdjudicadorComponent,
        LabelValueComponent,
      ],
      imports: [MatCardModule, MatDividerModule, MatButtonModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnuncioComponent);
    component = fixture.componentInstance;
    component.ad = defaultDocumento();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open new tab when clicked on PDF with given url', () => {
    component.ad.metadatos.pdfUrl = '/boe-id';
    const windowOpenSpy = spyOn(window, 'open');

    const viewPdfBtn: HTMLButtonElement = fixture.debugElement.query(
      By.css('button')
    ).nativeElement;

    viewPdfBtn.click();

    expect(windowOpenSpy).toHaveBeenCalled();
    expect(windowOpenSpy).toHaveBeenCalledWith(
      'https://boe.es/boe-id',
      '_blank'
    );
  });

  it('should render with error-text class the percentage of information ', () => {
    // Act
    const calcDocumentScoreStub = jest
      .spyOn(component, 'calcDocumentScore')
      .mockReturnValue(50);

    component.ngOnInit();
    fixture.detectChanges();

    const spanElement: HTMLDivElement = fixture.debugElement.query(
      By.css('[testId="porcentaje"]')
    ).nativeElement;

    // Assert
    expect(calcDocumentScoreStub).toHaveBeenCalled();
    expect(spanElement.textContent).toEqual(' 50 % de información ');
    expect(spanElement.className).toContain('error-text');
  });

  it('should render with error-text class the percentage of information ', () => {
    // Act
    const calcDocumentScoreStub = jest
      .spyOn(component, 'calcDocumentScore')
      .mockReturnValue(70);

    component.ngOnInit();
    fixture.detectChanges();

    const spanElement: HTMLDivElement = fixture.debugElement.query(
      By.css('[testId="porcentaje"]')
    ).nativeElement;

    // Assert
    expect(calcDocumentScoreStub).toHaveBeenCalled();
    expect(spanElement.textContent).toEqual(' 70 % de información ');
    expect(spanElement.className).toContain('success-text');
  });

  it('should render the total cost of offers', () => {
    const ofertas = [
      {
        valor: 2,
        medio: '',
      },
      {
        valor: 2,
        medio: '',
      },
    ];
    component.ad.contenido.valorOferta = [...ofertas];

    // Act
    const totalSpetStub = jest
      .spyOn(component, 'getTotalSpent')
      .mockReturnValue(4);

    fixture.detectChanges();

    const spanElement: HTMLSpanElement = fixture.debugElement.query(
      By.css('span.error-text')
    ).nativeElement;

    // Assert
    expect(totalSpetStub).toHaveBeenCalled();
    expect(spanElement.textContent).toEqual('€4.00');
  });
});
