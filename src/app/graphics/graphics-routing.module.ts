import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraphicsComponent } from './graphics.component';
import { ContractResolverService } from '../core/contract-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: GraphicsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraphicsRoutingModule {}
