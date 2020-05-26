import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjudicatariosOfertasComponent } from './adjudicatarios-ofertas.component';
import { By } from '@angular/platform-browser';
import { LabelValueComponent } from '..';
import { MatDividerModule } from '@angular/material/divider';
import { Adjudicatarios } from 'src/app/models';

describe('AdjudicatariosOfertasComponent', () => {
  let component: AdjudicatariosOfertasComponent;
  let fixture: ComponentFixture<AdjudicatariosOfertasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdjudicatariosOfertasComponent, LabelValueComponent],
      imports: [MatDividerModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjudicatariosOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an empty list if no inputs are provided', () => {
    expect(component.adjudicatarios).toHaveLength(0);
    expect(component.valorOferta).toHaveLength(0);
    expect(component.ofertasRecibidas).toHaveLength(0);
  });

  it('should render a list of adjudicatarios', () => {
    const adjudicatarios: Adjudicatarios[] = [
      {
        nombre: 'name',
        direccion: 'addr',
        nif: '1234q',
      },
    ];

    component.adjudicatarios = adjudicatarios;

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

    expect(`Nombre: ${adjudicatarios[0].nombre} `).toStrictEqual(
      nameElement.textContent
    );

    expect(`Dirección: ${adjudicatarios[0].direccion} `).toStrictEqual(
      direccionElement.textContent
    );

    expect(`NIF: ${adjudicatarios[0].nif} `).toStrictEqual(
      nifElement.textContent
    );
  });
});
