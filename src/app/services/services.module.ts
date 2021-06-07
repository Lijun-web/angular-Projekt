import {InjectionToken, NgModule, PLATFORM_ID} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';

//将端口号作为常数抽取出来
export const API_CONFIG = new InjectionToken('APiConfigToken');
export const WINDOW = new InjectionToken('WindowToken');

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {provide: API_CONFIG, useValue: 'http://localhost:3000/'},
    {
      provide: WINDOW,
      //only provide a WINDOW in Browser situation, not other situations
      useFactory(platformId: Object): Window | Object {
        return isPlatformBrowser(platformId) ? window : {};
      },
      deps: [PLATFORM_ID]
    }
  ]
})
export class ServicesModule { }
