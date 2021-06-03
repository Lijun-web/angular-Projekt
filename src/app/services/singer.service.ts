import {Inject, Injectable} from '@angular/core';
import {API_CONFIG, ServicesModule} from "./services.module";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Banner, Singer} from "./data-types/common.types";
import {map} from "rxjs/operators";


type SingerParams = {
  offset: number;
  limit: number;
  cat?: string;
}

const defaultParams: SingerParams = {
  offset: 0,
  limit: 9,
  cat: '5001'
}

@Injectable({
  providedIn: ServicesModule
})
export class SingerService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private uri:string) { }

  getSettledSinger(arg: SingerParams = defaultParams): Observable<Singer[]>{
    const params = new HttpParams({fromString: JSON.stringify(arg)});
    return this.http.get(this.uri+'artist/list')
      .pipe(map((data:any) => data.artists));
  }
}
