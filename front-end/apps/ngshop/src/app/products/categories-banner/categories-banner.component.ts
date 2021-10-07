import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Category, ProductsService } from '@front-end/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngshop-categories-banner',
  templateUrl: './categories-banner.component.html',
  styleUrls: ['./categories-banner.component.scss']
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endSub$: Subject<any> = new Subject();

  constructor(private categoriesService: ProductsService, private router: RouterModule) { }

  ngOnInit(): void {
    this.categoriesService.getCategories()
    .pipe(takeUntil(this.endSub$))
    .subscribe(categories => {
      this.categories = categories;
    });
  }

  ngOnDestroy(): void {
    this.endSub$.next();
    this.endSub$.complete();
  }

}
