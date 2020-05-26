import { Component, OnInit, Input } from '@angular/core';
import {
  OfertasRecibidas,
  Adjudicatarios,
  ValoresOfertas,
} from 'src/app/models';

@Component({
  selector: 'app-adjudicatarios-ofertas',
  templateUrl: './adjudicatarios-ofertas.component.html',
  styleUrls: ['./adjudicatarios-ofertas.component.scss'],
})
export class AdjudicatariosOfertasComponent implements OnInit {
  @Input() ofertasRecibidas: OfertasRecibidas[] = [];
  @Input() adjudicatarios: Adjudicatarios[] = [];
  @Input() valorOferta: ValoresOfertas[] = [];

  constructor() {}

  ngOnInit(): void {}
}
