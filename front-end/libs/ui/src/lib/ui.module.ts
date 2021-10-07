import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { SliderComponent } from './slider/slider.component';

import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { GalleryComponent } from './gallery/gallery.component';

@NgModule({
  imports: [CommonModule, AccordionModule, ButtonModule],
  declarations: [
    BannerComponent,
    SliderComponent,
    GalleryComponent
  ],
  exports: [
    BannerComponent,
    GalleryComponent
  ]
})
export class UiModule{}
