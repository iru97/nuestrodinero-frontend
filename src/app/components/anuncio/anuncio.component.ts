import { Component, OnInit, Input } from '@angular/core';
import { Documento } from 'src/app/models';
import { numberOfFieldsWithValue } from 'src/app/utils';

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.scss'],
})
export class AnuncioComponent implements OnInit {
  @Input() ad: Documento;
  porcentaje: number;

  constructor() {}

  ngOnInit(): void {
    this.porcentaje = this.calcDocumentScore(this.ad);
  }

  calcDocumentScore(item: Documento): number {
    let total = numberOfFieldsWithValue(item, true);
    let value = numberOfFieldsWithValue(item, false);

    return Math.round((value * 100) / total);
  }

  viewPdf(): void {
    window.open(`https://boe.es${this.ad.metadatos.pdfUrl}`, '_blank');
  }

  getTotalSpent(): number {
    return this.ad.contenido.valorOferta.reduce(
      (acc, curr) => acc + curr.valor,
      0
    );
  }
}
