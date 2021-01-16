import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RemoveWhiteSpaces } from './../pipes/removeWhiteSpaces.pipe';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

/* Modules*/

import { ThemeSharedModule } from './../shared.module';
import { LayoutModule } from './../layout/layout.module';
import { SearchBarModule } from './components/search-bar/search-bar.module';
import { PaginationModule } from './../pagination/pagination.module';

/* Material */

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

/* Components */

import { SearchPageComponent } from './components/search-page/search-page.component';
import { SearchSidebarComponent } from './components/search-sidebar/search-sidebar.component';
import { SearchFiltersComponent } from './components/search-filters/search-filters.component';
import { SearchFiltersPriceComponent } from './components/search-filters/search-filters-price/search-filters-price.component';
import { SearchFiltersShopComponent } from './components/search-filters/search-filters-shop/search-filters-shop.component';

/* NgRx */

import { StoreModule } from '@ngrx/store';
import { searchReducer } from './state/search.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SearchEffects } from './state/search.effects';

const routes = [
  {
    path: '',
    component: SearchPageComponent,
  },
];

@NgModule({
  declarations: [
    SearchPageComponent,
    SearchSidebarComponent,
    SearchFiltersComponent,
    SearchFiltersPriceComponent,
    SearchFiltersShopComponent,
    RemoveWhiteSpaces,
  ],
  imports: [
    RouterModule.forChild(routes),
    ThemeSharedModule,
    LayoutModule,
    PaginationModule,
    SearchBarModule,
    NgxSkeletonLoaderModule,
    //Material
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    //NgRx
    StoreModule.forFeature('search', searchReducer),
    EffectsModule.forFeature([SearchEffects]),
  ],
})
export class SearchModule {}
