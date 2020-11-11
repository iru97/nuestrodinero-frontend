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
  private readonly SCROLL_DISTANCE = 400;

  constructor() {}

  ngOnInit(): void {
    // console.log('Sellerss', this.sellers);
    // console.log('offersReceived', this.offersReceived);
    // console.log('offerValues', this.offerValues);
    // console.log('--------------------');
  }

  scrollRight(htmlElement: HTMLDivElement) {
    this.scrollTo(htmlElement, this.SCROLL_DISTANCE);
  }

  scrollLeft(htmlElement: HTMLDivElement) {
    this.scrollTo(htmlElement, -this.SCROLL_DISTANCE);
  }

  scrollTo(element: HTMLElement, distance: number) {
    let currentPosition = element.scrollLeft;

    element.scrollTo({
      behavior: 'smooth',
      left: currentPosition + distance,
    });
  }
}
