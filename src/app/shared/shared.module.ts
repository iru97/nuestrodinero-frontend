import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SHARED_COMPONENTS } from './components';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MenuComponent } from './components/menu/menu.component';

const SHARED_MODULES = [
  CommonModule,
  FlexLayoutModule,
  MatCardModule,
  MatButtonModule,
  MatDividerModule,
  MatListModule,
  MatToolbarModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatMenuModule,
];

@NgModule({
  declarations: [...SHARED_COMPONENTS, MenuComponent],
  imports: [...SHARED_MODULES],
  exports: [...SHARED_COMPONENTS, ...SHARED_MODULES],
})
export class SharedModule {}
