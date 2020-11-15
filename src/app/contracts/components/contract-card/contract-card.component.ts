import { Component, Input, OnInit } from '@angular/core';
import { Contract } from '../contract/contract.model';

@Component({
  selector: 'app-contract-card',
  templateUrl: './contract-card.component.html',
  styleUrls: ['./contract-card.component.scss'],
})
export class ContractCardComponent implements OnInit {
  @Input() contract: Contract;
  totalSpent: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.contract.content.awardees.forEach((seller, index) => {
      this.totalSpent += this.contract.content.offerValues[index].value;
    });
  }
}
