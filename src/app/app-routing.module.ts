import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'contratos',
    pathMatch: 'full',
  },
  {
    path: 'contratos',
    loadChildren: () =>
      import('./contracts/contracts.module').then((m) => m.ContractsModule),
  },
  {
    path: 'graphics',
    loadChildren: () =>
      import('./graphics/graphics.module').then((m) => m.GraphicsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
