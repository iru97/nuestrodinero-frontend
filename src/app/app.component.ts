import { Component } from '@angular/core';
import { BoeService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoading: boolean = true;

  constructor(private boeService: BoeService) {
    this.boeService.isLoading$.subscribe((value) => {
      this.isLoading = value;
    });
  }
}
