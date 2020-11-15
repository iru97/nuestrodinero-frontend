import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractCardContentComponent } from './contract-card-content.component';

describe('ContractCardContentComponent', () => {
  let component: ContractCardContentComponent;
  let fixture: ComponentFixture<ContractCardContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractCardContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractCardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
