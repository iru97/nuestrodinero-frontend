import { By } from '@angular/platform-browser';
import { DisplayListComponent } from './display-list.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('DisplayListComponent', () => {
  let component: DisplayListComponent;
  let fixture: ComponentFixture<DisplayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an empty list if no inputs are passes', () => {
    expect(component.items).toHaveLength(0);
    expect(component.title).toEqual('');
  });

  it('should render the title', () => {
    component.title = 'The title';
    fixture.detectChanges();

    const element: HTMLSpanElement = fixture.debugElement.query(
      By.css('.section-title')
    ).nativeElement;

    expect(component.title).toEqual(element.textContent);
  });

  it('should render the list of n items', () => {
    component.items = ['item 1', 'item 2'];
    fixture.detectChanges();

    const li: HTMLLIElement[] = fixture.debugElement
      .queryAll(By.css('li'))
      .map((i) => i.nativeElement);
    const givenResult = li.map((i) => i.textContent);

    expect(component.items).toHaveLength(li.length);
    expect(component.items).toStrictEqual(givenResult);
  });
});
