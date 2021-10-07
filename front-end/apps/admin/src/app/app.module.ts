import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesEditComponent } from './categories/categories-edit/categories-edit.component';

import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from '@front-end/products';
import { UsersService } from '@front-end/users';
import { OrdersService } from '@front-end/orders';
import { UsersModule, AuthGuard } from '@front-end/users';
import { InputTextModule } from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DropdownModule} from 'primeng/dropdown';
import {EditorModule} from 'primeng/editor';
import {TagModule} from 'primeng/tag';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import {ColorPickerModule} from 'primeng/colorpicker';
import {InputMaskModule} from 'primeng/inputmask';
import { FieldsetModule } from 'primeng/fieldset';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductsEditComponent } from './products/products-edit/products-edit.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './orders/orders-detail/orders-detail.component';
import { AppRoutingModule } from './app-routing.module';

const UX_MODULE = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  InputTextModule,
  ToastModule,
  ConfirmDialogModule,
  ColorPickerModule,
  InputNumberModule,
  InputTextareaModule,
  InputSwitchModule,
  DropdownModule,
  EditorModule,
  TagModule,
  InputMaskModule,
  FieldsetModule
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ShellComponent,
    SidebarComponent,
    CategoriesListComponent,
    CategoriesEditComponent,
    ProductsListComponent,
    ProductsEditComponent,
    UsersListComponent,
    UsersEditComponent,
    OrdersListComponent,
    OrdersDetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UsersModule,
    AppRoutingModule,
    UX_MODULE,
  ],
  providers: [ProductsService, MessageService, ConfirmationService, UsersService, OrdersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
