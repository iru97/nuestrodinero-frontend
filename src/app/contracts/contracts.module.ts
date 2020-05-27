import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CONTRACTS_SHARED_COMPONENTS } from './shared';
import { CONTRACT_COMPONENTS } from './components';

@NgModule({
  declarations: [...CONTRACT_COMPONENTS, ...CONTRACTS_SHARED_COMPONENTS],
  imports: [CommonModule, SharedModule],
})
export class ContractsModule {}
