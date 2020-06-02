import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ChartsComponent],
  imports: [CommonModule, ChartsRoutingModule, SharedModule],
})
export class ChartsModule {}
