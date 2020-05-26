import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Documento } from 'src/app/models';

@Component({
  selector: 'app-boe-content',
  templateUrl: './boe-content.component.html',
  styleUrls: ['./boe-content.component.scss'],
})
export class BoeContentComponent implements OnInit {
  @Input() ads$: Observable<Documento[]>;

  constructor() {}

  ngOnInit(): void {}
}
