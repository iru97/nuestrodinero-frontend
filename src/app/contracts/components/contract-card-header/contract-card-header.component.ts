import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contract-card-header',
  templateUrl: './contract-card-header.component.html',
  styleUrls: ['./contract-card-header.component.scss'],
})
export class ContractCardHeaderComponent implements OnInit {
  @Input() date: Date;
  @Input() totalSpent: number;

  constructor() {}

  ngOnInit(): void {}
}
