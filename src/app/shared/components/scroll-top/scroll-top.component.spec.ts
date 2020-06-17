import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollTopComponent } from './scroll-top.component';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

describe('ScrollTopComponent', () => {
  let component: ScrollTopComponent;
  let fixture: ComponentFixture<ScrollTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScrollTopComponent],
      imports: [MatIconModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should scroll to top when clicked', () => {
    const button: HTMLButtonElement = fixture.debugElement.query(
      By.css('button')
    ).nativeElement;

    const windowStub = jest.spyOn(window, 'scrollTo');

    button.click();

    // window.scrollTo({ top: 0, behavior: 'smooth' });

    expect(component).toBeTruthy();
    expect(windowStub).toHaveBeenCalled();
    expect(windowStub).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
