import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SHARED_COMPONENTS } from './components';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TotalCostPipe } from './pipes/total-cost.pipe';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const SHARED_MODULES = [
  CommonModule,
  FlexLayoutModule,
  MatCardModule,
  MatButtonModule,
  MatDividerModule,
  MatListModule,
  MatToolbarModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatFormFieldModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatCheckboxModule,
  FormsModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [...SHARED_COMPONENTS, TotalCostPipe, CustomDatePipe],
  imports: [...SHARED_MODULES],
  exports: [
    ...SHARED_COMPONENTS,
    ...SHARED_MODULES,
    TotalCostPipe,
    CustomDatePipe,
  ],
})
export class SharedModule {}
