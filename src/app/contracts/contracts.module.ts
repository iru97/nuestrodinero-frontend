import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CONTRACTS_SHARED_COMPONENTS } from './shared';
import { CONTRACT_COMPONENTS } from './components';
import { ContractsRoutingModule } from './contracts-routing.module';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { ContractCardComponent } from './components/contract-card/contract-card.component';
import { ContractCardHeaderComponent } from './components/contract-card-header/contract-card-header.component';
import { ContractCardFooterComponent } from './components/contract-card-footer/contract-card-footer.component';
import { ContractCardContentComponent } from './components/contract-card-content/contract-card-content.component';

@NgModule({
  declarations: [
    ...CONTRACT_COMPONENTS,
    ...CONTRACTS_SHARED_COMPONENTS,
    YesNoPipe,
    ContractCardComponent,
    ContractCardHeaderComponent,
    ContractCardFooterComponent,
    ContractCardContentComponent,
  ],
  imports: [SharedModule, ContractsRoutingModule],
})
export class ContractsModule {}
