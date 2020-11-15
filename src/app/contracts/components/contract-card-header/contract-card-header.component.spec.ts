import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractCardHeaderComponent } from './contract-card-header.component';

describe('ContractCardHeaderComponent', () => {
  let component: ContractCardHeaderComponent;
  let fixture: ComponentFixture<ContractCardHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractCardHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
