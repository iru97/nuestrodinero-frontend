import { NgModule } from '@angular/core';
import { PageInfoComponent } from './page-info.component';
import { SharedModule } from '../shared/shared.module';
import { PageInfoRoutingModule } from './page-info.routing.module';

@NgModule({
  declarations: [PageInfoComponent],
  imports: [SharedModule, PageInfoRoutingModule],
})
export class PageInfoModule {}
