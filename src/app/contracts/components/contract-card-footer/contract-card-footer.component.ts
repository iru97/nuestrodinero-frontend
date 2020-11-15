import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contract-card-footer',
  templateUrl: './contract-card-footer.component.html',
  styleUrls: ['./contract-card-footer.component.scss'],
})
export class ContractCardFooterComponent implements OnInit {
  @Input() boeUrl: string = '';
  @Input() boeId: string = '';
  constructor() {}

  ngOnInit(): void {}
}
