import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss'],
})
export class ScrollTopComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
