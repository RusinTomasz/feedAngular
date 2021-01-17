import { SkeletonModule } from './../skeleton/skeleton.module';
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
    SkeletonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    ProductModule,
    MatSelectModule,
    MatButtonModule,
    PaginationModule,
  ],
})
export class HomepageModule {}
