import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from '@front-end/ui';
import { OrdersModule } from '@front-end/orders';

import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ProductsSearchComponent } from './products/products-search/products-search.component';
import { CategoriesBannerComponent } from './products/categories-banner/categories-banner.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { FeaturedProductsComponent } from './products/featured-products/featured-products.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CheckboxModule} from 'primeng/checkbox';
import {BadgeModule} from 'primeng/badge';
import {RatingModule} from 'primeng/rating';
import { ToastModule } from 'primeng/toast';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputMaskModule} from 'primeng/inputmask';
import {DropdownModule} from 'primeng/dropdown';
import { ProductsDeatilComponent } from './products/products-deatil/products-deatil.component';
import { OrdersCartIconComponent } from './products/orders-cart-icon/orders-cart-icon.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from 'primeng/api';
import { CartPageComponent } from './orders/cart-page/cart-page.component';
import { OrderSummaryComponent } from './orders/order-summary/order-summary.component';
import { CheckoutPageComponent } from './orders/checkout/checkout.component';
import { ThanksComponent } from './orders/thanks/thanks.component';
import { AuthGuard, UsersModule } from '@front-end/users';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'products-search', component: ProductsSearchComponent },
  { path: 'products', component: ProductsListComponent },
  { path: 'products/:productid', component: ProductsDeatilComponent },
  { path: 'category/:categoryid', component: ProductsListComponent },
  { path: 'orders/cart', component: CartPageComponent },
  { path: 'orders/checkout', component: CheckoutPageComponent, canActivate: [AuthGuard] },
  { path: 'orders/success', component: ThanksComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    ProductsListComponent,
    ProductsDeatilComponent,
    OrdersCartIconComponent,
    MessagesComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThanksComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    UiModule,
    AccordionModule,
    ButtonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    RatingModule,
    CheckboxModule,
    InputNumberModule,
    OrdersModule,
    BadgeModule,
    ToastModule,
    InputMaskModule,
    DropdownModule,
    UsersModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
