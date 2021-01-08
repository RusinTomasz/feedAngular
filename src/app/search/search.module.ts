import { ThemeSharedModule } from './../shared.module';
import { NgModule } from '@angular/core';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SearchSidebarComponent } from './components/search-sidebar/search-sidebar.component';

@NgModule({
  declarations: [SearchBarComponent, SearchPageComponent, SearchSidebarComponent],
  imports: [ThemeSharedModule],
})
export class SearchModule {}
