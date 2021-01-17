import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SkeletonComponent } from './components/skeleton.component';
import { ThemeSharedModule } from './../shared.module';
import { NgModule } from '@angular/core';
@NgModule({
  declarations: [SkeletonComponent],
  imports: [ThemeSharedModule, NgxSkeletonLoaderModule],
  exports: [SkeletonComponent],
})
export class SkeletonModule {}
