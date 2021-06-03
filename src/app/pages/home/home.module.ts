import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import {ShareModule} from "../../share/share.module";
import { HomeComponent } from './home.component';
import { NeteaseCarouselComponent } from './components/netease-carousel/netease-carousel.component';


@NgModule({
  declarations: [
    HomeComponent,
    NeteaseCarouselComponent
  ],
  imports: [
    ShareModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
