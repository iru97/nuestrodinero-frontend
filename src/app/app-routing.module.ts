import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractsComponent } from './contracts/contracts.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
