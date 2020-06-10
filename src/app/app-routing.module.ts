import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractResolverService } from './core/contract-resolver.service';

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
    resolve: {
      contratos: ContractResolverService,
    },
  },
  {
    path: 'estadisticas',
    loadChildren: () =>
      import('./charts/charts.module').then((m) => m.ChartsModule),
    resolve: {
      estadisticas: ContractResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
