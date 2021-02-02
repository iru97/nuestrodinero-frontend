import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractResolverService } from './core/contract-resolver.service';
import { PageInfoComponent } from './page-info/page-info.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'contratos',
    pathMatch: 'full',
  },
  {
    path: 'contratos',
    loadChildren: () => import('./contracts/contracts.module').then((m) => m.ContractsModule),
    resolve: {
      appState: ContractResolverService,
    },
  },
  {
    path: 'estadisticas',
    loadChildren: () => import('./charts/charts.module').then((m) => m.ChartsModule),
    resolve: {
      estadisticas: ContractResolverService,
    },
  },
  {
    path: 'informacion',
    loadChildren: () => import('./page-info/page-info.module').then((m) => m.PageInfoModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
