import { CONTRACT_COMPONENTS } from '..';
import { By } from '@angular/platform-browser';
import { emptyContract } from './contract.model';
import { ContractComponent } from './contract.component';
import { CONTRACTS_SHARED_COMPONENTS } from '../../shared';
import { SharedModule } from 'src/app/shared/shared.module';
import { OfferValues } from '../sellers-offers/offerValues.model';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('ContractComponent', () => {
  let component: ContractComponent;
  let fixture: ComponentFixture<ContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [...CONTRACT_COMPONENTS, ...CONTRACTS_SHARED_COMPONENTS],
      imports: [SharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractComponent);
    component = fixture.componentInstance;
    component.contract = emptyContract();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open new tab when clicked on PDF with given url', () => {
    component.contract.metadata.pdfUrl = '/boe-id';
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
    const ofertas: OfferValues[] = [
      {
        cost: 2,
        text: '',
      },
      {
        cost: 2,
        text: '',
      },
    ];
    component.contract.content.offerValues = [...ofertas];

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
