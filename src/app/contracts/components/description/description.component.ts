import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent implements OnInit {
  @Input() details: string[] = [];
  @Input() descriptions: string[] = [];

  largerList = [];

  constructor() {}

  ngOnInit(): void {
    if (
      this.details &&
      this.descriptions &&
      this.details.length > this.descriptions.length
    ) {
      this.largerList = [...this.details];
    }

    if (
      this.descriptions &&
      this.details &&
      this.descriptions.length > this.details.length
    ) {
      this.largerList = [...this.descriptions];
    }
  }
}
