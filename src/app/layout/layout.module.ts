import { SearchBarModule } from './../search/components/search-bar/search-bar.module';
import { ThemeSharedModule } from '../shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

/* Angular Material */
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    ThemeSharedModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    SearchBarModule,
  ],
  exports: [NavbarComponent],
})
export class LayoutModule {}
