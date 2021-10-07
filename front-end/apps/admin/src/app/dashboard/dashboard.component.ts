import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@front-end/orders';
import { ProductsService } from '@front-end/products';
import { UsersService } from '@front-end/users';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls:  ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  statistics = [];
  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.ordersService.getTotalSales()
    ]).subscribe((values) => {
      console.log(values);
      this.statistics = values;
    });
  }
}
