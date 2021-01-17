import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
})
export class SkeletonComponent implements OnInit {
  numbers: number[];
  constructor() {}

  @Input('pageSize') pageSize$: Observable<any>;

  ngOnInit(): void {
    this.pageSize$.pipe(take(1)).subscribe((pageSize) => {
      this.numbers = Array(pageSize)
        .fill(0)
        .map((x, i) => i);
    });
  }
}
