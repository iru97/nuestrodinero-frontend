import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageInfoComponent } from './page-info.component';

const routes: Routes = [
  {
    path: '',
    component: PageInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageInfoRoutingModule {}
