import {Inject, Injectable} from '@angular/core';
import {API_CONFIG, ServicesModule} from "./services.module";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Banner, Singer, SingerDetail} from "./data-types/common.types";
import {map} from "rxjs/operators";


type SingerParams = {
  offset: number;
  limit: number;
  area?: number;
}

const defaultParams: SingerParams = {
  offset: 0,
  limit: 9,
  area: 96
}

@Injectable({
  providedIn: ServicesModule
})
export class SingerService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private uri:string) { }

  //将Json转换为请求参数
  fromJsonToQueryString(arg: SingerParams): string{
    return JSON.stringify(arg)
      .replace(/\"\:/g,"=")
      .replace(/,\"/g,"&")
      .replace("{\"","")
      .replace("}","");
  }

  getSettledSingers(arg: SingerParams = defaultParams): Observable<Singer[]>{
    const params = new HttpParams({fromString: this.fromJsonToQueryString(arg)});
    return this.http.get(this.uri+'artist/list', {params})
      .pipe(map((data:any) => data.artists));
  }

  //获取歌手单曲
  getSingerDetail(id: string): Observable<SingerDetail> {
    const params = new HttpParams().set('id', id);
    return this.http.get(this.uri + 'artists', { params })
      .pipe(map(data => data as SingerDetail));
  }

  //获取相似歌手
  getSimiSingers(id: string): Observable<Singer[]> {
    const params = new HttpParams().set('id', id);
    return this.http.get(this.uri + 'simi/artist', { params })
      .pipe(map((data: any) => data.artists));
  }

}
