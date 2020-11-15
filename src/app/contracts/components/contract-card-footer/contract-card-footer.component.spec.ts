import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractCardFooterComponent } from './contract-card-footer.component';

describe('ContractCardFooterComponent', () => {
  let component: ContractCardFooterComponent;
  let fixture: ComponentFixture<ContractCardFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractCardFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractCardFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
