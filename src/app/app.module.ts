import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppComponent } from './app.component';
import {
  AdjudicatariosOfertasComponent,
  AnuncioComponent,
  GoogleAdComponent,
  FooterComponent,
  HeaderComponent,
  BoeContentComponent,
  DescriptionComponent,
  PoderAdjudicadorComponent,
  LabelValueComponent,
  DisplayListComponent,
  LoadingOverlayComponent,
} from './components';
import { TituloPipe } from './pipes/titulo.pipe';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { NoContentCardComponent } from './components/no-content-card/no-content-card.component';

@NgModule({
  declarations: [
    AppComponent,
    AdjudicatariosOfertasComponent,
    AnuncioComponent,
    GoogleAdComponent,
    FooterComponent,
    HeaderComponent,
    BoeContentComponent,
    DescriptionComponent,
    TituloPipe,
    PoderAdjudicadorComponent,
    LabelValueComponent,
    DisplayListComponent,
    LoadingOverlayComponent,
    NoContentCardComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FlexLayoutModule.withConfig({ ssrObserveBreakpoints: ['xs', 'lt-md'] }),
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-ES',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

registerLocaleData(localeEs);
