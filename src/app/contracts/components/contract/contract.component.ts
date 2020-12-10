import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { BoeService } from 'src/app/core';
import { Contract, emptyContract } from './contract.model';
import { Location } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

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
    private location: Location,
    private title: Title,
    private meta: Meta
  ) {
    this.router.url.subscribe((r) => (this.boeId = r.shift().path));
    this.boeService.disableSearch();
  }

  ngOnInit(): void {
    this.boeService.getAdByBoeId(this.boeId).subscribe(
      (onSucess) => {
        this.contract = onSucess;
        this.contract.content.awardees.forEach((seller, index) => {
          this.totalSpent += this.contract.content.offerValues[index].value;
        });
        this.initMetatags();
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

  initMetatags(): void {
    this.title.setTitle('Contratos públicos');
    this.meta.addTags([
      {
        name: 'twitter:card',
        content: 'summary',
      },
      {
        name: 'og:title',
        content: `Contrato de ${this.contract.content.contractAuthority.name}`,
      },
      {
        name: 'og:description',
        content: `${this.totalSpent} euros en ${this.contract.content.description[0]}`,
      },
      {
        name: 'og:url',
        content: `/contratos/${this.contract.metadata.identifier}`,
      },
      {
        name: 'og:image',
        content: `${environment.serverUrl}/assets/images/nuestrodinero_icon.png`,
      },
    ]);
  }

  ngOnDestroy(): void {
    this.boeService.enableSearch();
  }
}
