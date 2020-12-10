import { Component, OnDestroy, OnInit } from '@angular/core';
import { BoeService } from '../core';

@Component({
  selector: 'app-page-info',
  templateUrl: './page-info.component.html',
  styleUrls: ['./page-info.component.scss'],
})
export class PageInfoComponent implements OnInit, OnDestroy {
  constructor(private boeService: BoeService) {}

  ngOnInit(): void {
    this.boeService.disableSearch();
  }

  ngOnDestroy(): void {
    this.boeService.enableSearch();
  }
}
