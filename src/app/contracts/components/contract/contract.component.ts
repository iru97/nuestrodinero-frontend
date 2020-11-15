import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { BoeService } from 'src/app/core';
import { Contract, emptyContract } from './contract.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss'],
})
export class ContractComponent implements OnInit, OnDestroy {
  contract: Contract = emptyContract();
  boeId: string;
  totalSpent: number = 0;

  constructor(
    private router: ActivatedRoute,
    private boeService: BoeService,
    private location: Location
  ) {
    this.router.url.subscribe((r) => (this.boeId = r.shift().path));
    this.boeService.setSearchState(true);
  }

  ngOnInit(): void {
    this.boeService.getAdByBoeId(this.boeId).subscribe(
      (onSucess) => {
        this.contract = onSucess;
        this.contract.content.awardees.forEach((seller, index) => {
          this.totalSpent += this.contract.content.offerValues[index].value;
        });
      },
      (onError) => console.error
    );
  }

  viewPdf(): void {
    window.open(`https://boe.es${this.contract.metadata.pdfUrl}`, '_blank');
  }
  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.boeService.setSearchState(false);
  }
}
