import { ProductModule } from './../product/product.module';
import { ThemeSharedModule } from './../shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { LayoutModule } from './../layout/layout.module';

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
    RouterModule.forChild(routes),
    CommonModule,
    LayoutModule,
    ProductModule,
  ],
})
export class HomepageModule {}
