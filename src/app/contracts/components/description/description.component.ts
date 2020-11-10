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
    if (this.details.length > this.descriptions.length) {
      this.largerList = [...this.details];
    } else if (this.details.length < this.descriptions.length) {
      this.largerList = [...this.descriptions];
    } else {
      // they are equal length
      this.largerList = [...this.descriptions];
    }
  }
}
