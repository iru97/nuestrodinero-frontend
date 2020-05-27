import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import { MatDividerModule } from '@angular/material/divider';
import { SellersOffersComponent } from './sellers-offers.component';
import { LabelValueComponent } from '../../shared/label-value/label-value.component';
import { Seller } from './sellers.model';

describe('AdjudicatariosOfertasComponent', () => {
  let component: SellersOffersComponent;
  let fixture: ComponentFixture<SellersOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SellersOffersComponent, LabelValueComponent],
      imports: [MatDividerModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellersOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an empty list if no inputs are provided', () => {
    expect(component.sellers).toHaveLength(0);
    expect(component.offerValues).toHaveLength(0);
    expect(component.offersReceived).toHaveLength(0);
  });

  it('should render a list of adjudicatarios', () => {
    const adjudicatarios: Seller[] = [
      {
        name: 'name',
        address: 'addr',
        nif: '1234q',
      },
    ];

    component.sellers = adjudicatarios;

    fixture.detectChanges();

    const nameElement: HTMLDivElement = fixture.debugElement.query(
      By.css('app-label-value[label="Nombre"]')
    ).nativeElement;

    const direccionElement: HTMLDivElement = fixture.debugElement.query(
      By.css('app-label-value[label="Dirección"]')
    ).nativeElement;

    const nifElement: HTMLDivElement = fixture.debugElement.query(
      By.css('app-label-value[label="NIF"]')
    ).nativeElement;

    expect(`Nombre: ${adjudicatarios[0].name} `).toStrictEqual(
      nameElement.textContent
    );

    expect(`Dirección: ${adjudicatarios[0].address} `).toStrictEqual(
      direccionElement.textContent
    );

    expect(`NIF: ${adjudicatarios[0].nif} `).toStrictEqual(
      nifElement.textContent
    );
  });
});
