import { CONTRACT_COMPONENTS } from './components';
import { CONTRACTS_SHARED_COMPONENTS } from './shared';
import { SharedModule } from '../shared/shared.module';
import { ContractsComponent } from './contracts.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { emptyContract } from './components/contract/contract.model';
import { By } from '@angular/platform-browser';

describe('ContractsComponent', () => {
  let component: ContractsComponent;
  let fixture: ComponentFixture<ContractsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ...CONTRACT_COMPONENTS,
        CONTRACTS_SHARED_COMPONENTS,
        YesNoPipe,
      ],
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render N contracts', () => {
    component.contractsCollection = [emptyContract()];
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('app-contract'));
    expect(element).toBeTruthy();
  });

  it('should render no content card when there are no contracts', () => {
    component.contractsCollection = [];
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('app-no-content-card'));
    expect(element).toBeTruthy();
  });
});
