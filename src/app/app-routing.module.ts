import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./homepage/homepage.module').then((m) => m.HomepageModule),
  },
  {
    path: 'szukaj',
    pathMatch: 'full',
    loadChildren: () =>
      import('./search/search.module').then((m) => m.SearchModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
