import { SharedPipesModule } from './../pipes/sharedPipes.module';
import { PaginationModule } from './../pagination/pagination.module';
import { ProductModule } from './../product/product.module';
import { ThemeSharedModule } from './../shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
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
  declarations: [HomepageComponent],
  imports: [
    ThemeSharedModule,
    SharedPipesModule,
    NgxSkeletonLoaderModule,
    RouterModule.forChild(routes),
    LayoutModule,
    ProductModule,
    MatSelectModule,
    MatButtonModule,
    PaginationModule,
  ],
})
export class HomepageModule {}
