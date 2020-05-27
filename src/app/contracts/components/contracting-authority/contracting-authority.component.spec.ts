import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractingAuthorityComponent } from './contracting-authority.component';
import { LabelValueComponent } from '../../shared/label-value/label-value.component';
import { By } from '@angular/platform-browser';
import {
  ContractingAuthority,
  emptyContractingAuthority,
} from './contracting-authority.model';

describe('ContractingAuthorityComponent', () => {
  let component: ContractingAuthorityComponent;
  let fixture: ComponentFixture<ContractingAuthorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContractingAuthorityComponent, LabelValueComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractingAuthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an adjudicador', () => {
    const pAdjudicador: ContractingAuthority = emptyContractingAuthority();
    pAdjudicador.name = 'name';

    component.contractingAuthority = pAdjudicador;

    fixture.detectChanges();

    const nameElement: HTMLDivElement = fixture.debugElement.query(
      By.css('app-label-value[label="Nombre"]')
    ).nativeElement;

    expect(`Nombre: ${pAdjudicador.name} `).toStrictEqual(
      nameElement.textContent
    );
  });
});
