import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      query: '',
    });
  }

  onSubmit() {
    if (this.searchForm.status !== 'VALID') {
      return;
    }

    console.log(this.searchForm.value.query);

    // this.store.dispatch(
    //   AuthPageActions.loginUser({
    //     email: this.loginForm.value.email,
    //     password: this.loginForm.value.password,
    //   })
    // );
  }
}
