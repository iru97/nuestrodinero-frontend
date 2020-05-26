import { Component, OnInit, Input } from '@angular/core';
import { PoderAdjudicador } from 'src/app/models';

@Component({
  selector: 'app-poder-adjudicador',
  templateUrl: './poder-adjudicador.component.html',
  styleUrls: ['./poder-adjudicador.component.scss'],
})
export class PoderAdjudicadorComponent implements OnInit {
  @Input() poderAdjudicador: PoderAdjudicador;
  constructor() {}

  ngOnInit(): void {}
}
