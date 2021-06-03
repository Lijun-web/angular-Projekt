import {Inject, Injectable} from '@angular/core';
import {API_CONFIG, ServicesModule} from './services.module';
import {Observable} from "rxjs";
import {Banner, HotTag, PersonalizedSong} from "./data-types/common.types";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: ServicesModule
})
export class HomeService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private uri:string) { }

  //第二种方式
  // getBanners(){
  //   return this.http.get(this.uri+'banner');
  // }

  getBanners(): Observable<Banner[]>{
    return this.http.get(this.uri+'banner')
      .pipe(map((data:any) => data.banners));
  }


  //获取热门标签
  getHotTags(): Observable<HotTag[]> {
    return this.http.get(this.uri+'playlist/hot')
      .pipe(map((data:any) => {
        return data.tags.sort((x:HotTag, y:HotTag) => {
          return x.position - y.position;
        }).slice(0, 5);
      }));
  }

  // getHotTags() {
  //   return this.http.get(this.uri+'playlist/hot');
  // }



  //获取热门标签下的歌单

  getPersonalizedSongs(): Observable<PersonalizedSong[]> {
    return this.http.get(this.uri+'personalized')
      .pipe(map((data:any) => data.result.slice(0, 16))); //只在页面中展示16张歌单
  }

  // getPersonalizedSongs(): Observable<PersonalizedSong[]> {
  //   return this.http.get(this.uri+'personalized')
  //     .pipe(map((data:any) => data.result)); //只在页面中展示16张歌单
  // }
}
