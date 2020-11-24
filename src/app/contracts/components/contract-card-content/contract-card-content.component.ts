import { Component, Input, OnInit } from '@angular/core';
import {
  ContractingAuthority,
  emptyContractingAuthority,
} from '../contracting-authority/contracting-authority.model';
import { OfferValues } from '../sellers-offers/offerValues.model';
import { Seller } from '../sellers-offers/sellers.model';

@Component({
  selector: 'app-contract-card-content',
  templateUrl: './contract-card-content.component.html',
  styleUrls: ['./contract-card-content.component.scss'],
})
export class ContractCardContentComponent implements OnInit {
  @Input()
  contractingAuthority: ContractingAuthority = emptyContractingAuthority();
  @Input() awardees: Seller[] = [];
  @Input() offerValues: OfferValues[] = [];

  constructor() {}

  ngOnInit(): void {}
}
