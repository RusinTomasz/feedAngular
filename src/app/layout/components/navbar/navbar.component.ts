import { Router } from '@angular/router';
import { State } from './../../../state/app.state';
import { Component, OnInit } from '@angular/core';

/* NgRx */
import { Store } from '@ngrx/store';
import { getLoadingStatus } from './../../../auth/state/index';
import { paginationProductPage } from './../../../product/state/actions/product-page.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  authUser$ = this.store.select(getLoadingStatus);
  isHomepage: boolean = false;

  constructor(private store: Store<State>, private router: Router) {}

  logout() {
    // this.authService.logout();
  }

  ngOnInit(): void {
    const currentUrlWithoutQueryParams = this.router.url.split('?')[0];
    if (currentUrlWithoutQueryParams === '/') {
      this.isHomepage = true;
    }
  }

  goToFrontPage(): void {
    this.store.dispatch(paginationProductPage());
  }
}
