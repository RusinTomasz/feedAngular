import { RemoveWhiteSpaces } from './removeWhiteSpaces.pipe';
import { TwoDigits } from './twoDigits.pipe';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [TwoDigits, RemoveWhiteSpaces],
  imports: [],
  exports: [TwoDigits, RemoveWhiteSpaces],
})
export class SharedPipesModule {}
