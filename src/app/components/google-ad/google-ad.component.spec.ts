import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAdComponent } from './google-ad.component';

describe('GoogleAdComponent', () => {
  let component: GoogleAdComponent;
  let fixture: ComponentFixture<GoogleAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
