import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-list',
  templateUrl: './display-list.component.html',
  styleUrls: ['./display-list.component.scss'],
})
export class DisplayListComponent implements OnInit {
  @Input() items: string[] = [];
  @Input() title: string = '';
  constructor() {}

  ngOnInit(): void {}
}
