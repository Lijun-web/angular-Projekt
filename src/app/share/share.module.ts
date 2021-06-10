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
import { PlayCountPipe } from './pipes/play-count.pipe';
import { FormatTimePipe } from './pipes/format-time.pipe';
import { ClickoutsideDirective } from './directives/clickoutside.directive';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzMessageModule } from 'ng-zorro-antd/message';


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
    NeteaseUiModule,
    NzRadioModule,
    NzPaginationModule,
    NzTagModule,
    NzTableModule,
    NzMessageModule
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
    NzRadioModule,
    NzPaginationModule,
    NzTagModule,
    NzTableModule,
    NzMessageModule
  ],

})
export class ShareModule { }
