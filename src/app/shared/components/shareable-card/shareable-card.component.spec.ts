import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareableCardComponent } from './shareable-card.component';

describe('ShareableCardComponent', () => {
  let component: ShareableCardComponent;
  let fixture: ComponentFixture<ShareableCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareableCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
