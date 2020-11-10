import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-card-section',
  templateUrl: './card-section.component.html',
  styleUrls: ['./card-section.component.scss'],
})
export class CardSection implements OnInit, OnDestroy {
  @Input() title;
  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
