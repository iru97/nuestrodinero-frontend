import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { SharedModule } from '../shared/shared.module';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [ChartsComponent],
  imports: [CommonModule, ChartsRoutingModule, ChartModule, SharedModule],
})
export class ChartsModule {}
