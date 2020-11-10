import { Component, OnInit, Input } from '@angular/core';
import { Contract } from './contract.model';
import { numberOfFieldsWithValue } from 'src/app/utils';
import { sample } from './mocked';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss'],
})
export class ContractComponent implements OnInit {
  @Input() contract: Contract;
  porcentaje: number;
  totalSpent: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.porcentaje = this.calculateContractScore(this.contract);
    this.contract.content.awardees.forEach((seller, index) => {
      this.totalSpent += this.contract.content.offerValues[index].value;
    });
  }

  calculateContractScore(item: Contract): number {
    let total = numberOfFieldsWithValue(item, true);
    let value = numberOfFieldsWithValue(item, false);

    return Math.round((value * 100) / total);
  }

  viewPdf(): void {
    window.open(`https://boe.es${this.contract.metadata.pdfUrl}`, '_blank');
  }
}
