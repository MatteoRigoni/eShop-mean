import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product, ProductsService } from '@front-end/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngshop-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss']
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {

  constructor(private productService: ProductsService) { }

  featuredProducts: Product[] = [];
  endSub$: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this._getFeaturedProducts();
  }

  private _getFeaturedProducts() {
    this.productService.getFeaturedProducts(4)
    .pipe(takeUntil(this.endSub$))
    .subscribe(products => {
      this.featuredProducts = products;
    });
  }

  ngOnDestroy(): void {
    this.endSub$.next();
    this.endSub$.complete();
  }

}
