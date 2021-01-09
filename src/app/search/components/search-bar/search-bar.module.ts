import { MatButtonModule } from '@angular/material/button';
import { ThemeSharedModule } from './../../../shared.module';
import { SearchBarComponent } from './search-bar.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [SearchBarComponent],
  imports: [
    ThemeSharedModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [SearchBarComponent],
})
export class SearchBarModule {}
