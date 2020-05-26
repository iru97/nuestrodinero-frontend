import { createHostFactory, SpectatorWithHost } from '@ngneat/spectator';
import { By } from '@angular/platform-browser';
import { LabelValueComponent } from './label-value.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('LabelValueComponent', () => {
  let spectator: SpectatorWithHost<LabelValueComponent>;
  const createHost = createHostFactory(LabelValueComponent);

  it('it should render empty values if undefined is passed as input', () => {
    spectator = createHost(
      `<app-label-value [label]=undefined></app-label-value>`
    );

    const label: HTMLLabelElement = spectator.query('label');
    const span: HTMLSpanElement = spectator.query('span');

    expect(label.textContent).toBe(':');
    expect(span.textContent).toBe('');
  });

  it('it should render the passed input and content', () => {
    spectator = createHost(
      `<app-label-value label='MyLabel'> my content</app-label-value>`
    );

    const label: HTMLLabelElement = spectator.query('label');
    const span: HTMLSpanElement = spectator.query('span');

    expect(label.textContent).toContain('MyLabel:');
    expect(span.textContent).toContain('my content');
  });
});
