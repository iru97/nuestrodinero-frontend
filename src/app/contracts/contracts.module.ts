import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CONTRACTS_SHARED_COMPONENTS } from './shared';
import { CONTRACT_COMPONENTS } from './components';
import { ContractsRoutingModule } from './contracts-routing.module';

@NgModule({
  declarations: [...CONTRACT_COMPONENTS, ...CONTRACTS_SHARED_COMPONENTS],
  imports: [SharedModule, ContractsRoutingModule],
})
export class ContractsModule {}
