import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { byTextContent } from '@ngneat/spectator';
import { SharedModule } from 'src/app/shared/shared.module';

import { ContractCardFooterComponent } from './contract-card-footer.component';

describe('ContractCardFooterComponent', () => {
  let component: ContractCardFooterComponent;
  let fixture: ComponentFixture<ContractCardFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContractCardFooterComponent],
      imports: [SharedModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractCardFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('link should have the given url', () => {
    component.boeUrl = '/irrelevant';
    fixture.detectChanges();

    const nameElement: HTMLAnchorElement = fixture.debugElement.query(
      By.css('[name=PDFLink]')
    ).nativeElement;

    expect(nameElement.href).toEqual('https://boe.es/irrelevant');
  });

  it('should display details btn', () => {
    const nameElement: HTMLAnchorElement = fixture.debugElement.query(
      By.css('[name=details]')
    ).nativeElement;

    expect(nameElement.textContent.trim()).toEqual('Más detalles...');
  });
});
