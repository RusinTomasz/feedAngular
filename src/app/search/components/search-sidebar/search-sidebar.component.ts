import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-sidebar',
  templateUrl: './search-sidebar.component.html',
  styleUrls: ['./search-sidebar.component.scss'],
})
export class SearchSidebarComponent implements OnInit {
  activeFiltr: string;

  constructor() {}

  ngOnInit(): void {}

  openFiltr(type: string) {
    this.activeFiltr = type;
    console.log(type);
  }

  

}
