import { CONTRACT_COMPONENTS } from './components';
import { CONTRACTS_SHARED_COMPONENTS } from './shared';
import { SharedModule } from '../shared/shared.module';
import { ContractsComponent } from './contracts.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { YesNoPipe } from './pipes/yes-no.pipe';

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

  // it('should render loading symbol when loading', () => {
  //   const element = fixture.debugElement.query(By.css('app-loading-overlay'));
  //   expect(element).toBeTruthy();
  // });

  // it('should not render loading symbol when loading is not loading', () => {
  //   component.isLoading = false;
  //   fixture.detectChanges();
  //   const element = fixture.debugElement.query(By.css('app-loading-overlay'));
  //   expect(element).toBeFalsy();
  // });

  // it('should render N contracts', () => {
  //   component.isLoading = false;
  //   component.contractsCollection = [emptyContract()];
  //   fixture.detectChanges();
  //   const element = fixture.debugElement.query(By.css('app-contract'));
  //   expect(element).toBeTruthy();
  // });

  // it('should render no content card when there are no contracts', () => {
  //   component.isLoading = false;
  //   component.contractsCollection = [];
  //   fixture.detectChanges();
  //   const element = fixture.debugElement.query(By.css('app-no-content-card'));
  //   expect(element).toBeTruthy();
  // });
});
