import {InjectionToken, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

//将端口号作为常数抽取出来
export const API_CONFIG = new InjectionToken('APiConfigToken');

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {provide: API_CONFIG, useValue: 'http://localhost:3000/'},
  ]
})
export class ServicesModule { }
