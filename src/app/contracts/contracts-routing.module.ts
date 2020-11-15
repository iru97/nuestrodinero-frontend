import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractsComponent } from './contracts.component';
import { ContractComponent } from './components/contract/contract.component';

const routes: Routes = [
  {
    path: '',
    component: ContractsComponent,
  },
  {
    path: ':boe-id',
    component: ContractComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractsRoutingModule {}
