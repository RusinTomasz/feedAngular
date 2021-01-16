import { RouterModule } from '@angular/router';
import { CustomPaginationComponent } from './components/custom-pagination/custom-pagination.component';

import { ThemeSharedModule } from '../shared.module';
import { NgModule } from '@angular/core';

import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CustomPaginationComponent],
  imports: [ThemeSharedModule, RouterModule, MatSelectModule, MatButtonModule],
  exports: [CustomPaginationComponent],
})
export class PaginationModule {}
