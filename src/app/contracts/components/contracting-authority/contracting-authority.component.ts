import { Component, OnInit, Input } from '@angular/core';
import { ContractingAuthority } from './contracting-authority.model';

@Component({
  selector: 'app-contracting-authority',
  templateUrl: './contracting-authority.component.html',
  styleUrls: ['./contracting-authority.component.scss'],
})
export class ContractingAuthorityComponent implements OnInit {
  @Input() contractingAuthority: ContractingAuthority;
  constructor() {}

  ngOnInit(): void {}
}
