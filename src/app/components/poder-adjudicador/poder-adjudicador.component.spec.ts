import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoderAdjudicadorComponent } from './poder-adjudicador.component';
import { LabelValueComponent } from '../label-value/label-value.component';
import { PoderAdjudicador, poderAdjudicadorVacio } from 'src/app/models';
import { By } from '@angular/platform-browser';

describe('PoderAdjudicadorComponent', () => {
  let component: PoderAdjudicadorComponent;
  let fixture: ComponentFixture<PoderAdjudicadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PoderAdjudicadorComponent, LabelValueComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoderAdjudicadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an adjudicador', () => {
    const pAdjudicador: PoderAdjudicador = poderAdjudicadorVacio();
    pAdjudicador.nombre = 'name';

    component.poderAdjudicador = pAdjudicador;

    fixture.detectChanges();

    const nameElement: HTMLDivElement = fixture.debugElement.query(
      By.css('app-label-value[label="Nombre"]')
    ).nativeElement;

    expect(`Nombre: ${pAdjudicador.nombre} `).toStrictEqual(
      nameElement.textContent
    );
  });
});
