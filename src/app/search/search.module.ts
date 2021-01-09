import { LayoutModule } from './../layout/layout.module';
import { RouterModule } from '@angular/router';
import { SearchBarModule } from './components/search-bar/search-bar.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { ThemeSharedModule } from './../shared.module';
import { NgModule } from '@angular/core';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SearchSidebarComponent } from './components/search-sidebar/search-sidebar.component';
import { SearchFiltersComponent } from './components/search-filters/search-filters.component';

const routes = [
  {
    path: '',
    component: SearchPageComponent,
  },
];

@NgModule({
  declarations: [SearchPageComponent, SearchSidebarComponent, SearchFiltersComponent],
  imports: [
    ThemeSharedModule,
    MatFormFieldModule,
    RouterModule.forChild(routes),
    LayoutModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    SearchBarModule,
  ],
})
export class SearchModule {}
