import {NgModule, Optional, SkipSelf} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ServicesModule} from "../services/services.module";
import {PagesModule} from "../pages/pages.module";
import {ShareModule} from "../share/share.module";
import zh from "@angular/common/locales/zh";
import {NZ_I18N, zh_CN} from "ng-zorro-antd/i18n";

registerLocaleData(zh);

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServicesModule,
    PagesModule,
    ShareModule,
    AppRoutingModule
  ],
  exports: [
    ShareModule,
    AppRoutingModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
})
export class CoreModule {
  //设置只允许app.module引入CoreModule
  constructor(@SkipSelf() @Optional() parentModule:CoreModule) {
    if(parentModule){
      throw new Error("CoreModule只能在app.module中引入");
    }
  }
}
