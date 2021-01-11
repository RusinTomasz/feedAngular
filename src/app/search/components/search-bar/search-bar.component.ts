import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

/* NgRx */
import { State } from './../../../state/app.state';
import { Store } from '@ngrx/store';
import { SearchPageActions } from 'src/app/search/state/actions';
import { getCurrentlyQueryTitle } from './../../state/index';
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
  currentlyQueryTitle$ = this.store.select(getCurrentlyQueryTitle);

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

    //Check if currently in url is queryParam 'title' if not set queryTitle in state as empty string
    if (this.activatedRoute.snapshot.queryParams['title']) {
      const currentQueryTitle = this.activatedRoute.snapshot.queryParams[
        'title'
      ];
      this.store.dispatch(
        SearchPageActions.setQueryTitle({ title: currentQueryTitle })
      );
    } else {
      this.store.dispatch(SearchPageActions.setQueryTitle({ title: '' }));
    }

    //Set default form query value based on state
    this.subscription = this.currentlyQueryTitle$.subscribe(
      (currentlyQueryTitle) => {
        this.searchForm.controls['query'].setValue(currentlyQueryTitle, {
          onlySelf: true,
        });
      }
    );

    //Check if it is searchPage
    const currentUrlWithoutQueryParams = this.router.url.split('?')[0];
    if (currentUrlWithoutQueryParams === '/szukaj') {
      this.isSearchpage = true;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    if (this.searchForm.status !== 'VALID') {
      return;
    }

    const queryTitle = this.searchForm.value.query;
    this.store.dispatch(SearchPageActions.setQueryTitle({ title: queryTitle }));

    if (this.isSearchpage) {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { title: queryTitle },
        queryParamsHandling: 'merge',
      });
    } else {
      this.router.navigate(['/szukaj'], {
        queryParams: { title: queryTitle },
        queryParamsHandling: 'merge',
      });
    }
  }
}
