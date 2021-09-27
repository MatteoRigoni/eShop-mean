import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { SliderComponent } from './slider/slider.component';

import { AccordionModule } from 'primeng/accordion';

@NgModule({
  imports: [CommonModule, AccordionModule],
  declarations: [
    BannerComponent,
    SliderComponent
  ],
  exports: [
    BannerComponent
  ]
})
export class UiModule{}
