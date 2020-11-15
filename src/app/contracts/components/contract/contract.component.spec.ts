import { CONTRACT_COMPONENTS } from '..';
import { By } from '@angular/platform-browser';
import { emptyContract } from './contract.model';
import { ContractComponent } from './contract.component';
import { CONTRACTS_SHARED_COMPONENTS } from '../../shared';
import { SharedModule } from 'src/app/shared/shared.module';
import { OfferValues } from '../sellers-offers/offerValues.model';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { YesNoPipe } from '../../pipes/yes-no.pipe';

describe('ContractComponent', () => {
  let component: ContractComponent;
  let fixture: ComponentFixture<ContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ...CONTRACT_COMPONENTS,
        ...CONTRACTS_SHARED_COMPONENTS,
        YesNoPipe,
      ],
      imports: [SharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractComponent);
    component = fixture.componentInstance;
    component.contract = emptyContract();
    fixture.detectChanges();
  });

  it.only('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open new tab when clicked on PDF with given url', () => {
    component.contract.metadata.pdfUrl = '/boe-id';
    const windowOpenSpy = jest.spyOn(window, 'open');

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

  it('should render the total cost of offers', () => {
    const ofertas: OfferValues[] = [
      {
        value: 2,
        text: '',
      },
      {
        value: 2,
        text: '',
      },
    ];
    component.contract.content.offerValues = [...ofertas];
    // Act
    fixture.detectChanges();

    const spanElement: HTMLSpanElement = fixture.debugElement.query(
      By.css('span.error-text')
    ).nativeElement;

    // Assert

    expect(spanElement.textContent).toEqual('€4.00');
  });
});
