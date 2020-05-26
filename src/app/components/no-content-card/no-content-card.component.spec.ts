import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoContentCardComponent } from './no-content-card.component';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';

describe('NoContentCardComponent', () => {
  let component: NoContentCardComponent;
  let fixture: ComponentFixture<NoContentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoContentCardComponent],
      imports: [MatCardModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoContentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create display the static message', () => {
    const element: HTMLDivElement = fixture.debugElement.query(
      By.css('mat-card-content')
    ).nativeElement;

    expect(element.textContent).toEqual(
      ' No hay anuncios de formalizaciones de contratos hoy. '
    );
  });
});
