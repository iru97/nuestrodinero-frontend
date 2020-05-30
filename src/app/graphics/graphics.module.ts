import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphicsRoutingModule } from './graphics-routing.module';
import { GraphicsComponent } from './graphics.component';

@NgModule({
  declarations: [GraphicsComponent],
  imports: [CommonModule, GraphicsRoutingModule],
})
export class GraphicsModule {}
