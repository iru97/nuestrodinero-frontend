import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';
import { CONTRACTS_SHARED_COMPONENTS } from '../../shared';

import { ContractCardContentComponent } from './contract-card-content.component';

describe('ContractCardContentComponent', () => {
  let component: ContractCardContentComponent;
  let fixture: ComponentFixture<ContractCardContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContractCardContentComponent,
        ...CONTRACTS_SHARED_COMPONENTS,
      ],
      imports: [SharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractCardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display contracting authority info', () => {
    component.contractingAuthority = {
      ...component.contractingAuthority,
      name: 'irrelevant name',
      activity: 'irrelevant activity',
      activityType: 'irrelevant type',
    };

    fixture.detectChanges();

    const name: HTMLSpanElement = fixture.debugElement.query(
      By.css('div [name=nombre] .content')
    ).nativeElement;
    const activity: HTMLSpanElement = fixture.debugElement.query(
      By.css('div [name=actividad] .content')
    ).nativeElement;
    const type: HTMLSpanElement = fixture.debugElement.query(
      By.css('div [name=tipo] .content')
    ).nativeElement;

    expect(name.textContent.trim()).toEqual('irrelevant name');
    expect(activity.textContent.trim()).toEqual('irrelevant activity');
    expect(type.textContent.trim()).toEqual('irrelevant type');
  });

  it('should display awardees name and offer', () => {
    component.awardees = [
      { name: 'irrelevant name', address: '', nif: '', pyme: true },
    ];
    component.offerValues = [{ text: '', value: 10 }];

    fixture.detectChanges();

    const offer: HTMLSpanElement = fixture.debugElement.query(
      By.css('.success-text')
    ).nativeElement;

    const name: HTMLSpanElement = fixture.debugElement.query(
      By.css('.row span:first-child')
    ).nativeElement;

    expect(offer.textContent.trim()).toEqual('€10.00');
    expect(name.textContent.trim()).toEqual('irrelevant name');
  });
});
