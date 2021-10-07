import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@front-end/users';
import { CategoriesEditComponent } from './categories/categories-edit/categories-edit.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersDetailComponent } from './orders/orders-detail/orders-detail.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { ProductsEditComponent } from './products/products-edit/products-edit.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { ShellComponent } from './shared/shell/shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'categories',
        component: CategoriesListComponent
      },
      {
        path: 'categories/edit',
        component: CategoriesEditComponent
      },
      {
        path: 'categories/edit/:id',
        component: CategoriesEditComponent
      },
      {
        path: 'products',
        component: ProductsListComponent
      },
      {
        path: 'products/edit',
        component: ProductsEditComponent
      },
      {
        path: 'products/edit/:id',
        component: ProductsEditComponent
      },
      {
        path: 'users',
        component: UsersListComponent
      },
      {
        path: 'users/edit',
        component: UsersEditComponent
      },
      {
        path: 'users/edit/:id',
        component: UsersEditComponent
      },
      {
        path: 'orders',
        component: OrdersListComponent
      },
      {
        path: 'orders/:id',
        component: OrdersDetailComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class AppRoutingModule {}
