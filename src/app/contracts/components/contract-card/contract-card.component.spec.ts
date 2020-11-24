import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { CONTRACT_COMPONENTS } from '..';
import { YesNoPipe } from '../../pipes/yes-no.pipe';
import { CONTRACTS_SHARED_COMPONENTS } from '../../shared';
import { emptyContract } from '../contract/contract.model';

import { ContractCardComponent } from './contract-card.component';

describe('ContractCardComponent', () => {
  let component: ContractCardComponent;
  let fixture: ComponentFixture<ContractCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ...CONTRACTS_SHARED_COMPONENTS,
        ...CONTRACT_COMPONENTS,
        YesNoPipe,
      ],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractCardComponent);
    component = fixture.componentInstance;
    component.contract = emptyContract();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
