import { CustomPaginationComponent } from './../pagination/components/custom-pagination/custom-pagination.component';
import { ProductModule } from './../product/product.module';
import { ThemeSharedModule } from './../shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { LayoutModule } from './../layout/layout.module';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

const routes = [
  {
    path: '',
    component: HomepageComponent,
  },
];

@NgModule({
  declarations: [HomepageComponent, CustomPaginationComponent],
  imports: [
    ThemeSharedModule,
    NgxSkeletonLoaderModule,
    RouterModule.forChild(routes),
    CommonModule,
    LayoutModule,
    ProductModule,
    MatSelectModule,
    MatButtonModule,
  ],
})
export class HomepageModule {}
