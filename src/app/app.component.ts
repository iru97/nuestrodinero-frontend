import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { BoeService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoading: boolean = true;

  constructor(private boeService: BoeService, private title: Title, private meta: Meta) {
    this.boeService.isLoading$.subscribe((value) => {
      this.isLoading = value;
    });

    this.initMetatags();
  }

  initMetatags(): void {
    this.title.setTitle('Contratos públicos');
    this.meta.addTags([
      {
        name: 'twitter:card',
        content: 'summary',
      },
      {
        name: 'og:title',
        content: 'Contratos públicos',
      },
      {
        name: 'og:description',
        content: 'Listado de los últimos contratos públicos formalizados.',
      },
      {
        name: 'og:url',
        content: '',
      },
      {
        name: 'og:image',
        content: `${environment.serverUrl}/assets/images/nuestrodinero_icon.png`,
      },
    ]);
  }
}
