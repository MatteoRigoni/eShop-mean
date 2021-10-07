import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, Product, ProductsService } from '@front-end/products';

@Component({
  selector: 'ngshop-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  isCategoryPage: boolean;

  constructor(
    private prodService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      params.categoryid ? this._getProducts([params.categoryid]) : this._getProducts();
      params.categoryid ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
    });
    this._getCategories();
  }

  private _getProducts(categoriesFilter?: string[]) {
    this.prodService.getProducts(categoriesFilter).subscribe((resProducts) => {
      console.log(resProducts);
      this.products = resProducts;
    });
  }

  private _getCategories() {
    this.prodService.getCategories().subscribe((resCats) => {
      this.categories = resCats;
    });
  }

  categoryFilter() {
    const selectedCategories = this.categories
      .filter((category) => category.checked)
      .map((category) => category.id);

    this._getProducts(selectedCategories);
  }
}

