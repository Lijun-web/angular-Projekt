import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzInputModule} from "ng-zorro-antd/input";
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import {NeteaseUiModule} from "./netease-ui/netease-ui.module";
import { PlayCountPipe } from './play-count.pipe';





@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzIconModule,
    NzLayoutModule,
    NzInputModule,
    NzMenuModule,
    NzCarouselModule,
    NeteaseUiModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzIconModule,
    NzLayoutModule,
    NzInputModule,
    NzMenuModule,
    NzCarouselModule,
    NeteaseUiModule,

  ]
})
export class ShareModule { }
