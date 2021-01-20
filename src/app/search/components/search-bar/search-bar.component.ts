import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

/* NgRx */
import { State } from './../../../state/app.state';
import { Store } from '@ngrx/store';
import {
  setQueryTitle,
  searchProducts,
} from './../../state/actions/search-page.actions';
import { getCurrentlyActiveQueryTitle } from './../../state/index';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  subscription: Subscription;
  isSearchpage: boolean = false;
  currentlyQueryTitle$ = this.store.select(getCurrentlyActiveQueryTitle);

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<State>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      query: '',
    });

    //Check if it is searchPage
    const currentUrlWithoutQueryParams = this.router.url.split('?')[0];
    if (currentUrlWithoutQueryParams === '/szukaj') {
      this.isSearchpage = true;
    }

    if (this.isSearchpage) {
      //Set default form query value based on state
      this.subscription = this.currentlyQueryTitle$.subscribe(
        (currentlyQueryTitle) => {
          this.searchForm.controls['query'].setValue(currentlyQueryTitle, {
            onlySelf: true,
          });
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit() {
    if (this.searchForm.status !== 'VALID') {
      return;
    }

    const queryTitle = this.searchForm.value.query;

    if (this.isSearchpage) {
      if (!queryTitle) {
        this.store.dispatch(searchProducts());
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: { title: null, page: null },
          queryParamsHandling: 'merge',
        });
      } else {
        [setQueryTitle({ title: queryTitle }), searchProducts()].forEach((a) =>
          this.store.dispatch(a)
        );
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: { title: queryTitle, page: null },
          queryParamsHandling: 'merge',
        });
      }
    } else {
      if (!queryTitle) {
        this.router.navigate(['/szukaj'], {
          queryParams: { title: null, page: null },
          queryParamsHandling: 'merge',
        });
      } else {
        this.router.navigate(['/szukaj'], {
          queryParams: { title: queryTitle, page: null },
          queryParamsHandling: 'merge',
        });
      }
    }
  }
}
