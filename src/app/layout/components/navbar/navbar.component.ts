import { State } from './../../../state/app.state';
import { Component, OnInit } from '@angular/core';

/* NgRx */
import { Store } from '@ngrx/store';
import { getLoadingStatus } from './../../../auth/state/index';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  authUser$ = this.store.select(getLoadingStatus);

  constructor(private store: Store<State>) {}

  logout() {
    // this.authService.logout();
  }

  ngOnInit(): void {}
}
