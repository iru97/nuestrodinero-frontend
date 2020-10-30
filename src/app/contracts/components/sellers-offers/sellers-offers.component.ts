import { Component, OnInit, Input } from '@angular/core';
import { OffersReceived } from './offersReceivedmodel';
import { Seller } from './sellers.model';
import { OfferValues } from './offerValues.model';

@Component({
  selector: 'app-sellers-offers',
  templateUrl: './sellers-offers.component.html',
  styleUrls: ['./sellers-offers.component.scss'],
})
export class SellersOffersComponent implements OnInit {
  @Input() offersReceived: OffersReceived[] = [];
  @Input() sellers: Seller[] = [];
  @Input() offerValues: OfferValues[] = [];

  constructor() {}

  ngOnInit(): void {
    // console.log('Sellerss', this.sellers);
    // console.log('offersReceived', this.offersReceived);
    // console.log('offerValues', this.offerValues);
    // console.log('--------------------');
  }
}
