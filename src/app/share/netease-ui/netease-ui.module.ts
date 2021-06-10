import { NgModule } from '@angular/core';
import { SingleSheetComponent } from './single-sheet/single-sheet.component';
import {PlayCountPipe} from "../pipes/play-count.pipe";
import {NeteasePlayerModule} from "./netease-player/netease-player.module";



@NgModule({
  declarations: [
    SingleSheetComponent,
    PlayCountPipe,

  ],
  imports: [
    NeteasePlayerModule
  ],
  exports: [
    SingleSheetComponent,
    PlayCountPipe,
    NeteasePlayerModule

  ]
})
export class NeteaseUiModule { }
