import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Contract } from './components/contract/contract.model';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss'],
})
export class ContractsComponent implements OnInit {
  @Input() contractsCollection$: Observable<Contract[]>;

  constructor() {}

  ngOnInit(): void {}
}
